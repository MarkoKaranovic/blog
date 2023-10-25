import { render, screen } from '@testing-library/react';
import Button from './Button';
import { ButtonSize, ButtonTypes, Variants } from '../../types';

it('Should render a button', () => {
  render(<Button />);
  const btn = screen.getByTestId('btn');
  expect(btn).toBeVisible;
});
it('Should render a primary variant button', () => {
  const { container } = render(<Button variant={Variants.PRIMARY} />);
  container.getElementsByClassName('primary');
  expect(container.getElementsByClassName('primary').length).toBe(1);
});
it('Should render a secondary variant button', () => {
  const { container } = render(<Button variant={Variants.SECONDARY} />);
  container.getElementsByClassName('secondary');
  expect(container.getElementsByClassName('secondary').length).toBe(1);
});
it('Should render a circle type button', () => {
  const { container } = render(<Button type={ButtonTypes.CIRCLE} />);
  container.getElementsByClassName('circle');
  expect(container.getElementsByClassName('circle').length).toBe(1);
});
it('Should render a square type button', () => {
  const { container } = render(<Button type={ButtonTypes.SQUARE} />);
  container.getElementsByClassName('square');
  expect(container.getElementsByClassName('square').length).toBe(1);
});
it('Should render a small size button', () => {
  const { container } = render(<Button size={ButtonSize.SMALL} />);
  container.getElementsByClassName('small');
  expect(container.getElementsByClassName('small').length).toBe(1);
});
it('Should render a medium size button', () => {
  const { container } = render(<Button size={ButtonSize.MEDIUM} />);
  container.getElementsByClassName('medium');
  expect(container.getElementsByClassName('medium').length).toBe(1);
});
it('Should render a large size button', () => {
  const { container } = render(<Button size={ButtonSize.LARGE} />);
  container.getElementsByClassName('large');
  expect(container.getElementsByClassName('large').length).toBe(1);
});
it('Should render a xlarge size button', () => {
  const { container } = render(<Button size={ButtonSize.XLARGE} />);
  container.getElementsByClassName('xlarge');
  expect(container.getElementsByClassName('xlarge').length).toBe(1);
});
