import mongoose from "mongoose";

const VehicleSchema = new mongoose.Schema({
    pillarId: { type: String, required: true },
    totalSpots: { type: Number, required: true },
    availableSpots: { type: Number, required: true },
    isOccupied: { type: Boolean, default: false }
  }, { timestamps: true });
  


export default mongoose.model("Vehicle", VehicleSchema);
