import express from "express";
const router = express.Router();
import Gateway from "../controller/Gateway.js";

router.post("/",Gateway);


module.exports = router;
