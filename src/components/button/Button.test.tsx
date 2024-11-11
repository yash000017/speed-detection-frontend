import { render, screen, fireEvent } from '@testing-library/react';
import CommonButton from './Button';

describe('CommonButton Component', () => {
  it('should render button with children text', () => {
    render(<CommonButton>Click me</CommonButton>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('should call onClick when clicked', () => {
    const onClickMock = jest.fn();
    render(<CommonButton onClick={onClickMock}>Click me</CommonButton>);

    fireEvent.click(screen.getByText('Click me'));
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it('should be disabled when disabled prop is true', () => {
    render(<CommonButton disabled>Click me</CommonButton>);
    const button = screen.getByText('Click me');
    expect(button).toBeDisabled();
  });

  it('should have the correct variant', () => {
    render(<CommonButton variant="outlined">Click me</CommonButton>);
    const button = screen.getByText('Click me');
    expect(button).toHaveClass('MuiButton-outlined');
  });

  it('should have the correct color', () => {
    render(<CommonButton color="secondary">Click me</CommonButton>);
    const button = screen.getByText('Click me');
    expect(button).toHaveClass('MuiButton-containedSecondary');
  });

  it('should have fullWidth class when fullWidth prop is true', () => {
    render(<CommonButton fullWidth>Click me</CommonButton>);
    const button = screen.getByText('Click me');
    expect(button).toHaveClass('MuiButton-fullWidth');
  });

  it('should render with the correct type', () => {
    render(<CommonButton type="submit">Submit</CommonButton>);
    const button = screen.getByText('Submit');
    expect(button).toHaveAttribute('type', 'submit');
  });

  it('should render with custom className', () => {
    render(<CommonButton className="custom-class">Click me</CommonButton>);
    const button = screen.getByText('Click me');
    expect(button).toHaveClass('custom-class');
  });
});
