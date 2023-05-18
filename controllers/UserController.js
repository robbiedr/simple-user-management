const UserService = require('../services/UserService');

/**
 * Register a user
 * @param {object} req Request object
 * @param {object} res Response object
 * @param {object} next Next
 */
async function registerUser(req, res, next) {
  const {email, password, firstName, lastName} = req.body;
  let data;
  try {
    data = await UserService.registerUser(email, password, firstName, lastName);
    res.json(data);
  } catch (error) {
    console.log({error});
    next(error);
  }
}

module.exports = {
  registerUser,
};
