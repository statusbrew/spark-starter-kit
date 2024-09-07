import React from "react";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

// Load Stripe with the publishable key (add type assertion to ensure it's correct)
const stripePromise: Promise<Stripe | null> = loadStripe(
  "pk_test_51P66VjSBINuBNg5tRulpGci113qdQRkOisw8aDnZI7CAa66Yw0QKKxqp9SU46ZLYYFSh5u2avLps9QHJQhJTV7Dh00BeNAEodP"
);

// Define the CheckoutForm component with proper TypeScript types
const CheckoutForm: React.FC = () => {
  const handleCheckout = async () => {
    try {
      // Define the response and session types
      const response: Response = await fetch(
        "http://localhost:3333/create-checkout-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: 1000, // Amount in USD cents (e.g. $10.00)
          }),
        }
      );

      const session: { id: string } = await response.json();

      // Await stripe instance and call redirectToCheckout
      const stripe = await stripePromise;
      if (stripe) {
        const { error } = await stripe.redirectToCheckout({
          sessionId: session.id,
        });

        if (error) {
          console.error("Stripe checkout error:", error.message);
        }
      } else {
        console.error("Stripe failed to load");
      }
    } catch (err) {
      console.error("Error in checkout process", err);
    }
  };

  return (
    <div>
      <h2>Stripe Checkout Example</h2>
      <button onClick={handleCheckout}>Pay Now</button>
    </div>
  );
};

// Wrap the CheckoutForm with the Stripe Elements provider with the correct type
const StripeWrapper: React.FC = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default StripeWrapper;
