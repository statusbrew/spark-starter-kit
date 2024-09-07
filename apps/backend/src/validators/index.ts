import { validationResult } from "express-validator";
import mongoose from "mongoose";

export function runvalidation(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ error: errors.array()[0].msg });
  }
  next();
}

export function isMongoObjId(id) {
  return mongoose.isValidObjectId(id)
}