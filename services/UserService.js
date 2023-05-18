
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const createError = require('http-errors');

const {
  users: Users,
} = require('../config/db');

const {sendActivationEmail} = require('../utils/emailer');

const {API_BASE_PATH, TOKEN_SECRET_KEY} = process.env;

/**
 * Register a user
 * @param {string} email Email
 * @param {string} password Password
 * @param {string} firstName First name
 * @param {string} lastName Last name
 * @return {object} New user record
 */
async function registerUser(email, password, firstName, lastName) {
  let newUser;
  let existingUser;
  try {
    // Check if the email address is already registered
    existingUser = await Users.findOne({where: {email}});
  } catch (DBError) {
    throw new Error(DBError.message);
  }

  if (existingUser) {
    throw createError(409, 'Email address is already registered');
  }

  // Hash the password
  const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

  try {
  // Create a new user
    newUser = await Users.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      active: false, // Set the user account as inactive
    });
  } catch (DBError) {
    throw new Error(DBError.message);
  }

  // Generate a token for activation
  const activationToken = jwt.sign({email}, TOKEN_SECRET_KEY, {expiresIn: '1h'});

  // Compose the email message
  const activationLink = `${API_BASE_PATH}/api/users/activate?token=${activationToken}`;

  // Send the activation email
  await sendActivationEmail(email, activationLink);

  return {
    message: 'User account registered successfully',
    id: newUser.id,
    email: newUser.email,
    firstName: newUser.firstName,
    lastName: newUser.lastName,
    createdAt: newUser.createdAt,
  };
}

/**
 * Activates a user via token
 * @param {string} token Activation token
 */
async function activateUser(token) {
  let user;
  let email;

  try {
    // Verify the token and extract the email
    const decodedToken = jwt.verify(token, TOKEN_SECRET_KEY);
    email = decodedToken.email;
  } catch (TokenError) {
    throw createError(400, 'Invalid activation token');
  }

  try {
    // Find the user in the database by email
    user = await Users.findOne({where: {email}});
  } catch (DBError) {
    throw new Error(DBError.message);
  }

  // If user not found or already activated, return an error
  if (!user || user.dataValues.active) {
    throw createError(400, 'Invalid activation token');
  }

  try {
    // Update the user's active status to true
    user.active = true;
    await user.save();
  } catch (DBError) {
    throw new Error(DBError.message);
  }

  return {
    message: 'User account activated successfully',
    email: user.dataValues.email,
  };
}

/**
 * Activates a user via token
 * @param {string} email Email
 * @param {string} password Password
 * @return {object} Bearer token
 */
async function loginUser(email, password) {
  let user;
  try {
    // Check if the user exists
    user = await Users.findOne({where: {email}});
  } catch (DBError) {
    throw new Error(DBError.message);
  }

  if (!user) {
    throw createError(401, 'Invalid email or password');
  }

  // Compare the password
  const isPasswordValid = bcrypt.compareSync(password, user.password);
  if (!isPasswordValid) {
    throw createError(401, 'Invalid email or password');
  }

  if (!user.dataValues.active) {
    throw createError(401, 'Inactive account');
  }

  delete user.dataValues.password;

  // Generate a bearer token
  const bearerToken = jwt.sign(user.dataValues, TOKEN_SECRET_KEY, {expiresIn: '1h'});

  return {
    bearerToken,
  };
}

/**
 * Change password
 * @param {string} currentPassword Current Password
 * @param {string} newPassword New Password
 * @param {string} userId User ID
 */
async function changePassword(currentPassword, newPassword, userId) {
  let user;
  try {
    // Check if the current password matches the user's password
    user = await Users.findOne({where: {id: userId}});
  } catch (DBError) {
    throw new Error(DBError.message);
  }

  if (!user || !bcrypt.compareSync(currentPassword, user.password)) {
    throw createError(401, 'Invalid current password');
  }

  if (currentPassword === newPassword) {
    throw createError(400, 'Invalid new password');
  }

  try {
    // Update the user's password with the new one
    user.password = bcrypt.hashSync(newPassword, bcrypt.genSaltSync(10));
    await user.save();
  } catch (DBError) {
    throw new Error(DBError.message);
  }

  return {
    message: 'Password changed successfully',
  };
}

/**
 * Retrieves list of users with limited details
 * @return {array} Array of users
 */
async function getUserList() {
  let users;
  try {
    users = await Users.findAll({attributes: {exclude: ['password', 'email', 'lastName']}});
  } catch (DBError) {
    throw new Error(DBError.message);
  }

  return users;
}

/**
 * Retrieves user details
 * @param {string} userId User ID
 * @return {object} User object
 */
async function getUserDetails(userId) {
  let user;
  try {
    user = await Users.findOne({where: {id: userId}});
    delete user.dataValues.password;
  } catch (DBError) {
    throw new Error(DBError.message);
  }

  return user;
}

module.exports = {
  registerUser,
  activateUser,
  loginUser,
  changePassword,
  getUserList,
  getUserDetails,
};
