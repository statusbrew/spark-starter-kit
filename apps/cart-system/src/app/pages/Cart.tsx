// Define the types for product properties
import {
    Box,
    Container,
    Title,
    Flex,
    ActionIcon,
  } from "@mantine/core";
  import { IconPlus } from "@tabler/icons-react";
  import ProductCard from "../component/Products";

export interface Product {
    id: number;
    name: string;
    description: string;
    price: string;
    quantity: number;
    image: string;
  }
  
  
  const AdminTasks: React.FC = () => {
    const products: Product[] = [
      {
        id: 1,
        name: "Product 1",
        description: "This is a sample product",
        price: "25.00",
        quantity: 2,
        image: "https://via.placeholder.com/100",
      },
      {
        id: 2,
        name: "Product 2",
        description: "This is another sample product",
        price: "15.00",
        quantity: 1,
        image: "https://via.placeholder.com/100",
      },
    ];
  
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
              <ProductCard key={product.id} product={product} />
            ))}
          </Box>
        </Container>
      </Box>
    );
  }
  
  export default AdminTasks;
  