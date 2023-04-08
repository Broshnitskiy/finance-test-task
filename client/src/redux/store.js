import { configureStore } from '@reduxjs/toolkit';
import tickerReducer from './tickers/ticker-slice';

export const store = configureStore({
  reducer: {
    ticker: tickerReducer,
  },
  devTools: process.env.NODE_ENV === 'development',
});
