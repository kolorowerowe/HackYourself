import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders app title in sidebar', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Hack Yourself/i);
  expect(linkElement).toBeInTheDocument();
});
