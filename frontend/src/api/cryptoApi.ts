// src/api/cryptoApi.ts
import axios from 'axios';

export const fetchCryptoData = async (symbol: string) => {
  const response = await axios.get(`http://localhost:3001/api/data/${symbol}`);
  return response.data;
};
