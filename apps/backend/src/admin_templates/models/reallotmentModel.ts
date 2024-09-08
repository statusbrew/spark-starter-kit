


const ReallotmentSchema = new mongoose.Schema({
    vehicleNumber: { type: String, required: true },
    originalEntryDateTime: { type: Date, required: true },
    reallotmentDateTime: { type: Date, required: true },
    reason: { type: String, required: true }, // Reason for reallotment
    organizationUniqueDomainID: { type: String, required: true },
    status: { type: String, enum: ['pending', 'completed'], default: 'pending' }, // Status of the reallotment
}, { timestamps: true });

const Reallotment = mongoose.model('Reallotment', ReallotmentSchema);

module.exports = Reallotment;
