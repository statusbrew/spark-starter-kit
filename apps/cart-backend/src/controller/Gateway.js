import Stripe from "stripe";
const stripe = new Stripe("sk_test_51P66VjSBINuBNg5tYFE9h5ZDizrr6eeDvOq1cwvhw2LUfeiNgUVwZdfI7quOauGQMm5ED9nDNkfZ4ItoFxsjmKW900i2DyK0Jz");
import { connection } from "../dbConnection";

const Gateway = async (req, res) => {
  const { cart, email } = req.body;
  console.log("Cart received:", cart);
  console.log("Email received:", email);

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: cart.map((product) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name,
          },
          unit_amount: Math.round(parseFloat(product.price) * 100),
        },
        quantity: product.quantity || 1,
      })),
      mode: "payment",
      success_url: "http://localhost:4200/cart",
      cancel_url: "http://localhost:4200/cart",
    });

    const customerQuery = "SELECT id FROM customer WHERE email = ?";
    connection.query(customerQuery, [email], (customerError, customerResults) => {
      if (customerError) {
        console.error("Error finding customer:", customerError);
        return res.status(500).json({ error: "Database error while finding customer." });
      }

      let customerId;
      if (customerResults.length === 0) {
        const insertCustomerQuery = "INSERT INTO customer (email) VALUES (?)";
        connection.query(insertCustomerQuery, [email], (insertError, insertResults) => {
          if (insertError) {
            console.error("Error inserting customer:", insertError);
            return res.status(500).json({ error: "Database error while creating customer." });
          }
          customerId = insertResults.insertId; 
          createOrderAndItems(customerId, cart, session.id, res);
        });
      } else {
        customerId = customerResults[0].id; 
        createOrderAndItems(customerId, cart, session.id, res);
      }
    });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: "Something went wrong." });
  }
};


const createOrderAndItems = (customerId, cart, sessionId, res) => {
  const orderQuery = "INSERT INTO orders (customer_id) VALUES (?)";
  connection.query(orderQuery, [customerId], (orderError, orderResults) => {
    if (orderError) {
      console.error("Error inserting order:", orderError);
      return res.status(500).json({ error: "Database error while creating order." });
    }

    const orderId = orderResults.insertId;

    const orderItemQuery = `
      INSERT INTO orderitem (order_id, product_id, quantity, total_price)
      VALUES (?, ?, ?, ?)
    `;

    cart.forEach((product) => {
      const totalAmount = parseFloat(product.price) * (product.quantity || 1);

      connection.query(
        orderItemQuery,
        [orderId, product.id, product.quantity || 1, totalAmount],
        (orderItemError) => {
          if (orderItemError) {
            console.error("Error inserting order item:", orderItemError);
            return res.status(500).json({ error: "Database error while inserting order item." });
          }
        }
      );
    });

    res.json({ id: sessionId });
  });
};

export default Gateway;
