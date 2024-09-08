"use client";
import React, { useState, useEffect } from 'react';
import RazorpayPayment from "../../../../backend/src/razorpay/components/razorPayment";

function EditVehicleDetails() {
  const [licensePlate, setLicensePlate] = useState('');
  const [vehicleType, setVehicleType] = useState('Car');
  const [fee, setFee] = useState('');
  const [entryDateTime, setEntryDateTime] = useState('');

  // Set the current date and time on component mount
  useEffect(() => {
    const currentDateTime = new Date().toISOString().slice(0, 16);
    setEntryDateTime(currentDateTime);
  }, []);

  // Update the fee based on the vehicle type
  useEffect(() => {
    const fees = { Car: '20.0/-', Bike: '10.0/-' };
    setFee(fees[vehicleType]);
  }, [vehicleType]);

  const handleProceed = async () => {
    const payload = {
      licensePlate,
      vehicleType,
      fee,
      entryDateTime
    };

    try {
      const response = await fetch('http://localhost:3000/customer/postCustomer', {  // Change to your actual API route
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
        console.log('Success:', result);
        // Optionally trigger RazorpayPayment here
        // <RazorpayPayment />;
      } else {
        console.error('Error:', result);
      }
    } catch (error) {
      console.error('Error submitting details:', error);
    }
  };

  return (
    <div className="flex font-inter flex-col justify-center items-center min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="w-full sm:max-w-xl md:max-w-2xl bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-xl md:text-2xl font-semibold mb-6 text-center">Edit Vehicle Details</h1>
        <form className="space-y-5">
          <div>
            <label className="block text-gray-700 text-sm md:text-base">License Plate Number</label>
            <input
              type="text"
              value={licensePlate}
              onChange={(e) => setLicensePlate(e.target.value)}
              placeholder="Enter license plate number"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm md:text-base">Vehicle Type</label>
            <select
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              className="mt-1 block w-[100%] px-3 py-2 overflow-hidden border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Car">Car</option>
              <option value="Bike">Bike</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 text-sm md:text-base">Fee </label>
            <input
              type="text"
              value={fee}
              readOnly
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-500 bg-gray-100"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm md:text-base">Entry Date | Time (Non-editable)</label>
            <input
              type="datetime-local"
              value={entryDateTime}
              readOnly
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-500 bg-gray-100"
            />
          </div>
          <button
            type="button"
            onClick={handleProceed}
            className="w-full bg-black hover:bg-black text-white font-bold py-3 px-4 rounded-md focus:outline-none focus:shadow-outline"
          >
            Proceed for payment
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditVehicleDetails;
