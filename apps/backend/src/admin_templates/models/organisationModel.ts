import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

interface IOrganisation extends Document {
  name: string;
  profilePhoto: string;
  organizationUniqueDomainID: string;
  minCarPerPillar: number;
  entryGatePillarNumber: string;
  exitGatePillarNumber: string;
  disabilityEase: boolean;
  elderlyCare: boolean;
  email: string;
  password: string;
  mobileNumber: string;
  totalParkings: number;
  totalCollection: number;
  carPrice: number;
  motorPrice: number;
  otpSms: string;
  otpExpiry: Date;
  parkingLayout: mongoose.Types.ObjectId[];
  customer: mongoose.Types.ObjectId[];
  direction: mongoose.Types.ObjectId[];
  salesTransactions: mongoose.Types.ObjectId[];
  vehicles: mongoose.Types.ObjectId[];
  lastLogin: Date;
  loginDetails: string[];
  isVerified: boolean;
  city: string;
  refreshToken: string;
  joiningDate: Date;
  updatedDate: Date;
  passwordChangedAt: Date;
  passwordResetToken: string;
  passwordResetExpire: Date;
  isPasswordMatched(enteredPassword: string): Promise<boolean>;
}

const OrganisationSchema = new Schema({
  name: { type: String, required: true },
  profilePhoto: { type: String, default: "" },
  organizationUniqueDomainID: { type: String, unique: true, required: true },
  minCarPerPillar: { type: Number, default: 0 },
  entryGatePillarNumber: { type: String},
  exitGatePillarNumber: { type: String },
  disabilityEase: { type: Boolean, default: false },
  elderlyCare: { type: Boolean, default: false },
  email: { type: String, unique: true },
  password: { type: String },
  mobileNumber: { type: String},
  totalParkings: { type: Number, default: 0 },
  totalCollection: { type: Number, default: 0 },
  carPrice: { type: Number, default: 0 },
  motorVehicle: { type: Number, default: 0 },
  otpSms: { type: String },
  otpExpiry: { type: Date },
  customer: [{ type: Schema.Types.ObjectId, ref: "Customer" }],
  direction: [{ type: Schema.Types.ObjectId, ref: "Direction" }],
  salesTransactions: [{ type: Schema.Types.ObjectId, ref: "SalesTransaction" }],
  vehicles: [{ type: Schema.Types.ObjectId, ref: "Vehicle" }],
  parkingLayout: [{type: Schema.Types.ObjectId, ref: "ParkingLayout"}],
  lastLogin: { type: Date },
  loginDetails: [{ type: String }],
  isVerified: { type: Boolean, default: false },
  city: { type: String },
  refreshToken: { type: String, unique: true },
  joiningDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now },
  passwordChangedAt: { type: Date },
  passwordResetToken: { type: String },
  passwordResetExpire: { type: Date },
}, { timestamps: true });

OrganisationSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

OrganisationSchema.methods.isPasswordMatched = async function(this: IOrganisation, enteredPassword: string) {
  return bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model<IOrganisation>('Organisation', OrganisationSchema);
