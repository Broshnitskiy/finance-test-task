import React from 'react';
import { render, screen, waitFor, cleanup } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { App } from '../components/App';

describe('App component', () => {
  test('renders App component', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>,
    );
    const appElement = screen.getByTestId('app');
    expect(appElement).toBeInTheDocument();
  });

  test('renders Dashboard component', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>,
    );
    const dashboardElement = screen.getByText('Online trading tickers');
    expect(dashboardElement).toBeInTheDocument();
  });

  test('Start/stop connections when component mount/unmount', async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>,
    );

    await waitFor(() => {
      const state = store.getState();
      expect(state.ticker.isConnected).toBeTruthy();
    });

    cleanup();

    await waitFor(() => {
      const state = store.getState();
      expect(state.ticker.isConnected).toBeFalsy();
    });
  });
});
