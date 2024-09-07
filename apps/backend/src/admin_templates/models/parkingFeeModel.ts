import mongoose from 'mongoose';

// Define the schema for parking fee
const parkingFeeSchema = new mongoose.Schema({
    carPrice: { type: Number, required: true }, // Price for car parking
    vehiclePrice: { type: Number, required: true } // Price for other vehicles
}, { timestamps: true });

// Export the model
module.exports = mongoose.model('ParkingFee', parkingFeeSchema);
