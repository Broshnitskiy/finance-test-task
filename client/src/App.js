import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getTickersData,
  getIsConnected,
} from './redux/tickers/ticker-selectors';
import {
  fetchTickers,
  stopConnection,
} from './redux/tickers/ticker-operations';
import './App.css';

export function App() {
  const dispatch = useDispatch();
  const tickersData = useSelector(getTickersData);
  const isConnected = useSelector(getIsConnected);

  const handleConnect = () => {
    dispatch(fetchTickers());
  };
  const handleDisconnect = () => {
    dispatch(stopConnection());
  };

  useEffect(() => {
    dispatch(fetchTickers());
    return () => {
      dispatch(stopConnection());
    };
  }, [dispatch]);

  return (
    <div className="App">
      {tickersData &&
        tickersData.map(quote => (
          <div key={quote.ticker}>
            <p>Ticker: {quote.ticker}</p>
            <p>Price: {quote.price}</p>
            <p>Change: {quote.change}</p>
          </div>
        ))}
      <button type="button" onClick={handleDisconnect} disabled={!isConnected}>
        Stop conection
      </button>
      <button type="button" onClick={handleConnect} disabled={isConnected}>
        Start conection
      </button>
    </div>
  );
}
