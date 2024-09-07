const Mall = require('../models/mallModel'); 
const parkingLayout = require('../models/parkingModel');
const parkingFee = require('../models/parkingFeeModel');

exports.submitParkingFee = async (req, res) => {
    const { carPrice, vehiclePrice } = req.body;

    // Basic validation
    if (!carPrice || !vehiclePrice) {
        return res.status(400).json({ message: 'Both carPrice and vehiclePrice are required' });
    }

    // Ensure that carPrice and vehiclePrice are numbers
    if (isNaN(carPrice) || isNaN(vehiclePrice)) {
        return res.status(400).json({ message: 'carPrice and vehiclePrice must be numbers' });
    }

    // Create a new parking fee document using the ParkingFee model
    const newParkingFee = new parkingFee({
        carPrice,
        vehiclePrice
    });

    try {
        // Save the parking fee to the database
        await newParkingFee.save();
        res.status(201).json({ message: 'Parking fee submitted successfully', parkingFee: newParkingFee });
    } catch (error) {
        console.error('Error submitting parking fee:', error);
        res.status(500).json({ message: 'Server error, please try again later' });
    }
};

exports.submitParkingLayout = async (req, res) => {
    const { numberOfPillars, rangeOfPillars, minCarsPerPillar, entryGates, exitGates } = req.body;

    // Basic validation
    if (!numberOfPillars || !rangeOfPillars || !minCarsPerPillar || !entryGates || !exitGates) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // Ensure the rangeOfPillars is valid (e.g., "A-Z")
    const rangeRegex = /^[A-Z]-[A-Z]$/;
    if (!rangeRegex.test(rangeOfPillars)) {
        return res.status(400).json({ message: 'Invalid range of pillars. Use format "A-Z".' });
    }

    // Create a new parking layout document using the ParkingLayout model
    const newParkingLayout = new parkingLayout({
        numberOfPillars,
        rangeOfPillars,
        minCarsPerPillar,
        entryGates,
        exitGates
    });

    try {
        // Save the parking layout to the database
        await newParkingLayout.save();
        res.status(201).json({ message: 'Parking layout submitted successfully', parkingLayout: newParkingLayout });
    } catch (error) {
        console.error('Error submitting parking layout:', error);
        res.status(500).json({ message: 'Server error, please try again later' });
    }
};

exports.submitMallDetails = async (req, res) => {
    const { complexName, email, mallLocation, contactSupport } = req.body;

    // Basic validation
    if (!complexName || !email || !mallLocation || !contactSupport) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }


    const newMall = new Mall({
        complexName,
        email,
        mallLocation,
        contactSupport
    });

    try {
        await newMall.save();
        res.status(201).json({ message: 'Mall details submitted successfully', mall: newMall });
    } catch (error) {
        console.error('Error submitting mall details:', error);
        res.status(500).json({ message: 'Server error, please try again later' });
    }
};
