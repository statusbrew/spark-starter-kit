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
  const [cart, setCart] = useState<Product[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProductId(event.target.value);
  };
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
        setProductId(""); // Clear input after success
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

  return (
    <Box py={32}>
      <Container>

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

        <Box mt={16}>
          <Title order={3}>Cart Items</Title>
          {cart.length === 0 ? (
            <Text>No items in the cart.</Text>
          ) : (
            cart.map((product) => (
              <ProductCard product={product}/>
            ))
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default Cart;
