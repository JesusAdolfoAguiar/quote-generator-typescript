import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Click the New Quote button to generate a random quote!/i);
  expect(linkElement).toBeInTheDocument();
});
