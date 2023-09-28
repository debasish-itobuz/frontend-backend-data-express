import Data from '../models/schema.js';

export const receivedData = async (req, res) => {
    const { data } = req.body;
  
    try {
      if (!data) {
        return res.json({
          status: 400,
          message: "Data is required",
        });
      }
  
      const newData = await Data.create({ data });
  
      res.json({
        data: newData.data,
        status: 200,
        message: "Data received and saved successfully",
      });
    } catch (err) {
      console.error("Error saving data:", err);
      res.json({
        status: 500,
        error: "Internal server error",
      });
    }
}