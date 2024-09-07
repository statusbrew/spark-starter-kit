import express from 'express';
import morgan from "morgan";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";

import db from "./config/db"

import {
  demoScheduler
} from "./util/scheduler";

const host = process.env.HOST ?? 'localhost';
const port = process.env.BACKEND_PORT ? Number(process.env.BACKEND_PORT) : 3000;

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());

const currentDate = new Date();


app.get('/', (req, res) => {

  res.send({ message: `Hi! I am here to Welcome You! Version --> 200, recent restarted time = ${currentDate}` });
});

app.listen(3000,  () => {
  // db();
  console.log(`[ ready ] http://1}:1}`);
});
// app.listen()
// demoScheduler()

mongoose.set("strictQuery", true);



