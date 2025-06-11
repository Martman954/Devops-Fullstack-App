import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

test('renders note input and submit button', () => {
  render(<App />);
  const inputElement = screen.getByPlaceholderText(/Enter your note here/i);
  const buttonElement = screen.getByRole('button', { name: /save note/i });
  expect(inputElement).toBeInTheDocument();
  expect(buttonElement).toBeInTheDocument();
});
