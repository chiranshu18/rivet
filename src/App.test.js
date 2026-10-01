import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the splash wordmark on load', () => {
  render(<App />);
  expect(screen.getAllByText('Rivet').length).toBeGreaterThan(0);
});
