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

module.exports = {
  registerUser,
};
