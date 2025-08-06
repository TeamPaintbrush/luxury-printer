// backend/index.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 2654;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Luxury Printer Backend is running.');
});

// Example endpoint for OpenAI integration (to be implemented)
// app.post('/api/generate', async (req, res) => {
//   // OpenAI logic here
// });

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
