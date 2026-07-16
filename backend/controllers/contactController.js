const Contact = require('../models/Contact');

// @desc    Submit a contact form
// @route   POST /api/contact
// @access  Public
const submitContactForm = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;

    // Create the contact submission in the database
    const contact = await Contact.create({
      name,
      email,
      subject,
      message
    });

    res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully!',
      data: contact
    });
  } catch (error) {
    next(error); // Pass to the custom error handler middleware
  }
};

module.exports = {
  submitContactForm
};
