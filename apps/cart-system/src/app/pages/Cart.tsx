// Define the types for product properties
import {
    Box,
    Container,
    Title,
    Flex,
    ActionIcon,
    Loader,
    Text
  } from "@mantine/core";
  import { IconPlus } from "@tabler/icons-react";
  import ProductCard from "../component/Products";
import useFetch from "../hooks/useFetch";
import { useState } from "react";

export interface Product {
    imageURL: string | null | undefined;
    id: number;
    name: string;
    description: string;
    price: string;
    quantity: number;
    image: string;
  }
  
  
  const Cart: React.FC = () => {
   
    const { data: products, loading, error, refetchData } = useFetch(
      "http://localhost:3333/products/"
    );

    console.log("Fetched products:", products);
    const [cart, setCart] = useState<Product[]>([]);

    const addToCart = (product: Product) => {
      setCart((prevCart) => [...prevCart, product]);
    };
    const removeFromCart = (productId: number) => {
      setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    };

    console.log("Cart products:", cart);
    if (loading) {
      return (
        <Container>
          <Loader size="lg" />
        </Container>
      );
    }
  
    if (error) {
      return (
        <Container>
          <Text color="red">Error fetching products</Text>
        </Container>
      );
    }
    return (
      <Box py={32}>
        <Container>
          <Flex justify="space-between" align="center">
            <Title order={2}>
              Your Cart
            </Title>
            <Flex gap={32} align="center">
              <ActionIcon color="indigo">
                <IconPlus />
              </ActionIcon>
            </Flex>
          </Flex>
          <Box mt={16}>
            {products.map((product) => (

              <ProductCard  product={product} />
            ))}
          </Box>

          <Box mt={32}>
          <Title order={3}>Cart Items</Title>
          {cart.length === 0 ? (
            <Text>No items in the cart.</Text>
          ) : (
            cart.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                // Remove from cart action
              />
            ))
          )}
        </Box>
        </Container>
      </Box>
    );
  }
  
  export default Cart;
  