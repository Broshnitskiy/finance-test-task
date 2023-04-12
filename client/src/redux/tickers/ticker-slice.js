import { createSlice } from '@reduxjs/toolkit';
import {
  fetchTickers,
  updateTickers,
  stopConnection,
} from './ticker-operations';

const initialState = {
  tickerData: null,
  currentTicker: null,
  isConnected: false,
  error: null,
};

const tickerSlice = createSlice({
  name: 'ticker',
  initialState,
  reducers: {
    selectedTicker: (state, action) => {
      state.currentTicker = action.payload;
    },
  },
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

export const { selectedTicker } = tickerSlice.actions;

export default tickerSlice.reducer;
