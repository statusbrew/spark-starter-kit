import { connection } from "../dbConnection";

// Create a product
const createProduct = async (req, res) => {
  const { name, description, price, stock, category_id, imageURL } = req.body;
  try {
    const insertQuery = `INSERT INTO product (name, description, price, stock, category_id, imageURL) VALUES (?, ?, ?, ?, ?, ?)`;
    const values = [name, description, price, stock, category_id, imageURL];

    connection.query(insertQuery, values, (insertError, insertResults) => {
      if (insertError) {
        console.error("Error inserting product:", insertError);
        return res.status(500).send({ error: "Database error while inserting product" });
      }
      res.status(201).send({ message: "Product created successfully", results: insertResults });
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Read all products
const getAllProducts = async (req, res) => {
  const query = `SELECT * FROM product`;
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

// Read a single product by ID
const getProductById = async (req, res) => {
  const { id } = req.params;
  const query = `SELECT * FROM product WHERE id = ?`;
  try {
    connection.query(query, [id], (error, results) => {
      if (error) {
        console.error("MySQL query error:", error);
        res.status(500).json({ message: "Internal Server Error" });
      } else {
        if (results.length === 0) {
          res.status(404).json({ message: "Product not found" });
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

// Update a product by ID
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, stock, category_id, imageURL } = req.body;

  try {
    const updateQuery = `UPDATE product SET name = ?, description = ?, price = ?, stock = ?, category_id = ?, imageURL = ? WHERE id = ?`;
    const values = [name, description, price, stock, category_id, imageURL, id];

    connection.query(updateQuery, values, (updateError, updateResults) => {
      if (updateError) {
        console.error("MySQL query error:", updateError);
        return res.status(500).json({ message: "Internal Server Error" });
      }

      if (updateResults.affectedRows === 0) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.status(200).json({ message: "Product updated successfully" });
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete a product by ID
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM product WHERE id = ?`;
  try {
    connection.query(query, [id], (error, results) => {
      if (error) {
        console.error("MySQL query error:", error);
        res.status(500).json({ message: "Internal Server Error" });
      } else {
        if (results.affectedRows === 0) {
          res.status(404).json({ message: "Product not found" });
        } else {
          res.status(200).json({ message: "Product deleted successfully" });
        }
      }
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
