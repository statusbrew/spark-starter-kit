import express from 'express';
import * as path from 'path';
import cors from "cors";
import categoriesRoute from "./routes/categories.js";
import productRoute from "./routes/products.js";
import customersRoutes from "./routes/products.js";
import barCoderRoutes from "./routes/barcode.js";
import paymentRoutes from "./routes/Gateway.js";
import orderItemRoute from "./routes/orderItem.js"
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
app.use('/payment', paymentRoutes);
app.use('/orderItem', orderItemRoute);
  


const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
