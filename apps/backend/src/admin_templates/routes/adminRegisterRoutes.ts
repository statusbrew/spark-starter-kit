import express from "express";
const router = express.Router();

const { submitMallDetails, submitParkingLayout,submitParkingFee } = require('../controllers/adminRegisterController');


router.post('/mallDetails',submitMallDetails);
router.post('/parkinLayout', submitParkingLayout);
router.post('/parkingFee', submitParkingFee);
export default router;
