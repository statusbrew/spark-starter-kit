import express from "express";
const router = express.Router();

import {
    registerController,
    checkOrganizationExists,
    verifyOTP,


} from "../controllers/registerController";

router.post("/registerUser",registerController  ); //optimized
router.get("/organizationExists",checkOrganizationExists  ); //optimized

router.put("/verifyOTP",verifyOTP  ); //optimized



export default router;
