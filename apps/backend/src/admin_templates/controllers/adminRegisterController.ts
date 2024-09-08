import organisationModel from "../models/organisationModel";
import parkingLayoutModel from "../models/parkingModel";
import salesTransactionModel from "../models/salesTransactionModel";


const Mall = require('../models/mallModel'); 

export const submitParkingFee = async (req, res) => {
  const { carPrice, vehiclePrice , preHead } = req.body;

  // const refreshToken = req?.headers?.authorization?.split(" ")[1];


  if (!carPrice || !vehiclePrice) {
      return res.status(400).json({ message: 'Both carPrice and vehiclePrice are required' });
  }

  if (isNaN(carPrice) || isNaN(vehiclePrice)) {
      return res.status(400).json({ message: 'carPrice and vehiclePrice must be numbers' });
  }

  try {
      const updatedOrg = await organisationModel.findOneAndUpdate(
          { organizationUniqueDomainID: preHead },
          { $set: { carPrice, vehiclePrice }},
          { new: true }
      );

      if (!updatedOrg) {
          return res.status(404).json({ message: 'Organization not found with provided token' });
      }

      res.status(200).json({ message: 'Parking fee updated successfully', parkingFee: { carPrice, vehiclePrice } });
  } catch (error) {
      console.error('Error updating parking fee:', error);
      res.status(500).json({ message: 'Server error, please try again later' });
  }
};



export const submitParkingLayout = async (req, res) => {
  const { numberOfPillars, pillars, minCarsPerPillar, entryGateNearestPillar, exitGateNearestPillar, preHead } = req.body;
  // const refreshToken = req?.headers?.authorization?.split(" ")[1];


  if (!numberOfPillars || !pillars || !minCarsPerPillar || !entryGateNearestPillar || !exitGateNearestPillar) {
      return res.status(400).json({ message: 'All fields are required' });
  }




  try {


    const newParkingModel = new parkingLayoutModel({
      pillars,
      numberOfPillars,
      minCarsPerPillar,
      exitGateNearestPillar,
      entryGateNearestPillar
    });

    const updatedOrg = await organisationModel.findOneAndUpdate(
      { organizationUniqueDomainID:preHead },
      {
          $set: {
            parkingLayout: newParkingModel
          }
      },
      { new: true }
  );

  await newParkingModel.save();
  

      if (!updatedOrg) {
          return res.status(400).json({ message: 'Organization not found' });
      }

      res.status(200).json({ message: 'Parking layout updated successfully', parkingLayout: updatedOrg.parkingLayout });
  } catch (error) {
      console.error('Error updating parking layout:', error);
      res.status(500).json({ message: 'Server error, please try again later' });
  }
};




export const submitMallDetails = async (req, res) => {
  const { complexName, email, mallLocation, contactSupport, preHead } = req.body;
  console.log(preHead);

  if (!complexName || !email || !mallLocation || !contactSupport) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  // Ensure `preHead` is a string
  if (typeof preHead !== 'string') {
    return res.status(400).json({ message: 'Invalid preHead format' });
  }

  try {
    const updatedOrg = await organisationModel.findOneAndUpdate(
      { organizationUniqueDomainID: preHead },
      { $set: { name: complexName, email, city: mallLocation, mobileNumber: contactSupport } },
      { new: true }
    );

    if (!updatedOrg) {
      return res.status(404).json({ message: 'Organization not found' });
    }

    res.status(200).json({ message: 'Mall details updated successfully', data: updatedOrg });
  } catch (error) {
    console.error('Error updating mall details:', error);
    res.status(500).json({ message: 'Server error, please try again later' });
  }
};



export const adminHomeGet = async (req, res) => {
  try {
    const { organizationUniqueDomainID } = req.body;

    // Fetch organization and populate all the details
    const organization = await organisationModel.findOne({ organizationUniqueDomainID })
      .populate('customer')
      .populate('vehicles')
      .populate('salesTransactions');

    if (!organization) {
      return res.status(404).json({
        status_code: 404,
        message: 'Organization not found',
      });
    }

    const salesTransactions = await salesTransactionModel.find({
      _id: { $in: organization.salesTransactions } 
    });
    // Example calculations (replace these with actual calculations based on your data):
    const dailyCars = organization.vehicles.length;
    const trafficAverage = dailyCars - (dailyCars * 0.02); // Mocking a 2% decrease
    const onlinePayments = salesTransactions.filter(transaction => transaction.mode === 'online')
      .reduce((sum, transaction) => sum + transaction.amount, 0);
    const offlinePayments = salesTransactions
      .filter(transaction => transaction.mode === 'cash')
      .reduce((sum, transaction) => sum + transaction.amount, 0);

    return res.status(200).json({
      status_code: 200,
      data: organization,
      metrics: {
        dailyCars,
        trafficAverage,
        onlinePayments: `${onlinePayments}/-`,
        offlinePayments: `${offlinePayments}/-`,
        changes: {
          dailyCarsChange: '+16%', // Replace with actual calculation
          trafficAverageChange: '-2%',
          onlinePaymentsChange: '+16%',
          offlinePaymentsChange: '+32%'
        }
      },
      message: 'Data fetched successfully',
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status_code: 500,
      message: 'Something went wrong',
    });
  }
};


  // export const adminSystemCrashesController = async (req, res) => {
  //   try {
  //     const {licPlate, vehicleType,organizationUniqueDomainID} = req.body;

     


  //     // create payment order and send to frontend

  //     return res.status(200).json({
  //       status_code:200,
  //       data: '',
  //       message: "Successfully Saved"
  //     });



  //   } catch (error) {
  //     console.log(error);
  //     return res.status(500).json({
  //       status_code: 500,
  //       success: false,
  //       message: "something went wong",
  //     });
  //   }
  // };
