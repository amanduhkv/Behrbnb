const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateSignup = [
  check('firstName')
    .exists({ checkFalsy: true })
    .isLength({ min: 1 })
    .withMessage('Please provide a first name.'),
  check('lastName')
    .exists({ checkFalsy: true })
    .isLength({ min: 1 })
    .withMessage('Please provide a last name.'),
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];

// Sign up
router.post(
  '/',
  // validateSignup,
  async (req, res) => {
    const { firstName, lastName, email, password, username } = req.body;
    const existingUserEmail = await User.findOne({
      where: {
        email: email
      }
    });
    const existingUsername = await User.findOne({
      where: {
        username: username
      }
    })
    if (existingUserEmail) {
      return res
        .status(403)
        .json({
          "message": "User with that email already exists",
          "statusCode": 403,
          "errors": {
            "email": "User with that email already exists"
          }
        })
    }
    if (existingUsername) {
      return res
        .status(403)
        .json({
          "message": "User with that username already exists",
          "statusCode": 403,
          "errors": {
            "username": "User with that username already exists"
          }
        })
    }

      const user = await User.signup({ firstName, lastName, email, username, password });

      const token = await setTokenCookie(res, user);

      const userObj = user.toJSON();
      userObj.token = token;

      return res.json(userObj);

  }
);


module.exports = router;
