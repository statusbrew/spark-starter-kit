import express from "express";
const router = express.Router();

import {
    loginUserController,

} from "../controllers/loginController";

// import {
//   requestValidator,
//   validateUpdateCoachProfile,
//   validateUpdateFcmToken,
// } from "../../middleware/validator.js";

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.post("/postLoginDetails",  loginUserController); 


export default router;