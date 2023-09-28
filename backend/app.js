import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";

const app = express();
const port = process.env.PORT || 3400;

// Middleware to parse JSON requests
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

// Create a schema and model for storing data in MongoDB
const dataSchema = new mongoose.Schema({
  data: {
    type: String,
    required: true, // Add validation rules
  },
});

const Data = mongoose.model("Data", dataSchema);

// Handle POST request for data submission
app.post("/submit-data", async (req, res) => {
  const data = req.body.data;

  // Perform validation
  if (!data) {
    return res.json({
      data: null,
      status: 400,
      message: "Data is required",
    });
  }

  // Save data to the database
  const newData = await Data.create({ data });

  if (newData) {
    res.json({
      data: data,
      status: 200,
      message: "Data received and saved successfully",
    });
  } else {
    console.error("Error saving data:", err);
    res.json({
      status: 500,
      error: "Internal server error",
    });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
