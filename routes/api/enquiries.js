const express = require('express');
const auth = require('../../middleware/auth');
const router = express.Router();
const db = require('../../models');


// @route  GET api/enquiries
// @desc   Test route
// @access Public

router.get('/', async (req, res) => {
  db.Enquiry
    .findAll()
    .then(users => res.send(users))
    .catch(err => console.error(err.message));
});

// @route  DELETE api/enquiries/:enquiryId
// @desc   Delete enquiry
// @access Private

router.delete('/:enquiryId', auth, async (req, res) => {
  const enquiryId = req.params.enquiryId;


  try {
    let enquiry = await db.Enquiry.findOne({ where: { id: enquiryId } })


    if (!enquiry) {
      return res.status(404).json({ msg: 'Enquiry not found' });
    }

    if (enquiry.userId !== req.user.id) {
      return res.status(401).json({ msg: "Not Authorised" })
    }

    await enquiry.destroy();

    return res.json({ msg: "Enquiry Removed" });

  } catch (error) {
    res.status(500).send('Server error');
  }
});





module.exports = router;
