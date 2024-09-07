import bcrypt from "bcrypt";
import mongoose from "mongoose";


const Organisation = new mongoose.Schema({
    name: { type: String },
    profilePhoto: { type: String, default: "" },
    organizationUniqueDomainID: { type: String, unique: true },
    minCarPerPillar: { type: Number, default: 0 },
    entryGatePillarNumber: { type: String },
    exitGatePillarNumber: { type: String },
    disabilityEase: { type: Boolean, default: false },
    elderlyCare: { type: Boolean, default: false },
    email: { type: String, unique: true },
    password: { type: String },
    mobileNumber: { type: String },
    totalParkings: { type: Number, default: 0 },
    totalCollection: { type: Number, default: 0 },
    otpSms: { type: String },
    otpExpiry: { type: Date },
    customer: [{ type: mongoose.Schema.Types.ObjectId, ref: "Customer" }],
    direction: [{ type: mongoose.Schema.Types.ObjectId, ref: "Direction" }],
    salesTransactions: [{ type: mongoose.Schema.Types.ObjectId, ref: "SalesTransaction" }],
    vehicles: [{ type: mongoose.Schema.Types.ObjectId, ref: "Vehicle" }],
    lastLogin: { type: Date },
    loginDetails: [{ type: String }],
    city: { type: String },
    refreshToken: { type: String },
    joiningDate: { type: Date },
    updatedDate: { type: Date },
    passwordChangedAt: { type: Date },
    passwordResetToken: { type: String },
    passwordResetExpire: { type: Date },
  }, { timestamps: true });
  
Organisation.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (error) {
    return next(error);
  }
});

Organisation.methods.isPasswordMatched = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

Organisation.index({ coachId: 1 }, { unique: true });
Organisation.index({ refreshToken: 1 });

export default mongoose.model("Organisation", Organisation);
