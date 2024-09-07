import mongoose from 'mongoose';

// Define the schema for mall details
const mallSchema = new mongoose.Schema({
    complexName: { type: String, required: true },
    email: { type: String, required: true },
    mallLocation: { type: String, required: true },
    contactSupport: { type: String, required: true }
}, { timestamps: true });

// Export the model
module.exports = mongoose.model('Mall', mallSchema);
