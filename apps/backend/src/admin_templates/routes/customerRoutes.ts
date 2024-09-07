import express from "express";
const router = express.Router();

import {
    postNumberPlateEntry,
    paymentVerificationAndDirectionAllotment,
    vehicleSubmittedSucessfully,
    requestForReallotment,
    pinVerification,
    pinFailureRequeset


} from "../controllers/customerController";


router.post("/postCustomer",  postNumberPlateEntry); 
router.put("/verifyPayment",  paymentVerificationAndDirectionAllotment);
router.put("/vehicleParked",  vehicleSubmittedSucessfully);
router.put("/requestReallotment",  requestForReallotment);
router.put("/pinVerification",  pinVerification);
router.put("/pinFailureRequest",  pinFailureRequeset);




export default router;
