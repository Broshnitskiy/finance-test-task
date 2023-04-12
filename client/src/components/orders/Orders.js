import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../title/Title';
import {
  getTickersData,
  getCurrentTicker,
} from '../../redux/tickers/ticker-selectors';
import { convertUtcToKyivTime } from '../../helpers/formatingDateToKyiv';
import { selectedTicker } from '../../redux/tickers/ticker-slice';

export default function Orders() {
  const dispatch = useDispatch();
  const tickersData = useSelector(getTickersData);
  const currentTicker = useSelector(getCurrentTicker);

  const handleRowClick = currentRow => {
    dispatch(selectedTicker(currentRow.ticker));
  };

  return (
    <React.Fragment>
      <Title>All Tickers</Title>
      <div style={{ color: 'grey' }}>
        Trade time:{' '}
        {tickersData && convertUtcToKyivTime(tickersData[0]?.last_trade_time)}
      </div>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell style={{ fontWeight: 600 }}>NAME</TableCell>
            <TableCell style={{ fontWeight: 600 }}>PRICE</TableCell>
            <TableCell style={{ fontWeight: 600 }}>CHANGE</TableCell>
            <TableCell style={{ fontWeight: 600 }}>EXCHANGE</TableCell>
            <TableCell style={{ fontWeight: 600 }}>YIELD</TableCell>
            <TableCell align="right" style={{ fontWeight: 600 }}>
              DEVIDEND
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tickersData &&
            tickersData.map(row => (
              <TableRow
                key={row.ticker}
                onClick={() => handleRowClick(row)}
                hover={true}
                sx={{
                  backgroundColor:
                    row.ticker === currentTicker ? ' #FFA500' : 'inherit',
                }}
                style={{
                  cursor: 'pointer',
                  '&:hover': { backgroundColor: '#f5f5f5' },
                }}
              >
                <TableCell>{row.ticker}</TableCell>
                <TableCell>$ {row.price}</TableCell>
                <TableCell>
                  {row.change} ({row.change_percent}%)
                </TableCell>
                <TableCell>{row.exchange}</TableCell>
                <TableCell>{row.yield}</TableCell>
                <TableCell align="right">{row.dividend}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
