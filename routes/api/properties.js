const express = require('express');
const router = express.Router();
const db = require('../../models');
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');


// @route  GET api/properties
// @desc   Get all properties in the portal
// @access Public

router.get('/', async (req, res) => {
  db.Property
    .findAll()
    .then(users => res.send(users))
    .catch(err => console.error(err.message));
});

// @route  GET api/properties/:property_id
// @desc   Get all properties in the portal
// @access Public
router.get('/:property_id', async (req, res) => {

  db.Property
    .findByPk(req.params.property_id)
    .then(property => res.send(property))
    .catch(err => console.error(err.message));

});


// @route  POST api/properties/:propertyId/enquiry
// @desc   Create enquiry, needed description in body
// @access Private

router.post('/:propertyId/enquiry', auth, async (req, res) => {


  try {
    const userId = req.user.id;
    const propertyId = req.params.propertyId;
    let enquiry = await db.Enquiry.findOne({ where: { userId: userId, propertyId: propertyId } })

    if (enquiry) {
      return res.status(400).json({ errors: [{ msg: 'Enquiry already exists' }] });
    }

    enquiry = await db.Enquiry.create({
      userId,
      propertyId,
      description: req.body.description
    });

    return res.json(enquiry);

  } catch (error) {
    res.status(500).send('Server error');
  }
});








router.post('/', [
  check('title', 'Title is required').not().isEmpty(),
  check('description', 'Description is required').not().isEmpty(),
  check('price', 'Price is required').not().isEmpty(),
],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // Bad request, send errors
      return res.status(400).json({ errors: errors.array() })
    }

    const { title, description, price } = req.body;

    try {
      console.log(req.body);
      let property = await db.Property.findOne({ where: { title } })
      if (property
      ) {
        return res.status(400).json({ errors: [{ msg: 'Property already exists' }] });
      }


      property = await db.Property.create({
        title,
        description,
        price
      });

      res.json({ property });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }


  });


router.get('/:prop_id/enquiries', (req, res) => res.send('Prop/enquiries route'));
router.post('/:prop_id/enquiry', (req, res) => res.send('Prop/enquiry route'));
module.exports = router;