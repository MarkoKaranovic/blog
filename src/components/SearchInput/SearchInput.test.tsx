import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';

import SearchInput from '.';

it('Should render a Search Input', () => {
  render(<SearchInput />);
  const btn = screen.getByTestId('search-input');
  expect(btn).toBeVisible();
});
it('Default value in the Search Input', async () => {
  render(<SearchInput value="Demo test" />);
  const input = screen.getByTestId('search-input');

  expect(input).toHaveValue('Demo test');
});
it('Filled input with text Search Input', async () => {
  const onChange = jest.fn((val) => val);
  render(<SearchInput onChange={onChange} />);
  const input = screen.getByTestId('search-input');

  input.focus();
  expect(input).toHaveFocus();

  userEvent.keyboard('{t}{e}{s}{t}');
  expect(input).toHaveValue('test');
  expect(onChange).toHaveBeenCalledTimes(1);
});
it('Change props on Search Input', async () => {
  const { rerender } = render(<SearchInput value="test" />);
  const input = screen.getByTestId('search-input');
  expect(input).toHaveValue('test');

  rerender(<SearchInput value="demo test" />);
  expect(input).toHaveValue('demo test');
});
