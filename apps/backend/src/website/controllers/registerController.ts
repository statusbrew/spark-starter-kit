import organisationModel from "../../admin_templates/models/organisationModel";
// import { sendOTPEmail } from "../../util/util";


  export const checkOrganizationExists = async (req, res) => {
    try {
        const { organizationUniqueDomainID } = req.query; // Assume you're passing the unique ID as a query parameter

        // Check for the organization
        const organization = await organisationModel.findOne({ organizationUniqueDomainID:organizationUniqueDomainID });
        if (organization) {
            return res.status(400).json({
                status_code: 400,
                exists: true,
                data: { name: organization.name, id: organization._id }, // You can adjust what data to return
                message: "Organization exists"
            });
        } else {
            return res.status(200).json({
                status_code: 200,
                exists: false,
                message: "Organization does not exist"
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status_code: 500,
            message: "An error occurred"
        });
    }
};


export const registerController = async (req, res) => {
    try {
        const { name, email, password, organizationUniqueDomainID } = req.body;

        if (!name || !email || !password || !organizationUniqueDomainID) {
            return res.status(400).json({
                status_code: 400,
                message: "All fields are required"
            });
        }



        const existingOrg = await organisationModel.findOne({ organizationUniqueDomainID: organizationUniqueDomainID });
        if (existingOrg) {
            return res.status(409).json({
                status_code: 409,
                message: "Organization already registered"
            });
        }

        const otp = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP

        const newOrg = new organisationModel({
            name,
            email,
            password, // Consider hashing the password before saving
            organizationUniqueDomainID,
            otpSms:otp,
            otpExpiry: new Date(Date.now() + 10 * 60 * 1000) // OTP expires in 10 minutes
        });

        await newOrg.save();
        

        // Send the OTP to the user's email
        // await sendOTPEmail(email, otp);

        return res.status(201).json({
            status_code: 201,
            message: "OTP sent to email, please verify to complete registration"
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status_code: 500,
            message: "An error occurred during registration"
        });
    }
};


export const verifyOTP = async (req, res) => {
  try {
      const { organizationUniqueDomainID, otp } = req.body;

      const organization = await organisationModel.findOne({
          organizationUniqueDomainID:organizationUniqueDomainID,
          otpSms:otp,
          // otpExpires: { $gt: new Date() }
      });

      if (!organization) {
          return res.status(400).json({
              status_code: 400,
              message: "Invalid OTP or OTP expired"
          });
      }

      organization.isVerified = true; // Update the organization as verified
      await organization.save();

      return res.status(200).json({
          status_code: 200,
          message: "Organization verified successfully"
      });

  } catch (error) {
      console.log(error);
      return res.status(500).json({
          status_code: 500,
          message: "Verification failed"
      });
  }
};
