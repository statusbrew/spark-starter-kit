// ProductCard.tsx
import React from "react";
import { Box, Image,  Title, Flex, Badge } from "@mantine/core";
import { Product } from "../pages/Cart";  

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Box
      sx={{
        boxShadow: "rgba(0, 0, 0, 0.04) 0px 3px 5px",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "12px",
        backgroundColor: "white",
        borderColor: "#ddd",
      }}
      mt={16}
    >
      <Flex align="center" gap={16}>
        <Image
          src={product.imageURL}
          alt={product.name}
          width={100}
          height={100}
          radius="md"
        />
        <Box>
          <Title order={4}>{product.name}</Title>
          
          <Flex align="center" gap={8} mt={8}>
            <Badge color="blue">{product.price} USD</Badge>
            <Badge color="green">Qty: {product.quantity}</Badge>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}

export default ProductCard;
