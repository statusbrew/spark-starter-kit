import organisationModel from "../models/organisationModel";
import parkingLayoutModel from "../models/parkingModel";


const Mall = require('../models/mallModel'); 

export const submitParkingFee = async (req, res) => {
  const { carPrice, vehiclePrice } = req.body;
  const refreshToken = req?.headers?.authorization?.split(" ")[1];

  if (!carPrice || !vehiclePrice) {
      return res.status(400).json({ message: 'Both carPrice and vehiclePrice are required' });
  }

  if (isNaN(carPrice) || isNaN(vehiclePrice)) {
      return res.status(400).json({ message: 'carPrice and vehiclePrice must be numbers' });
  }

  try {
      // Find the organization by refreshToken
      const organization = await organisationModel.findOne({ refreshToken });
      if (!organization) {
          return res.status(404).json({ message: 'Organization not found with provided token' });
      }

      // Update the organization's parking fee information
      organization.carPrice = carPrice;
      organization.motorPrice = vehiclePrice;
      
      await organization.save();
      res.status(200).json({ message: 'Parking fee updated successfully', parkingFee: { carPrice, vehiclePrice } });
  } catch (error) {
      console.error('Error updating parking fee:', error);
      res.status(500).json({ message: 'Server error, please try again later' });
  }
};


export const submitParkingLayout = async (req, res) => {
    const { numberOfPillars, rangeOfPillars, minCarsPerPillar, entryGates, exitGates, refreshToken } = req.body;

    // Basic validation
    if (!numberOfPillars || !rangeOfPillars || !minCarsPerPillar || !entryGates || !exitGates) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // Validate rangeOfPillars format
    const rangeRegex = /^[A-Z]-[A-Z]$/;
    if (!rangeRegex.test(rangeOfPillars)) {
        return res.status(400).json({ message: 'Invalid range of pillars. Use format "A-Z".' });
    }

    try {
        // Find the organization by refreshToken
        const organization = await organisationModel.findOne({ refreshToken });
        if (!organization) {
            return res.status(404).json({ message: 'Organization not found' });
        }

        // Update the organization's parking layout details

        const parkingLayout = new parkingLayoutModel({
          numberOfPillars,
          rangeOfPillars,
          minCarsPerPillar,
          entryGates,
          exitGates
        });
        await parkingLayout.save();

        organization.parkingLayout = parkingLayout.id;

        // Save the updated organization details
        await organization.save();
        res.status(200).json({ message: 'Parking layout updated successfully', parkingLayout: organization.parkingLayout });
    } catch (error) {
        console.error('Error updating parking layout:', error);
        res.status(500).json({ message: 'Server error, please try again later' });
    }
};


export const submitMallDetails = async (req, res) => {
  const { complexName, email, mallLocation, contactSupport, refreshToken } = req.body;

  // Basic validation
  if (!complexName || !email || !mallLocation || !contactSupport) {
      return res.status(400).json({ message: 'All fields are required' });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
  }

  try {
      // Find the organization by refreshToken
      const organization = await organisationModel.findOne({ refreshToken });
      if (!organization) {
          return res.status(404).json({ message: 'Organization not found' });
      }

      organization.mobileNumber = contactSupport;
      organization.city = mallLocation;
      // organization.name = complexName;
      // organization.email = email;

    
      // Save the updated organization details
      await organization.save();
      res.status(200).json({ message: 'Mall details updated successfully', data:"done" });
  } catch (error) {
      console.error('Error updating mall details:', error);
      res.status(500).json({ message: 'Server error, please try again later' });
  }
};

export const adminHomeGet = async (req, res) => {
    try {
      const {licPlate, vehicleType,organizationUniqueDomainID} = req.body;

     


      // create payment order and send to frontend

      return res.status(200).json({
        status_code:200,
        data: '',
        message: "Successfully Saved"
      });



    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status_code: 500,
        success: false,
        message: "something went wong",
      });
    }
  };

  export const adminSystemCrashesController = async (req, res) => {
    try {
      const {licPlate, vehicleType,organizationUniqueDomainID} = req.body;

     


      // create payment order and send to frontend

      return res.status(200).json({
        status_code:200,
        data: '',
        message: "Successfully Saved"
      });



    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status_code: 500,
        success: false,
        message: "something went wong",
      });
    }
  };
