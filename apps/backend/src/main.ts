import express from 'express';
import morgan from "morgan";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import razorpayRoutes from "./razorpay/routes/razorpay"
import db from "./config/db"

import loginRoutes from "./admin_templates/routes/loginRoutes";
import adminRegisterRoutes from "./admin_templates/routes/adminRegisterRoutes";
import contactUsRoutes from "./website/routes/contactUsRoutes";
import customerRoutes from "./admin_templates/routes/customerRoutes";
import registerRoutes from "./website/routes/registereRoutes";
import {
  demoScheduler
} from "./util/scheduler.js";

const host = process.env.HOST ?? 'localhost';
const port = process.env.BACKEND_PORT ? Number(process.env.BACKEND_PORT) : 3000;

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());

const currentDate = new Date();
app.use("/admin/login", loginRoutes);
app.use("/admin/register", adminRegisterRoutes);
app.use("/website", contactUsRoutes);
app.use("/customer", customerRoutes);
app.use("/register", registerRoutes);
app.use("/api/razorpay", razorpayRoutes);




app.get('/', (req, res) => {
  res.send({ message: `Hi! I am here to Welcome You! Version --> 200, recent restarted time = ${currentDate}` });
});

app.listen(port || 3000,  () => {
  db();
  console.log(`[ ready ] http://${host}:${port}`);
});


// Schedulers:
demoScheduler()

mongoose.set("strictQuery", true);



