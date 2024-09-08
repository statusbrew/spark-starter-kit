import React, { useState } from "react";
import {
  Box,
  Container,
  Title,
  Flex,
  TextInput,
  Button,
  Notification,
  Text,
} from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons-react";
import ProductCard from "../component/Products";
import { loadStripe, Stripe } from "@stripe/stripe-js";

const stripePromise: Promise<Stripe | null> = loadStripe(
  "pk_test_51P66VjSBINuBNg5tRulpGci113qdQRkOisw8aDnZI7CAa66Yw0QKKxqp9SU46ZLYYFSh5u2avLps9QHJQhJTV7Dh00BeNAEodP"
);

export interface Product {
  imageURL: string | null | undefined;
  id: number;
  name: string;
  description: string;
  price: string;
  quantity: number;
}

const Cart = () => {
  const [productId, setProductId] = useState<string>(""); 
  const [message, setMessage] = useState<string>(""); 
  const [productIdError, setProductIdError] = useState<boolean>(false); 
  const [email, setEmail] = useState<string>(""); // State for email address
  const [emailError, setEmailError] = useState<boolean>(false); // State for email validation
  const [cart, setCart] = useState<Product[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProductId(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setEmailError(!validateEmail(event.target.value));
  };


  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Fetch product by ID and add it to the cart
  const handleProductIdSubmit = async () => {
    if (productId.trim() === "" || isNaN(Number(productId))) {
      setProductIdError(true);
      setMessage("Please enter a valid numeric product ID.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3333/products/${productId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      if (response.ok) {
        const fetchedProduct: Product = result;
        setCart((prevCart) => [...prevCart, fetchedProduct]);
        setMessage("Product added to cart successfully!");
        setProductId(""); 
        setProductIdError(false);
      } else {
        setProductIdError(true);
        setMessage(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error("Error submitting product ID:", error);
      setProductIdError(true);
      setMessage("An error occurred while submitting the product ID.");
    }
  };

  // Handle checkout process using Stripe
  const handleCheckout = async () => {
    try {
      // Calculate total amount
      const totalAmount = cart.reduce(
        (acc, product) => acc + parseFloat(product.price) * product.quantity,
        0
      );

      // Call your backend to create a Stripe session
      const response = await fetch("http://localhost:3333/payment/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: totalAmount * 100, 
          cart,
          email, 
        }),
      });

      const session = await response.json();

      // Redirect to Stripe Checkout
      const stripe = await stripePromise;
      if (stripe) {
        const { error } = await stripe.redirectToCheckout({
          sessionId: session.id,
        });

        if (error) {
          console.error("Stripe checkout error:", error.message);
        }
      }
    } catch (err) {
      console.error("Error in checkout process", err);
    }
  };

  return (
    <Box py={32}>
      <Container>
        {/* Add Product to Cart */}
        <Flex justify="space-between" align="center">
          <Title order={2}>Add Product</Title>
        </Flex>
        <Box mt={16} mb={32}>
          <TextInput
            label="Enter Product ID"
            placeholder="Enter product ID to fetch product"
            value={productId}
            onChange={handleInputChange}
            error={productIdError && "Invalid product ID, please try again."}
          />
          <Button mt={16} color="indigo" onClick={handleProductIdSubmit}>
            Submit Product ID
          </Button>

          {message && (
            <Notification
              mt={16}
              color={productIdError ? "red" : "green"}
              icon={productIdError ? <IconX size={18} /> : <IconCheck size={18} />}
              onClose={() => setMessage("")}
            >
              {message}
            </Notification>
          )}
        </Box>

        {/* Cart Items Section */}
        <Box mt={16}>
          <Title order={3}>Cart Items</Title>
          {cart.length === 0 ? (
            <Text>No items in the cart.</Text>
          ) : (
            cart.map((product) => <ProductCard product={product} key={product.id} />)
          )}
        </Box>

        {/* Email Input for Checkout */}
        {cart.length > 0 && (
          <Box mt={16}>
            <TextInput
              label="Email Address"
              placeholder="Enter your email address"
              value={email}
              onChange={handleEmailChange}
              error={emailError && "Please enter a valid email address."}
            />
          </Box>
        )}

        {/* Proceed to Payment Button */}
        {cart.length > 0 && (
          <Box mt={32}>
            <Button
              color="green"
              onClick={handleCheckout}
              disabled={email === "" || emailError} // Disable if email is empty or invalid
            >
              Proceed to Payment
            </Button>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Cart;
