// Import modules
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors"
import dataRouter from "./Router/dataRoute.js"
dotenv.config({ path: "./config.env" });

const app = express();

app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
  }))

app.get("/", (req, res) => {
  res.send("Hello World! Server is running.");
});
app.use("/data",dataRouter)

const PORT = process.env.PORT || 3000;

// Start server
app.listen(PORT,async () => {
  await mongoose.connect(process.env.DATA_BASE);
  console.log("DB Connection Success");
  console.log(`Server running on http://localhost:${PORT}`);
});
