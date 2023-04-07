import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './App.css';

const socket = io('http://localhost:4000');

export function App() {
  const [quotes, setQuotes] = useState([]);
  console.log(quotes);

  const handleDisconect = () => {
    socket.disconnect();
  };

  useEffect(() => {
    if (!socket) {
      return;
    }

    socket.emit('start');

    socket.on('ticker', newQuotes => {
      setQuotes(newQuotes);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="App">
      {quotes.map(quote => (
        <div key={quote.ticker}>
          <p>Ticker: {quote.ticker}</p>
          <p>Price: {quote.price}</p>
          <p>Change: {quote.change}</p>
        </div>
      ))}
      <button type="button" onClick={handleDisconect}>
        Stop conection
      </button>
    </div>
  );
}
