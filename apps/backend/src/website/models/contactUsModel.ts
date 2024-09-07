const mongoose = require('mongoose');

const contactUsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    mobile: { type: String, required: true },
    email: { type: String, required: true },
    complexName: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('ContactUs', contactUsSchema);
