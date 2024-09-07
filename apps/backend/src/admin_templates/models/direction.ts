import mongoose from "mongoose";


const DirectionSchema = new mongoose.Schema({
    startPoint: { type: String },
    endPoint: { type: String },
    directionsText: { type: String },
    mapCoordinates: { type: String } // If applicable
  }, { timestamps: true });
  
  
  DirectionSchema.index({ coachId: 1 });

export default mongoose.model("Direction", DirectionSchema);
