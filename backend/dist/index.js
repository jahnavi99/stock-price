"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const axios_1 = __importDefault(require("axios"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
//MongoDB connection
mongoose_1.default.connect('mongodb://localhost:27017/stock-crypto')
    .then(() => {
    console.log('Connected to MongoDB');
})
    .catch(err => {
    console.error('Error connecting to MongoDB', err);
});
//Define the data schema
const dataSchema = new mongoose_1.default.Schema({
    symbol: String,
    price: Number,
    timestamp: Date
});
const Data = mongoose_1.default.model('Data', dataSchema);
// Example API URLs for demonstration using CoinGecko
const API_URL_FOR_BTC = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd';
const API_URL_FOR_ETH = 'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd'; // Using Ethereum as an example
const API_URL_FOR_OS = 'https://api.coingecko.com/api/v3/simple/price?ids=ethereans&vs_currencies=usd';
const API_URL_FOR_BMON = 'https://api.coingecko.com/api/v3/simple/price?ids=binamon&vs_currencies=usd';
const API_URL_FOR_BCS = 'https://api.coingecko.com/api/v3/simple/price?ids=bitclouds&vs_currencies=usd';
// Fetch data function
const fetchData = (symbol, apiUrl) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get(apiUrl);
        const price = response.data[symbol].usd; // Adjust based on API response structure
        const data = new Data({ symbol, price, timestamp: new Date() });
        yield data.save();
    }
    catch (error) {
        console.error('Error fetching data:', error);
    }
});
//Polling function
setInterval(() => {
    fetchData('bitcoin', API_URL_FOR_BTC);
    fetchData('ethereum', API_URL_FOR_ETH);
    fetchData('ethereans', API_URL_FOR_OS);
    fetchData('binamon', API_URL_FOR_BMON);
    fetchData('bitclouds', API_URL_FOR_BCS);
    // Add more symbols as nee
}, 5000);
// API endpoint to get data
app.get('/api/data/:symbol', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { symbol } = req.params;
    const data = yield Data.find({ symbol }).sort({ timestamp: -1 }).limit(20);
    res.json(data);
}));
// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
