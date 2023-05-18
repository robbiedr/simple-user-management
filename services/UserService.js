
const bcrypt = require('bcrypt');

const {
  users: Users,
} = require('../config/db');

/**
 * Register a user
 * @param {string} email Email
 * @param {string} password Password
 * @param {string} firstName First name
 * @param {string} lastName Last name
 * @return {object} New user record
 */
async function registerUser(email, password, firstName, lastName) {
  let existingUser; let newUser;
  try {
    // Check if the email address is already registered
    existingUser = await Users.findOne({where: {email}});
    if (existingUser) {
      return res.status(409).json({error: 'Email address is already registered'});
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    newUser = await Users.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      active: false, // Set the user account as inactive
    });

    // TODO: Send activation email to the user's email address with a token
  } catch (error) {
    console.error('User registration error:', error);
    throw new Error(error.message);
  }

  return newUser;
}

module.exports = {
  registerUser,
};
