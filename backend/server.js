import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import dataRoutes from "./routes/route.js";

const app = express();   
const port = process.env.PORT || 3400;

app.use(express.json());
app.use(cors());

const url = "mongodb://localhost/frontendData";

mongoose
  .connect(url, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

app.use("/", dataRoutes);

app.use((err, req, res, next) => {
  console.error("Internal server error:", err);
  res.json({
    status: 500,
    error: "Internal server error",
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
