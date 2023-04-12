import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from '../title/Title';
import { useSelector } from 'react-redux';
import {
  getCurrentTicker,
  getTickersData,
} from '../../redux/tickers/ticker-selectors';

function preventDefault(event) {
  event.preventDefault();
}

export default function Deposits() {
  const currentTicker = useSelector(getCurrentTicker);
  const allTickers = useSelector(getTickersData);

  const currentTickerData =
    allTickers?.find(el => el.ticker === currentTicker) ||
    (allTickers && allTickers[0]);

  return (
    <>
      {currentTickerData && (
        <>
          <Title>
            Pointed Ticker: {currentTickerData.ticker?.toUpperCase()}
          </Title>
          <Typography component="p" variant="h4" sx={{ textAlign: 'center' }}>
            $ {currentTickerData.price}
          </Typography>
          <Typography
            color="text.secondary"
            sx={{ flex: 0, textAlign: 'center' }}
          >
            Dividend: {currentTickerData.dividend}
          </Typography>
          <Typography
            color="text.secondary"
            sx={{ flex: 1, textAlign: 'center' }}
          >
            Yield: {currentTickerData.yield}
          </Typography>
          <div style={{ textAlign: 'center' }}>
            <Link color="primary" href="#" onClick={preventDefault}>
              View balance
            </Link>
          </div>
        </>
      )}
    </>
  );
}
