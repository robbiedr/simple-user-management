const jwt = require('jsonwebtoken');
const createError = require('http-errors');

const {TOKEN_SECRET_KEY} = process.env;

/**
 * Authenticate token
 * @param {object} req Request object
 * @param {object} res Response object
 * @param {object} next Next
 */
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    throw createError(401, 'Bearer token missing');
  }

  jwt.verify(token, TOKEN_SECRET_KEY, (err, user) => {
    if (err) {
      throw createError(403, 'Invalid token');
    }

    req.user = user;
    next();
  });
}

module.exports = {
  authenticateToken,
};
