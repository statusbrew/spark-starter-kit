"use client";
import { useEffect } from "react";
import Modal from "@mui/material/Modal";
import { motion } from "framer-motion";
import { RxCross2 } from "react-icons/rx";

const RazorpayRegPopup = ({ isRegisterFormModalOpen, setIsRegisterFormModalOpen }) => {
  const handleClose = () => {
    setIsRegisterFormModalOpen(false);
  };

  // The Razorpay modal logic here
  const openRazorpay = async () => {
    const res = await loadRazorpayScript();
    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    // Your payment options here
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: "2000", // Example amount
      currency: "INR",
      name: "Vehicle Parking",
      description: "Payment for parking services",
      image: "https://example.com/logo.png",
      handler: function (response) {
        alert("Payment successful");
        // Handle successful payment response here
      },
      prefill: {
        name: "John Doe",
        email: "johndoe@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  // Trigger Razorpay modal when the component is opened
  useEffect(() => {
    if (isRegisterFormModalOpen) {
      openRazorpay();
    }
  }, [isRegisterFormModalOpen]);

  return (
    <Modal open={isRegisterFormModalOpen} onClose={handleClose} className="flex justify-center items-center border-none">
      <motion.div
        initial={{ opacity: 0, y: 250 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative flex flex-col md:flex-row bg-white md:max-w-[85%] md:max-h-[80%] max-h-[90%] w-[90%] max-w-[480px] border-none"
      >
        <RxCross2 onClick={handleClose} className="absolute right-3 top-3 text-[1.5rem] md:text-[2rem] font-light cursor-pointer" />
        <div className="md:w-[55%] flex flex-col gap-4 p-4 md:p-8">
          <h1>Processing Payment...</h1>
        </div>
      </motion.div>
    </Modal>
  );
};

export default RazorpayRegPopup;
