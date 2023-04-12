import * as React from 'react';
import { useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
} from 'recharts';
import Title from '../title/Title';
import {
  getCurrentTicker,
  getTickersData,
} from '../../redux/tickers/ticker-selectors';
import { getTimeFromDate } from '../../helpers/formatingTimeFromDate';

const initialData = [{ time: '0', amount: 0 }];

export default function Chart() {
  const theme = useTheme();
  const currentTicker = useSelector(getCurrentTicker);
  const allTickers = useSelector(getTickersData);
  const [data, setData] = React.useState(initialData);

  const currentTickerData =
    allTickers?.find(el => el.ticker === currentTicker) ||
    (allTickers && allTickers[0]);

  React.useEffect(() => {
    const scheduleData = {
      time: currentTickerData
        ? getTimeFromDate(currentTickerData?.last_trade_time)
        : '0',
      amount: currentTickerData?.price || 0,
    };
    setData(prevData => [...prevData, scheduleData]);
  }, [
    currentTickerData,
    currentTickerData?.last_trade_time,
    currentTickerData?.price,
  ]);

  React.useEffect(() => {
    setData(initialData);
  }, [currentTicker]);

  return (
    <React.Fragment>
      {currentTickerData && (
        <>
          <Title>Today {currentTickerData.ticker}</Title>
          <ResponsiveContainer>
            <LineChart
              data={data}
              margin={{
                top: 16,
                right: 16,
                bottom: 0,
                left: 24,
              }}
            >
              <XAxis
                dataKey="time"
                stroke={theme.palette.text.secondary}
                style={theme.typography.body2}
              />
              <YAxis
                stroke={theme.palette.text.secondary}
                style={theme.typography.body2}
              >
                <Label
                  angle={270}
                  position="left"
                  style={{
                    textAnchor: 'middle',
                    fill: theme.palette.text.primary,
                    ...theme.typography.body1,
                  }}
                >
                  PRICE ($)
                </Label>
              </YAxis>
              <Line
                isAnimationActive={false}
                type="monotone"
                dataKey="amount"
                stroke={theme.palette.primary.main}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </>
      )}
    </React.Fragment>
  );
}
