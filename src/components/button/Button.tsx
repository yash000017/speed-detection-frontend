import React from 'react';
import Button, { ButtonProps } from '@mui/material/Button';

interface CommonButtonProps extends ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: ButtonProps['variant']; // Use ButtonProps to infer valid variants
  color?: ButtonProps['color']; // Use ButtonProps to infer valid colors
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
  className?: string;
}

const CommonButton: React.FC<CommonButtonProps> = ({
  children,
  onClick,
  disabled = false,
  variant = 'contained',
  color = 'primary',
  type = 'button',
  fullWidth = false,
  className = '',
}) => {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      variant={variant}
      color={color}
      type={type}
      fullWidth={fullWidth}
      className={className}
    >
      {children}
    </Button>
  );
};

export default CommonButton;
