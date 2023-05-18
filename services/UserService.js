
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
  const activationLink = `${API_BASE_PATH}/users/activate?token=${activationToken}`;

  // Send the activation email
  await sendActivationEmail(email, activationLink);

  return newUser;
}

module.exports = {
  registerUser,
};
