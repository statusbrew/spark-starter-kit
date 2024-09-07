
const SystemIssueSchema = new mongoose.Schema({
    vehicleNumber: { type: String, required: true },
    issueType: { type: String, required: true }, // E.g., 'PIN Failure'
    description: { type: String, required: true },
    reportedAt: { type: Date, default: Date.now },
    organizationUniqueDomainID: { type: String, required: true },
}, { timestamps: true });

const SystemIssue = mongoose.model('SystemIssue', SystemIssueSchema);

module.exports = SystemIssue;
