import jwt from "jsonwebtoken";

export const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_RESET_PASSWORD, { expiresIn: "1d" });
};
