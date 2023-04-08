import { createSlice } from '@reduxjs/toolkit';
import {
  fetchTickers,
  updateTickers,
  stopConnection,
} from './ticker-operations';

const initialState = {
  tickerData: null,
  isConnected: false,
  error: null,
};

const tickerSlice = createSlice({
  name: 'ticker',
  initialState,
  extraReducers: {
    [fetchTickers.fulfilled](state) {
      state.isConnected = true;
      state.error = null;
    },
    [fetchTickers.rejected](state, action) {
      state.error = action.payload;
    },

    [updateTickers.fulfilled](state, action) {
      state.tickerData = action.payload;
    },

    [stopConnection.fulfilled](state) {
      state.isConnected = false;
      state.error = null;
    },
    [stopConnection.rejected](state, action) {
      state.error = action.payload;
    },
  },
});

export default tickerSlice.reducer;
