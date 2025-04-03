const express = require("express");
const axios = require("axios");
require("dotenv").config();
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// DeepSeek Proxy Endpoint
app.post("/api/deepseek", async (req, res) => {
  try {
    const response = await axios.post(
      "https://api.deepseek.com/v1/chat/completions",
      {
        model: "deepseek-chat",
        messages: req.body.messages, // Ensure this matches frontend payload
      },
      {
        headers: {
          "Authorization": `Bearer ${process.env.DEEPSEEK_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error("Backend Error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to call DeepSeek API" });
  }
});

app.listen(3001, () => console.log("Proxy running on port 3001"));