import express from 'express';
import mongoose from 'mongoose';
import axios from 'axios';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

//MongoDB connection
mongoose.connect('mongodb://localhost:27017/stock-crypto')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB', err);
  });

//Define the data schema
const dataSchema = new mongoose.Schema({
  symbol: String,
  price: Number,
  timestamp: Date
});

 const Data = mongoose.model('Data', dataSchema);

const API_URL_FOR_BTC = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd';
const API_URL_FOR_ETH = 'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd';
const API_URL_FOR_OS = 'https://api.coingecko.com/api/v3/simple/price?ids=ethereans&vs_currencies=usd';
const API_URL_FOR_BMON = 'https://api.coingecko.com/api/v3/simple/price?ids=binamon&vs_currencies=usd';
const API_URL_FOR_BCS = 'https://api.coingecko.com/api/v3/simple/price?ids=bitclouds&vs_currencies=usd';

// Fetch data function
const fetchData = async (symbol: string, apiUrl: string) => {
  try {
    const response = await axios.get(apiUrl);
    const price = response.data[symbol].usd;
    const data = new Data({ symbol, price, timestamp: new Date() });
    await data.save();
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};


//Polling function
setInterval(() => {
  fetchData('bitcoin', API_URL_FOR_BTC);
  fetchData('ethereum', API_URL_FOR_ETH);
  fetchData('ethereans',API_URL_FOR_OS);
  fetchData('binamon', API_URL_FOR_BMON);
  fetchData('bitclouds', API_URL_FOR_BCS);
}, 5000);

// API endpoint to get data
app.get('/api/data/:symbol', async (req, res) => {
  const { symbol } = req.params;
  const data = await Data.find({ symbol }).sort({ timestamp: -1 }).limit(20);
  res.json(data);
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
