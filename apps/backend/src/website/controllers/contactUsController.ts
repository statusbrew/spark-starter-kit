

// Import the Mongoose model if you're storing form data in a MongoDB collection
const contactUsModel = require('../models/contactUsModel'); // Assume you have a model named queryForm.js

// POST request handler for the query form
export const contactUsController = async(req, res) => {
    const { name, mobile, email, complexName, city, address } = req.body;

    // Validate the input data (basic validation, you can extend this as needed)
    if (!name || !mobile || !email || !complexName || !city || !address) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // Ensure the email is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email address' });
    }

    // Ensure the mobile is a valid number
    const mobileRegex = /^[0-9]{10}$/; // Assumes a 10-digit mobile number
    if (!mobileRegex.test(mobile)) {
        return res.status(400).json({ message: 'Invalid mobile number' });
    }

    // Create a new query document (for MongoDB)
    const newQuery = new contactUsModel({
        name,
        mobile,
        email,
        complexName,
        city,
        address
    });

    try {
        // Save the form data to the database
        await newQuery.save();
        res.status(201).json({ message: 'Form submitted successfully' });
    } catch (error) {
        console.error('Error saving form data:', error);
        res.status(500).json({ message: 'Server error, please try again later' });
    }
};
