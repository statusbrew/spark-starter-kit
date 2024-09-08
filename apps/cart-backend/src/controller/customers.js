import { connection } from "../dbConnection";

// Create a customer
const createCustomer = async (req, res) => {
  const { email, phone_number } = req.body;
  try {
    const insertQuery = `INSERT INTO customer (email, phone_number) VALUES (?, ?)`;
    const values = [email, phone_number];

    connection.query(insertQuery, values, (insertError, insertResults) => {
      if (insertError) {
        console.error("Error inserting customer:", insertError);
        return res.status(500).send({ error: "Database error while inserting customer" });
      }
      res.status(201).send({ message: "Customer created successfully", results: insertResults });
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Read all customers
const getAllCustomers = async (req, res) => {
  const query = `SELECT * FROM customer`;
  try {
    connection.query(query, (error, results) => {
      if (error) {
        console.error("MySQL query error:", error);
        res.status(500).json({ message: "Internal Server Error" });
      } else {
        res.status(200).json(results);
      }
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Read a single customer by ID
const getCustomerById = async (req, res) => {
  const { id } = req.params;
  
  
  const query = `SELECT * FROM customer WHERE id = ?`;
  try {
    connection.query(query, [id], (error, results) => {
      if (error) {
        console.error("MySQL query error:", error);
        res.status(500).json({ message: "Internal Server Error" });
      } else {
        if (results.length === 0) {
          res.status(404).json({ message: "Customer not found" });
        } else {
          res.status(200).json(results[0]);
        }
      }
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update a customer by ID
const updateCustomer = async (req, res) => {
  const { id } = req.params;
  const { email, phone_number } = req.body;

  try {
    const updateQuery = `UPDATE customer SET email = ?, phone_number = ? WHERE id = ?`;
    const values = [email, phone_number, id];

    connection.query(updateQuery, values, (updateError, updateResults) => {
      if (updateError) {
        console.error("MySQL query error:", updateError);
        return res.status(500).json({ message: "Internal Server Error" });
      }

      if (updateResults.affectedRows === 0) {
        return res.status(404).json({ message: "Customer not found" });
      }

      res.status(200).json({ message: "Customer updated successfully" });
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete a customer by ID
const deleteCustomer = async (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM customer WHERE id = ?`;
  try {
    connection.query(query, [id], (error, results) => {
      if (error) {
        console.error("MySQL query error:", error);
        res.status(500).json({ message: "Internal Server Error" });
      } else {
        if (results.affectedRows === 0) {
          res.status(404).json({ message: "Customer not found" });
        } else {
          res.status(200).json({ message: "Customer deleted successfully" });
        }
      }
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
};
