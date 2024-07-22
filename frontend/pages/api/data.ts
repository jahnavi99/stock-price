// src/pages/api/data.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { symbol } = req.query;

  try {
    const response = await axios.get(`YOUR_BACKEND_API_URL?symbol=${symbol}`);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
};

export default handler;
