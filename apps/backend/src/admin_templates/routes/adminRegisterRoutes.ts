import express from "express";
const router = express.Router();

const { submitMallDetails, submitParkingLayout,submitParkingFee,adminHomeGet ,adminSystemCrashesController} = require('../controllers/adminRegisterController');


router.post('/mallDetails',submitMallDetails);
router.post('/parkingLayout', submitParkingLayout);
router.post('/parkingFee', submitParkingFee);
router.get('/getAdminHome', adminHomeGet);
router.get('/getAdminSystemCrashes', adminSystemCrashesController);


export default router;
