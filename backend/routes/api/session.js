// backend/routes/api/session.js
const express = require('express');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateLogin = [
  check('credential')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Please provide a valid email or username.'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a password.'),
  handleValidationErrors
];

// Restore session user
router.get(
  '/',
  restoreUser,
  (req, res) => {
    const { user } = req;
    if (user) {
      return res.json(user.toSafeObject());
    } else return res.json({});
  }
);

// Log in
router.post(
  '/',
  validateLogin,
  async (req, res, next) => {
    const { credential, password } = req.body;

    const user = await User.login({ credential, password });

    if (!user) {
      return res
        .status(401)
        .json({
          "message": "Invalid credentials",
          "statusCode": 401
        })
    }
      // const err = new Error('Login failed');
      // err.message = 'Invalid credentials';
      // err.statusCode = 401;
      // err.errors = ['The provided credentials were invalid.'];
      // return next(err);
    // if(!credential || !password) {
    //   return res
    //     .status(400)
    //     .json({
    //       "message": "Validation error",
    //       "statusCode": 400,
    //       "errors": {
    //         "credential": "Email or username is required",
    //         "password": "Password is required"
    //       }
    //     })
    // }

    const token = await setTokenCookie(res, user);

    const userObj = user.toJSON();
    userObj.token = token;

    return res.json(userObj);
  }
);

// Log out
router.delete(
  '/',
  (_req, res) => {
    res.clearCookie('token');
    return res.json({ message: 'success' });
  }
);


module.exports = router;
