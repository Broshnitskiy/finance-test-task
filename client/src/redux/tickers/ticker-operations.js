import { createAsyncThunk } from '@reduxjs/toolkit';
import io from 'socket.io-client';

const socket = io('http://localhost:4000');

export const fetchTickers = createAsyncThunk(
  'tickers/fetch',
  async (_, { getState, dispatch, rejectWithValue }) => {
    const store = getState();
    try {
      if (!store.ticker.isConnected) {
        socket.connect();
      }
      socket.emit('start');

      socket.on('ticker', data => {
        dispatch(updateTickers(data));
      });
    } catch (error) {
      return rejectWithValue({
        message: error.message,
        status: error.status || 500,
      });
    }
  },
);

export const updateTickers = createAsyncThunk(
  'ticker/update',
  async newTickers => {
    return newTickers;
  },
);

export const stopConnection = createAsyncThunk(
  'tickers/disconnect',
  async (_, { rejectWithValue }) => {
    try {
      socket.disconnect();
      return null;
    } catch (error) {
      console.error('Error while stopping the streaming:', error);
      return rejectWithValue({
        message: error.message,
        status: error.status || 500,
      });
    }
  },
);
