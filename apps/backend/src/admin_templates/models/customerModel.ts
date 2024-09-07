import bcrypt from "bcrypt";
import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema({
    carNumber: { type: String, required: true },
    vehicleType: { type: String, enum: ['car', 'bike'], default: 'car' },
    entryDateTime: { type: Date },
    exitDateTime: { type: Date },
    organizationUniqueDomainID: { type: String },
    organisation: [{ type: mongoose.Schema.Types.ObjectId, ref: "Organisation" }],
    direction: [{ type: mongoose.Schema.Types.ObjectId, ref: "Direction" }],
    salesTransactions: [{ type: mongoose.Schema.Types.ObjectId, ref: "SalesTransaction" }],
    vehicle: [{ type: mongoose.Schema.Types.ObjectId, ref: "Vehicle" }],
    passwordChangedAt: { type: Date },
    passwordResetToken: { type: String },
    passwordResetExpire: { type: Date },
  }, { timestamps: true });
  
  CustomerSchema.index({ carNumber: 1 }, { unique: true }); // Assuming car number is unique
  

  CustomerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    return next();
  } catch (error) {
    return next(error);
  }
});

CustomerSchema.methods.isPasswordMatched = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

CustomerSchema.index({ coachId: 1 }, { unique: true });
CustomerSchema.index({ refreshToken: 1 });

export default mongoose.model("CustomerSchema", CustomerSchema);
