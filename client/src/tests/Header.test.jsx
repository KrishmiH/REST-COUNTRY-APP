// src/tests/Header.test.js
import { render, screen } from '@testing-library/react';
import Header from '../components/Header';

test('renders the header component', () => {
  render(<Header />);
  const linkElement = screen.getByText(/Rest Countries Explorer/i);  // Change the text accordingly
  expect(linkElement).toBeInTheDocument();
});
