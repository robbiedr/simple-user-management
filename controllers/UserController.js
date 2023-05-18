const UserService = require('../services/UserService');

/**
 * Register a user
 * @param {object} req Request object
 * @param {object} res Response object
 */
async function registerUser(req, res) {
  const {email, password, firstName, lastName} = req.body;
  let data;
  try {
    data = await UserService.registerUser(email, password, firstName, lastName);
    res.json(data);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
}

module.exports = {
  registerUser,
};
