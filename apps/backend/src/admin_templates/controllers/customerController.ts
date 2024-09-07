import customerModel from "../models/customerModel";

import {
    getCurrentDateTime,
    verifyPayment

} from "../../util/util";
import organisationModel from "../models/organisationModel";

export const postNumberPlateEntry = async (req, res) => {
    try {
      const {licPlate, vehicleType,organizationUniqueDomainID} = req.body;

     

      const org = await organisationModel.find



      //PUT Validation 
      const newCustomer = new customerModel({
        vehicleType,
        vehicleNumber:licPlate,
        entryDateTime: getCurrentDateTime(),
        organizationUniqueDomainID

      });

      await newCustomer.save();
      // create payment order and send to frontend

      return res.status(200).json({
        status_code:200,
        data: '',
        message: "Successfully Saved"
      });



    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status_code: 500,
        success: false,
        message: "something went wong",
      });
    }
  };


  export const paymentVerificationAndDirectionAllotment = async (req, res) => {
    try {
      const {
        razorpay_signature,
        razorpay_order_id,
        razorpay_payment_id,
        customerID,
      } = req.body;


            //Find Direction and sent or make it use in razorpay hit along with 


      
      if (
        !verifyPayment(razorpay_order_id, razorpay_payment_id, razorpay_signature)
      ) {
        return res.status(400).json({
          status_code: 400,
          data: "",
          message: "payment verification failed",
        });
      }

      

      return res.status(200).json({
        status_code:200,
        data: '',
        message: "Successfully Saved"
      });



    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status_code: 500,
        success: false,
        message: "something went wong",
      });
    }
  };


  export const vehicleSubmittedSucessfully = async (req, res) => {
    try {
      const {licPlate, vehicleType,organizationUniqueDomainID} = req.body;

      //Check IF organization exists and put in newCustomer



      //PUT Validation 
      const newCustomer = new customerModel({
        vehicleType,
        vehicleNumber:licPlate,
        entryDateTime: getCurrentDateTime(),
        organizationUniqueDomainID

      });

      await newCustomer.save();
      // create payment order and send to frontend

      return res.status(200).json({
        status_code:200,
        data: '',
        message: "Successfully Saved"
      });



    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status_code: 500,
        success: false,
        message: "something went wong",
      });
    }
  };

  export const requestForReallotment = async (req, res) => {
    try {
      const {licPlate, vehicleType,organizationUniqueDomainID} = req.body;

      //Check IF organization exists and put in newCustomer



      //PUT Validation 
      const newCustomer = new customerModel({
        vehicleType,
        vehicleNumber:licPlate,
        entryDateTime: getCurrentDateTime(),
        organizationUniqueDomainID

      });

      await newCustomer.save();
      // create payment order and send to frontend

      return res.status(200).json({
        status_code:200,
        data: '',
        message: "Successfully Saved"
      });



    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status_code: 500,
        success: false,
        message: "something went wong",
      });
    }
  };

  export const pinVerification = async (req, res) => {
    try {
      const {licPlate, vehicleType,organizationUniqueDomainID} = req.body;

      //Check IF organization exists and put in newCustomer



      //PUT Validation 
      const newCustomer = new customerModel({
        vehicleType,
        vehicleNumber:licPlate,
        entryDateTime: getCurrentDateTime(),
        organizationUniqueDomainID

      });

      await newCustomer.save();
      // create payment order and send to frontend

      return res.status(200).json({
        status_code:200,
        data: '',
        message: "Successfully Saved"
      });



    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status_code: 500,
        success: false,
        message: "something went wong",
      });
    }
  };

  export const pinFailureRequeset = async (req, res) => {
    try {
      const {licPlate, vehicleType,organizationUniqueDomainID} = req.body;

      //Check IF organization exists and put in newCustomer



      //PUT Validation 
      const newCustomer = new customerModel({
        vehicleType,
        vehicleNumber:licPlate,
        entryDateTime: getCurrentDateTime(),
        organizationUniqueDomainID

      });

      await newCustomer.save();
      // create payment order and send to frontend

      return res.status(200).json({
        status_code:200,
        data: '',
        message: "Successfully Saved"
      });



    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status_code: 500,
        success: false,
        message: "something went wong",
      });
    }
  };



  