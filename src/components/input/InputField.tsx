import React from 'react';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { SxProps, Theme } from '@mui/material/styles';
import { Box } from '@mui/material';

interface CommonInputProps {
  name: string; // Input field name for Formik compatibility
  label?: string; // Optional label for the input field
  placeholder?: string;
  type?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void; // Optional onBlur event
  error?: boolean;
  helperText?: string;
  fullWidth?: boolean; // Optional prop for full width
  height?: string; // Custom height for the input field
  width?: string; // Custom width for the input field
  required?: boolean; // Optional required prop
  className?: string; // Optional className for additional styling
  sx?: SxProps<Theme>; // Additional styling props
}

const CommonInput: React.FC<CommonInputProps> = ({
  name,
  label,
  placeholder,
  type = 'text', // Default input type
  value,
  onChange,
  onBlur,
  error = false, // Default error state
  helperText,
  fullWidth = true, // Default to full width
  required = false, // Default required state
  height = '40px', // Default height
  width = '100%', // Default width
  className,
  sx,
}) => {
  return (
    <Box sx={{ width: width }}>
      {label && (
        <Typography
          variant="body1"
          sx={{ marginBottom: '5px', color: '#000' }} // Adjust styles as needed
        >
          {label}
        </Typography>
      )}
      <TextField
        name={name} // Pass name to TextField for Formik compatibility
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur} // Add onBlur for Formik's touch functionality
        error={error}
        helperText={helperText}
        fullWidth={fullWidth}
        required={required}
        variant="outlined"
        margin="normal"
        className={className}
        placeholder={placeholder}
        sx={{
          '& .MuiOutlinedInput-root': {
            height: height, // Custom height
            backgroundColor: 'white', // Set background color to white
            '& input': {
              padding: '0 14px',
              height: '100%', // Ensure the input height is 100%
              boxSizing: 'border-box',
              marginTop: '0',
              color: '#000000',
              '&::placeholder': {
                opacity: 1,
                color: '#999', // Placeholder color
              },
            },
            '& fieldset': {
              borderColor: error ? 'red' : undefined, // Error color for the border
              borderWidth: '1px',
            },
          },
          marginTop: '10px',
          marginBottom: '10px',
          ...sx, // Spread any additional styles
        }}
      />
    </Box>
  );
};

export default CommonInput;
