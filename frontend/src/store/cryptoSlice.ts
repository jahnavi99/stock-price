import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CryptoState {
  symbol: string;
  data: { price: number; timestamp: string }[];
}

const initialState: CryptoState = {
  symbol: 'bitcoin',
  data: [],
};

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    setSymbol(state, action: PayloadAction<string>) {
      state.symbol = action.payload;
    },
    setData(state, action: PayloadAction<{ price: number; timestamp: string }[]>) {
      state.data = action.payload;
    },
  },
});

export const { setSymbol, setData } = cryptoSlice.actions;
export default cryptoSlice.reducer;
