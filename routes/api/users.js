const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

const User = require('../../models/User');

// @route   POST api/users
// @desc    Register User
// @acces   Public

router.post(
  '/',
  [
    body('name', 'Name is required.').not().isEmpty(),
    // username must be an email
    body('email', 'Input a valide E-Mail.').isEmail(),
    // password must be at least 5 chars long
    body('password', 'Password has to be 5 char minimum').isLength({ min: 5 }),
  ],
  async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        res.status(400).json({ errors: [{ msg: 'User already exist.' }] });
      }
      // See if user exists

      // Get users gravatar

      // Encrypt password

      // Return jsonwebtoken
      res.send('User route');
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
