import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Title,
  Flex,
  Notification,
  Text,
} from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons-react";
import { useParams, useNavigate } from "react-router-dom"; 
import ProductCard from "../component/Products";
import {onlineEndPoint, localEndPoint} from "../endPoint"
export interface OrderItem {
  id: number;
  product_id: number;
  order_id: number;
  quantity: number;
  total_price: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  imageURL: string;
  quantity: number;
}

export interface Customer {
  id: number;
  email: string;
}

const CustomerOrders = () => {
  const { customerId } = useParams<{ customerId: string }>();
  const navigate = useNavigate(); 
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [message, setMessage] = useState<string>("");
  const [fetchError, setFetchError] = useState<boolean>(false);

  useEffect(() => {
   
    if (!customerId) {
      setMessage("Customer ID is missing. Redirecting...");
      setTimeout(() => navigate("/not-found"), 3000);
      return;
    }

    const fetchOrderItems = async () => {
      try {
        const response = await fetch(`${onlineEndPoint}/orderItems/customer/${customerId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const result = await response.json();

        if (response.ok) {
          setOrderItems(result);
          setMessage("Order items fetched successfully!");

        
          const productIds = result.map((item: OrderItem) => item.product_id);
          fetchProductDetails(productIds);

          
          
          fetchCustomerDetails(customerId);
        } else {
          setFetchError(true);
          setMessage(`Error: ${result.error}`);
        }
      } catch (error) {
        console.error("Error fetching order items:", error);
        setFetchError(true);
        setMessage("An error occurred while fetching the order items.");
      }
    };

    const fetchProductDetails = async (productIds: number[]) => {
      try {
        const response = await fetch(`${onlineEndPoint}/products/order/ids?ids=${productIds.join(",")}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const productsResult = await response.json();
        if (response.ok) {
          const productsWithQuantity = productsResult.map((product: Product) => {
            const matchingOrderItem = orderItems.find(item => item.product_id === product.id);
            return {
              ...product,
              quantity: matchingOrderItem ? matchingOrderItem.quantity : 1,
            };
          });
          setProducts(productsWithQuantity);
        } else {
          setFetchError(true);
          setMessage(`Error fetching product details: ${productsResult.error}`);
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
        setFetchError(true);
        setMessage("An error occurred while fetching product details.");
      }
    };

    const fetchCustomerDetails = async (customerId: string) => {
      try {
      
      
        const response = await fetch(`${onlineEndPoint}/customers/${customerId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
     console.log(response);
     
        const customerResult = await response.json();
        if (response.ok) {
          setCustomer(customerResult); 
     
          
        } else {
          setFetchError(true);
          setMessage(`Error fetching customer details: ${customerResult.error}`);
        }
      } catch (error) {
        console.error("Error fetching customer details:", error);
        setFetchError(true);
        setMessage("An error occurred while fetching customer details.");
      }
    };

    fetchOrderItems();
  }, [customerId]);

  return (
    <Box py={32}>
      <Container>
  
       
        <Flex justify="space-between" align="center">
          <Title order={2}>Thanks for Shopping</Title>
        </Flex>

        {customer && (
          <Box mb={32}>
            <Text size="xl">
              Thank you for shopping! Your bill will be sent to your email: <strong>{customer.email}</strong>
            </Text>
          </Box>
        )}


        {message && (
          <Notification
            mt={16}
            color={fetchError ? "red" : "green"}
            icon={fetchError ? <IconX size={18} /> : <IconCheck size={18} />}
            onClose={() => setMessage("")}
          >
            {message}
          </Notification>
        )}

        {/* Display the order items */}
        <Box mt={16}>
          <Title order={3}>Order Items</Title>
          {orderItems.length === 0 ? (
            <Text>No order items found for this customer.</Text>
          ) : (
            products.map((product) => (
              <ProductCard
                key={product.id}
                product={{
                  id: product.id,
                  name: product.name,
                  description: product.description,
                  price: product.price,
                  imageURL: product.imageURL,
                  quantity: product.quantity,
                }}
              />
            ))
          )}
        </Box>

     
        <Box mt={16}>
          <Title order={4}>Order Summary</Title>
          {orderItems.length > 0 && (
            <>
              <Text>Order ID: {orderItems[0]?.order_id}</Text>
              <Text>
                Total Amount: $
                {orderItems
                  .reduce((total, item) => total + parseFloat(item.total_price), 0)
                  .toFixed(2)}
              </Text>
            </>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default CustomerOrders;
