import crypto from "crypto";

import {razorPayInstance} from "../config/razorPay";


export function getCurrentDateTime() {
    const now = new Date();
  
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0"); // Month is zero-based, so add 1 and pad with zero if needed
    const day = String(now.getDate()).padStart(2, "0");
    const hour = String(now.getHours()).padStart(2, "0");
    const minute = String(now.getMinutes()).padStart(2, "0");
  

    const formattedDateTime = `${day}-${month}-${year} ${hour}:${minute}`;
  
    return formattedDateTime;
  };


  export function fetchDirectionForCustomer (){

  }


  
export function verifyPayment(
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature
  ) {
    try {
      // console.log("razorpay_order_id => ", razorpay_order_id)
      // console.log("razorpay_payment_id => ", razorpay_payment_id)
      // console.log("razorpay_signature => ", razorpay_signature)
      // console.log("process.env.RAZORPAY_API_SECRET => ", process.env.RAZORPAY_API_SECRET)
  
      const body = razorpay_order_id + "|" + razorpay_payment_id;
      const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
        .update(body.toString())
        .digest("hex");
  
      console.log("expectedSignature => ", expectedSignature);
  
      const result = expectedSignature === razorpay_signature;
  
      console.log("result of verifyPayment => ", result);
      return result;
    } catch (error) {
      console.error("Error during payment verification:", error);
      return false;
    }
  };


  
  export async function createRazorpayOrder(customer, amount) {
    const options = {
      amount: amount*100,
      currency: "INR",
      receipt: "receipt#1",
      notes: {
        customer_id: customer._id.toString(),
        vehicleNumber: customer.vehicleNumber
      }
    };
  
    try {
      const order = await razorPayInstance.orders.create(options);
      return {
        orderId: order.id,
        orderDetails: order
      };
    } catch (error) {
      console.error('Order creation failed:', error);
      throw new Error('Failed to create Razorpay order');
    }
  }