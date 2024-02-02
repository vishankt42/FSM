import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import ModThree from './ModThree';


test('Default state and rendering', () => {
  const { getByLabelText, getByText } = render(<ModThree />);
  expect(screen.getByText('Mod Three State Machine')).toBeInTheDocument();
  expect(getByLabelText('Input Binary Value:')).toBeInTheDocument();
  expect(getByText('Process Input')).toBeInTheDocument();
});

test('Example 1: Input "110"', async () => {
  const { getByLabelText, getByText } = render(<ModThree />);
  fireEvent.change(getByLabelText('Input Binary Value:'), { target: { value: '110' } });
  fireEvent.click(getByText('Process Input'));

  // Check if the output value and remainder are correct
  expect(await screen.findByText('Output State Value: S0')).toBeInTheDocument();
  expect(await screen.findByText('Remainder Mod Three: 0')).toBeInTheDocument();
});

test('Example 2: Input "1010"', async () => {
  const { getByLabelText, getByText } = render(<ModThree />);

  // Fill and submit the form for Example 2
  fireEvent.change(getByLabelText('Input Binary Value:'), { target: { value: '1010' } });
  fireEvent.click(getByText('Process Input'));

  // Check if the output value and remainder are correct
  expect(await screen.findByText('Output State Value: S1')).toBeInTheDocument();
  expect(await screen.findByText('Remainder Mod Three: 1')).toBeInTheDocument();
});

test('Invalid input: Non-binary value', async () => {
  const { getByLabelText, getByText } = render(<ModThree />);

  // Fill and submit the form with a non-binary value
  fireEvent.change(getByLabelText('Input Binary Value:'), { target: { value: '123' } });
  fireEvent.click(getByText('Process Input'));

  // Check if an error message is displayed
  expect(await screen.findByText('Invalid input. Please enter a binary value.')).toBeInTheDocument();
});
