const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const auth = require('../../middleware/auth');
const db = require('../../models/');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');


// @route  GET api/auth
// @desc   Test route
// @access Public

router.get('/', auth, async (req, res) => {
  try {
    const user = await db.User.findByPk(req.user.id)
    return res.json(user);

  } catch (error) {
    console.error(error.message);
    return res.status(500).send('Server Error');
  }
}
);


router.post('/', [
  check('email', 'Email is required').isEmail(),
  check('password', 'Please enter a password is required').exists()
],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // Bad request, send errors
      return res.status(400).json({ errors: errors.array() })
    }
    console.log(req.body);

    const { email, password } = req.body;

    try {
      let user = await db.User.findOne({ where: { email } })
      if (!user) {
        return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const payload = {
        user: {
          id: user.id,
        }
      };
      jwt.sign(payload, config.get('jwtTokenSecret'), {
        expiresIn: 360000
      }, (err, token) => {
        if (err) throw err;
        res.json({ token })
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
    // Return jsonwebtoken


  });


module.exports = router;