import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  fetchTickers,
  stopConnection,
} from './redux/tickers/ticker-operations';
import Dashboard from './components/dashboard/Dashboard';

export function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTickers());
    return () => {
      dispatch(stopConnection());
    };
  }, [dispatch]);

  return (
    <div className="App">
      <Dashboard />
    </div>
  );
}
