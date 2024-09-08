import mongoose from 'mongoose';



const parkingLayoutSchema = new mongoose.Schema({
    numberOfPillars: {type: Number, default:0},
    minCarsPerPillar: {type: Number, default:0},
    entryGateNearestPillar: { type: String, required: true },
    exitGateNearestPillar: { type: String, required: true },
    organisation: { type: mongoose.Schema.Types.ObjectId, ref: "Organisation" },
    pillars: { 
       type:[[]], default :[[]]
    }

});

export default mongoose.model('ParkingLayout', parkingLayoutSchema);

