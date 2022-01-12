import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import productRouter from './routers/productRouter.js';
import userRouter from "./routers/userRouter.js";
import orderRouter from './routers/orderRouter.js';

dotenv.config();

const PAYPAL_CLIENT_ID='Afs--6eRP8FiAdgIdknxIIlaaD7bieVY_FEKOc0ybY7CDuGEZPqnrrNIHiMEFHyfz6XWNAVgFsOI6ucf';

const connectionString =
  "mongodb+srv://topfit_paypal:p748@nodeexpressprojects.kn587.mongodb.net/topfit_users?retryWrites=true&w=majority";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(process.env.MONGODB_URL || connectionString)
  .then(() => console.log("SERVER IS CONNECTED TO THE DATASE..."))
  .catch((error) => console.log("SERVER IS NOT CONNECTED", error));

app.get("/", (req, res) => {
  res.send("Server is ready");
});


app.use("/api/users", userRouter);

app.use('/api/products', productRouter);

app.use('/api/orders', orderRouter);

app.get('/api/config/paypal', (req, res) => {
  res.send(PAYPAL_CLIENT_ID || 'sb');
});

app.get("/", (req, res) => {
  res.send("Server is ready");
});

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
