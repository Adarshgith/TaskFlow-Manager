import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import userRoutes from "./routes/userRoute.js"; 
import cors from "cors";    

const app = express();
app.use(bodyParser.json());
app.use(cors());
dotenv.config();
const PORT = process.env.PORT || 8000;

const MONGO_URL = process.env.MONGO_URL;

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB:", err);
  });

app.use("/api", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});
