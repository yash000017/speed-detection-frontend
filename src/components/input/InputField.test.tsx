import { render, screen, fireEvent } from '@testing-library/react';
import CommonInput from './InputField';
import '@testing-library/jest-dom';

describe('CommonInput Component', () => {
  const defaultProps = {
    name: 'test-input',
    label: 'Test Label',
    placeholder: 'Enter text',
    type: 'text',
    onChange: jest.fn(),
    onBlur: jest.fn(),
  };

  it('renders the input with label', () => {
    render(<CommonInput {...defaultProps} />);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  it('calls onChange when typing', () => {
    render(<CommonInput {...defaultProps} />);
    const input = screen.getByPlaceholderText('Enter text');
    
    fireEvent.change(input, { target: { value: 'New Value' } });
    expect(defaultProps.onChange).toHaveBeenCalled();
  });

  it('calls onBlur when input loses focus', () => {
    render(<CommonInput {...defaultProps} />);
    const input = screen.getByPlaceholderText('Enter text');
    
    fireEvent.blur(input);
    expect(defaultProps.onBlur).toHaveBeenCalled();
  });

//   it('renders error state with helper text', () => {
//     const errorProps = {
//       ...defaultProps,
//       error: true,
//       helperText: 'This is an error message',
//     };
    
//     render(<CommonInput {...errorProps} />);
//     expect(screen.getByText('This is an error message')).toBeInTheDocument();
    
//     // Check for error styles in the input container
//     const inputContainer = screen.getByRole('textbox').closest('.MuiOutlinedInput-root');
//     expect(inputContainer).toHaveStyle('border-color: red');
//   });

//   it('applies custom width and height', () => {
//     render(<CommonInput {...defaultProps} width="300px" height="50px" />);
    
//     const inputContainer = screen.getByRole('textbox').closest('.MuiOutlinedInput-root');
//     expect(inputContainer).toHaveStyle('width: 300px');
//     expect(inputContainer).toHaveStyle('height: 50px');
//   });

  it('renders required input field', () => {
    render(<CommonInput {...defaultProps} required />);
    expect(screen.getByRole('textbox')).toBeRequired();
  });

//   it('renders with additional custom styles', () => {
//     render(<CommonInput {...defaultProps} sx={{ backgroundColor: 'yellow' }} />);
//     const container = screen.getByRole('textbox').closest('.MuiOutlinedInput-root');
//     expect(container).toHaveStyle('background-color: yellow');
//   });

  it('does not render label if not provided', () => {
    render(<CommonInput {...defaultProps} label={undefined} />);
    expect(screen.queryByText('Test Label')).not.toBeInTheDocument();
  });
});
