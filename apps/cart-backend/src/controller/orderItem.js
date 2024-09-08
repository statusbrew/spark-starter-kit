import { connection } from "../dbConnection";
export const getOrderItemsByCustomerId = (req, res) => {
  const customerId = req.params.customerId;
  const orderQuery = "SELECT id FROM orders WHERE customer_id = ?";
  
  connection.query(orderQuery, [customerId], (orderError, orderResults) => {
    if (orderError) {
      console.error("Error fetching orders:", orderError);
      return res.status(500).json({ error: "Database error while fetching orders." });
    }

    if (orderResults.length === 0) {
      return res.status(404).json({ message: "No orders found for this customer." });
    }

    const orderIds = orderResults.map(order => order.id);

    const orderItemQuery = `
      SELECT * FROM orderitem WHERE order_id IN (?)
    `;

    connection.query(orderItemQuery, [orderIds], (orderItemError, orderItemResults) => {
      if (orderItemError) {
        console.error("Error fetching order items:", orderItemError);
        return res.status(500).json({ error: "Database error while fetching order items." });
      }

      res.json(orderItemResults);
    });
  });
};
