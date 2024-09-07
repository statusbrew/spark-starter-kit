import { body, validationResult, query, param } from "express-validator";

export const requestValidator = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(500).json({
      message: errors.array()[0]?.msg || "Please fill Required fields Properly",
      errors: errors.array(),
    });
  }

  next();
};

