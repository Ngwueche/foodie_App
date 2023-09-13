import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import userRoutes from "./routes/user.js";
import productRoutes from "./routes/product.js";

const app = express();

// user routes
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(
  cors({
    origin: "*",
  })
);

// app.post("/", (req, res) => {
//   console.log("Testing");
//   res.send("app is running");
//   console.log(req.body);
// });
app.use("/", userRoutes);
app.use("/", userRoutes);
app.use("/", productRoutes);

const PORT = 7111;
const db_PWD = process.env.DB_PWD;
const db_NAME = process.env.DB_NAME;

mongoose.set("strictQuery", false);
mongoose
  .connect("mongodb://0.0.0.0:27017/Ecom", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => app.listen(PORT, () => console.log(`Server running on ${PORT}`)))
  .catch((error) => console.log(error.message));
