import express from "express";
const router = express.Router();

import {
    postNumberPlateEntry,
    paymentVerificationAndDirectionAllotment,
    vehicleSubmittedSucessfully,
    handleReallotment,
    pinVerification,
    pinFailureRequest


} from "../controllers/customerController";


router.post("/postCustomer",  postNumberPlateEntry); 
router.put("/verifyPayment",  paymentVerificationAndDirectionAllotment);
router.put("/vehicleParked",  vehicleSubmittedSucessfully);
router.put("/requestReallotment",  handleReallotment);
router.put("/pinVerification",  pinVerification);
router.put("/pinFailureRequest",  pinFailureRequest);



export default router;
