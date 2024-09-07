import bcrypt from "bcrypt";
import mongoose from "mongoose";

const OrganisationSchema = new mongoose.Schema({
    name: { type: String },
    profilePhoto: { type: String, default: "" },
    organizationUniqueDomainID: { type: String, unique: true },
    minCarPerPillar: { type: Number, default: 0 },
    entryGatePillarNumber: { type: String },
    exitGatePillarNumber: { type: String },
    disabilityEase: { type: Boolean, default: false },
    elderlyCare: { type: Boolean, default: false },
    email: { type: String},
    password: { type: String, },
    mobileNumber: { type: String, },
    totalParkings: { type: Number, default: 0 },
    totalCollection: { type: Number, default: 0 },
    carPrice: {type: Number, default: 0},
    motorVehicle: {type: Number, default: 0},
    otpSms: { type: String },
    otpExpiry: { type: Date },
    customer: [{ type: mongoose.Schema.Types.ObjectId, ref: "Customer" }],
    direction: [{ type: mongoose.Schema.Types.ObjectId, ref: "Direction" }],
    salesTransactions: [{ type: mongoose.Schema.Types.ObjectId, ref: "SalesTransaction" }],
    vehicles: [{ type: mongoose.Schema.Types.ObjectId, ref: "Vehicle" }],
    lastLogin: { type: Date },
    loginDetails: [{ type: String }],
    city: { type: String,  },
    refreshToken: { type: String, unique: true },
    joiningDate: { type: Date, default: Date.now },
    updatedDate: { type: Date, default: Date.now },
    passwordChangedAt: { type: Date },
    passwordResetToken: { type: String },
    passwordResetExpire: { type: Date },
}, { timestamps: true });

OrganisationSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

OrganisationSchema.methods.isPasswordMatched = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model("Organisation", OrganisationSchema);
