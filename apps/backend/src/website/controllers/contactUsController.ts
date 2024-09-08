

const contactUsModel = require('../models/contactUsModel');

export const contactUsController = async(req, res) => {
    const { name, mobile, email, complexName, city, address } = req.body;

    if (!name || !mobile || !email || !complexName || !city || !address) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email address' });
    }

    const mobileRegex = /^[0-9]{10}$/; 
    if (!mobileRegex.test(mobile)) {
        return res.status(400).json({ message: 'Invalid mobile number' });
    }

    const newQuery = new contactUsModel({
        name,
        mobile,
        email,
        complexName,
        city,
        address
    });

    try {
        await newQuery.save();
        console.log("Data recieved")
        res.status(201).json({ message: 'Form submitted successfully' });
    } catch (error) {
        console.error('Error saving form data:', error);
        res.status(500).json({ message: 'Server error, please try again later' });
    }
};
