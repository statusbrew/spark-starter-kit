
const cron = require('node-cron');
const customerModel = require('./models/customerModel'); // Assuming your model is in models/customerModel
import crypto from "crypto";


// Function to update the pin for each customer
export const updateCustomerPin = async () => {
  try {
    const customers = await customerModel.find({});
    
    customers.forEach(async (customer) => {
      // Generate a random 6-digit pin
      const newPin = crypto.randomInt(100000, 999999).toString();
      
      // Update the customer's pin in the database
      await customerModel.findByIdAndUpdate(customer._id, { pin: newPin });
    });
    
    console.log('Customer PINs updated successfully!');
  } catch (error) {
    console.error('Error updating customer PINs:', error);
  }
};

// Schedule the job to run every 30 seconds
cron.schedule('*/30 * * * * *', updateCustomerPin); // This cron expression runs every 30 seconds

console.log('Cron job started to update customer pins every 30 seconds');

