const express = require('express');
const router = express.Router();
const db = require('../../models');
const bycrypt = require('bcryptjs');

//  middlewares that wraps validator.js validator/sanitation functions
const { check, validationResult } = require('express-validator');


// @route  GET api/users
// @desc   Test route
// @access Public

router.get('/', (req, res) => {
  db.User
    .findAll()
    .then(users => res.send(users))
    .catch(err => console.error(err.message));
})



// @route  POST api/users
// @desc   Register route
// @access Public

router.post('/', [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Email is required').isEmail(),
  check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // Bad request, send errors
      return res.status(400).json({ errors: errors.array() })
    }
    console.log(req.body);

    const { name, email, password } = req.body;
    // See if user exists
    try {
      console.log("IN TRY");
      let user = await db.User.findOne({ where: { email } })
      if (user) {
        return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
      }

      console.log("inside try. USer: ", user);
      user = await db.User.create({
        name,
        email,
        password
      });

      // Encrypt password 
      const salt = await bycrypt.genSalt(10);
      user.password = await bycrypt.hash(password, salt);

      await user.save();
      res.send('User registered')

    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');

    }
    // Return jsonwebtoken


  });

module.exports = router;