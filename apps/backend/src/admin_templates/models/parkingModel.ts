import mongoose from 'mongoose';

// Define the schema for parking layout
const parkingLayoutSchema = new mongoose.Schema({
    numberOfPillars: { type: Number, required: true },
    rangeOfPillars: { type: String, required: true, validate: value => /^[A-Z]-[A-Z]$/.test(value) }, // Validate format "A-Z"
    minCarsPerPillar: { type: Number, required: true },
    entryGates: { type: Number, required: true }, // Number of entry gates
    exitGates: { type: Number, required: true } // Number of exit gates
}, { timestamps: true });

// Export the model using ES6 default export
export default mongoose.model('ParkingLayout', parkingLayoutSchema);
