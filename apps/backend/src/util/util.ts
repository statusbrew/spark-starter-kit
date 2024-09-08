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

  export async function findNearestVacantSpot  (pillars2D, entryPosition)  {
    const [entryRow, entryCol] = entryPosition;
  
    let nearestPillar = null;
    let minDistance = Infinity;
  
    for (let i = 0; i < pillars2D.length; i++) {
      for (let j = 0; j < pillars2D[i].length; j++) {
        const pillar = pillars2D[i][j];
        const { numberOfCars, minCarsPerPillar } = pillar;
  
        if (numberOfCars < minCarsPerPillar) {
          const distance = Math.abs(i - entryRow) + Math.abs(j - entryCol); // Manhattan distance
          if (distance < minDistance) {
            minDistance = distance;
            nearestPillar = pillar.pillarName;
          }
        }
      }
    }
  
    return nearestPillar || null; // If no vacant spot, return null
  };

const findPillarCoordinates = (pillars2D, nameOfPillar) => {
  for (let i = 0; i < pillars2D.length; i++) {
    for (let j = 0; j < pillars2D[i].length; j++) {
      if (pillars2D[i][j].pillarName === nameOfPillar) {
        return [i, j]; // Return the coordinates [row, column]
      }
    }
  }
  return null; // Return null if the pillar is not found
};
  
export async function findPathToAllocatedPillar  (pillars2D, entryGateNearestPillar, allocatedPillarName) {
  // Find coordinates of the entry gate and allocated pillar
  const entryCoordinates = findPillarCoordinates(pillars2D, entryGateNearestPillar);
  const allocatedCoordinates = findPillarCoordinates(pillars2D, allocatedPillarName);

  if (!entryCoordinates || !allocatedCoordinates) {
    throw new Error('Entry gate or allocated pillar not found');
  }

  const directions = [];
  const [entryRow, entryCol] = entryCoordinates;
  const [allocatedRow, allocatedCol] = allocatedCoordinates;

  // Vertical movement: Check if we need to move up or down
  if (allocatedRow > entryRow) {
    for (let i = 0; i < allocatedRow - entryRow; i++) {
      directions.push('down');
    }
  } else if (allocatedRow < entryRow) {
    for (let i = 0; i < entryRow - allocatedRow; i++) {
      directions.push('up');
    }
  }

  // Horizontal movement: Check if we need to move left or right
  if (allocatedCol > entryCol) {
    for (let i = 0; i < allocatedCol - entryCol; i++) {
      directions.push('right');
    }
  } else if (allocatedCol < entryCol) {
    for (let i = 0; i < entryCol - allocatedCol; i++) {
      directions.push('left');
    }
  }

  return directions;
};


