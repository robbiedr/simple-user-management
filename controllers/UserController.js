const UserService = require('../services/UserService');

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - firstName
 *               - lastName
 *             properties:
 *               email:
 *                 type: string
 *                 example: example@email.com
 *               password:
 *                 type: string
 *                 example: P@ssw0rd!
 *               firstName:
 *                 type: string
 *                 example: John
 *               lastName:
 *                 type: string
 *                 example: Doe
 *     responses:
 *       200:
 *         description: Successful registration
 *       400:
 *         description: Invalid request payload
 *       409:
 *         description: Email address is already registered
 *       500:
 *         description: Internal server error
 */
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

/**
 * @swagger
 * /api/users/activate:
 *   get:
 *     summary: Activate a user account
 *     tags:
 *       - Users
 *     parameters:
 *       - name: token
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User account activated successfully
 *       400:
 *         description: Invalid activation token or user already activated
 *       500:
 *         description: Internal server error
 */
/**
 * Activate a user
 * @param {object} req Request object
 * @param {object} res Response object
 * @param {object} next Next
 */
async function activateUser(req, res, next) {
  const {token} = req.query;
  let data;
  try {
    data = await UserService.activateUser(token);
    res.json(data);
  } catch (error) {
    console.log({error});
    next(error);
  }
}

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: User login
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: example@email.com
 *               password:
 *                 type: string
 *                 example: P@ssw0rd!
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Successful login
 *       401:
 *         description: Invalid email or password
 *       500:
 *         description: Internal server error
 */
/**
 * Login a user
 * @param {object} req Request object
 * @param {object} res Response object
 * @param {object} next Next
 */
async function loginUser(req, res, next) {
  const {email, password} = req.body;
  let data;
  try {
    data = await UserService.loginUser(email, password);
    res.json(data);
  } catch (error) {
    console.log({error});
    next(error);
  }
}

/**
 * @swagger
 * /api/users/change-password:
 *   put:
 *     summary: Change user password
 *     tags:
 *       - Users
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               currentPassword:
 *                 type: string
 *                 example: P@ssw0rd!
 *               newPassword:
 *                 type: string
 *                 example: n3wP@ssw0rd!
 *     responses:
 *       200:
 *         description: Password changed successfully
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - Password change not allowed
 *       400:
 *         description: Invalid request payload
 *       500:
 *         description: Internal server error
 */
/**
 * Register a user
 * @param {object} req Request object
 * @param {object} res Response object
 * @param {object} next Next
 */
async function changePassword(req, res, next) {
  const {currentPassword, newPassword} = req.body;
  const userId = req.user.id; // Assuming you have the user ID available in the request

  let data;
  try {
    data = await UserService.changePassword(currentPassword, newPassword, userId);
    res.json(data);
  } catch (error) {
    console.log({error});
    next(error);
  }
}

module.exports = {
  registerUser,
  activateUser,
  loginUser,
  changePassword,
};
