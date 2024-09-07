import Stripe from "stripe";
const stripe = new Stripe("sk_test_51P66VjSBINuBNg5tYFE9h5ZDizrr6eeDvOq1cwvhw2LUfeiNgUVwZdfI7quOauGQMm5ED9nDNkfZ4ItoFxsjmKW900i2DyK0Jz");

import express from 'express';
import * as path from 'path';
import cors from "cors";
import categoriesRoute from "./routes/categories.js";
import productRoute from "./routes/products.js";
import customersRoutes from "./routes/products.js";
import barCoderRoutes from "./routes/barcode.js";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(cors({
  origin:"http://localhost:4200",
  credentials: true,}
));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.use("/categories",categoriesRoute);
app.use("/products",productRoute);
app.use("/customers",customersRoutes);
app.use("/barcode", barCoderRoutes);
app.post('/create-checkout-session', async (req, res) => {
    const { cart } = req.body;
    
    // Log cart for debugging
    console.log("Cart received:", cart);
  
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: cart.map((product) => ({
          price_data: {
            currency: 'usd',
            product_data: {
              name: product.name,
            },
            unit_amount: Math.round(parseFloat(product.price) * 100), 
          },
          quantity: product.quantity || 1, 
        })),
        mode: 'payment',
        success_url: 'http://localhost:3000/success',
        cancel_url: 'http://localhost:3000/cancel',
      });
  
      res.json({ id: session.id });
    } catch (error) {
      console.error("Error creating checkout session:", error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  });
  
  

app.listen(4000, () => {
    console.log("Server running on port 4000");
});

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
