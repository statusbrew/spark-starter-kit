import { connection } from "../dbConnection";

// Create a category
export const createCategory = async (req, res) => {  
  const {name} = req.body;
  try {
    // Check if a category with the same name already exists
    const checkQuery = `SELECT * FROM category WHERE name = ?`;
    connection.query(checkQuery, [name], async (checkError, checkResults) => {
      if (checkError) {
        console.error('Error checking category existence:', checkError);
        return res.status(500).send({ error: 'Database error while checking category' });
      }

      // If the category already exists, return an error
      if (checkResults.length > 0) {
        return res.status(400).send({ message: 'Category with this name already exists' });
      }

      const insertQuery = `INSERT INTO category (name) VALUES (?)`;
      const values = [name];

      connection.query(insertQuery, values, (insertError, insertResults) => {
        if (insertError) {
          console.error('Error inserting category:', insertError);
          return res.status(500).send({ error: 'Database error while inserting category' });
        }
        res.status(201).send({ message: 'Category created successfully', results: insertResults });
      });
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Read all categories
export const getAllCategories = async (req, res) => {
  const query = `SELECT * FROM category`;
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

// Read a single category
export const getCategoryById = async (req, res) => {
  const { id } = req.params;
  const query = `SELECT * FROM category WHERE id = ?`;
  try {
    connection.query(query, [id], (error, results) => {
      if (error) {
        console.error("MySQL query error:", error);
        res.status(500).json({ message: "Internal Server Error" });
      } else {
        if (results.length === 0) {
          res.status(404).json({ message: "Category not found" });
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

// Update a category
export const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  console.log("ID: ", id); // Should log the category ID
  console.log("Name: ", name); // Should log the name

  try {
    // Check if the category exists
    const checkQuery = `SELECT * FROM category WHERE id = ?`;
    connection.query(checkQuery, [id], async (checkError, checkResults) => {
      if (checkError) {
        console.error("Error checking category existence:", checkError);
        return res.status(500).send({ error: "Database error while checking category" });
      }

      // If category doesn't exist, return 404 error
      if (checkResults.length === 0) {
        return res.status(404).json({ message: "Category not found" });
      }

      // Update the category in the database
      const updateQuery = `UPDATE category SET name = ? WHERE id = ?`;
      const values = [name, id];

      connection.query(updateQuery, values, (updateError, updateResults) => {
        if (updateError) {
          console.error("MySQL query error:", updateError);
          return res.status(500).json({ message: "Internal Server Error" });
        }

        if (updateResults.affectedRows === 0) {
          return res.status(404).json({ message: "Category not found" });
        }

        res.status(200).json({ message: "Category updated successfully" });
      });
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete a category
export const deleteCategory = async (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM category WHERE id = ?`;
  try {
    connection.query(query, [id], (error, results) => {
      if (error) {
        console.error("MySQL query error:", error);
        res.status(500).json({ message: "Internal Server Error" });
      } else {
        if (results.affectedRows === 0) {
          res.status(404).json({ message: "Category not found" });
        } else {
          res.status(200).json({ message: "Category deleted successfully" });
        }
      }
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
