import { useState } from "react";

export default function RazorpayPayment() {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);

    // Call the backend API to create an order
    const res = await fetch('/api/razorpayOrder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: 500 }), // Amount in INR
    });

    const orderData = await res.json();

    // Initialize Razorpay payment modal
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: orderData.amount,
      currency: orderData.currency,
      name: "Your Company",
      description: "Test Transaction",
      order_id: orderData.order_id, // Order ID from backend
      handler: function (response) {
        // On successful payment, verify payment
        verifyPayment(response);
      },
      prefill: {
        name: "John Doe",
        email: "john@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
    setLoading(false);
  };

  const verifyPayment = async (paymentDetails) => {
    const res = await fetch('/api/razorpayOrder/verify-payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentDetails),
    });

    const result = await res.json();

    if (result.success) {
      alert("Payment verified successfully");
    } else {
      alert("Payment verification failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Razorpay Integration with Next.js</h1>
      <button
        onClick={handlePayment}
        disabled={loading}
        className="px-6 py-2 text-white bg-blue-600 rounded hover:bg-blue-800"
      >
        {loading ? "Processing..." : "Pay ₹500"}
      </button>
    </div>
  );
}
