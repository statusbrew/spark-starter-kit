import organisationModel from "../models/organisationModel";

import {generateToken} from "../../config/jwtToken";

export const loginUserController = async (req, res) => {
  try {
      const { email, password } = req.body;
      console.log(email);
      console.log(password);


      if (!email || !password) {
          return res.status(400).json({
              status_code: 400,
              message: "Email and password are required."
          });
      }

      const user = await organisationModel.findOne({ email });
      if (!user) {
          return res.status(404).json({
              status_code: 404,
              message: "User not found."
          });
      }

    //   if (!user.isVerified) {
    //       return res.status(401).json({
    //           status_code: 401,
    //           message: "User is not verified. Please verify your account."
    //       });
    //   }

      const isMatch = await user.isPasswordMatched(password);
      if (!isMatch) {
          return res.status(401).json({
              status_code: 401,
              message: "Invalid credentials."
          });
      }

      const refreshToken = generateToken(user._id); 

      // Save the refresh token with the user's record in the database
      user.refreshToken = refreshToken;
      await user.save();

      return res.status(200).json({
          status_code: 200,
          message: "Login successful",
          refreshToken,
          org: user.organizationUniqueDomainID
      });

  } catch (error) {
      console.log(error);
      return res.status(500).json({
          status_code: 500,
          message: "An error occurred during login."
      });
  }
};
