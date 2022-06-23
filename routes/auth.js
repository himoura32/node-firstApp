const express = require('express');
const { check, body } = require('express-validator');

const authController = require('../controllers/auth');
const User = require('../models/user');

const router = express.Router();

router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignup);

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Please enter a valid email address.'),
    body('password', 'Password must be alphanumeric and at least 5 characers.')
      .isLength({ min: 5 })
      .isAlphanumeric(),
  ],
  authController.postLogin
);

router.post(
  '/signup',
  [
    check('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .custom((value, { req }) => {
        // if (value === 'test@test.com') {
        //   throw new Error('This email address is forbidden.');
        // }
        // return true;
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject('E-Mail already exists!');
          }
        });
      }),
    body(
      'password',
      'Please enter an alphanumeric password with at least 6 characters.'
    )
      .isLength({ min: 6 })
      .isAlphanumeric(),
    body('confirmPassword').custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords have to match!');
      }
      return true;
    }),
  ],
  authController.postSignup
);

router.post('/logout', authController.postLogout);

router.get('/reset', authController.getReset);

router.post('/reset', authController.postReset);

module.exports = router;
