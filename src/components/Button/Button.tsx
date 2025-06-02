import { ReactNode } from 'react';
import styles from './Button.module.css';

interface ButtonProps {
  children: ReactNode;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'outline';
  onClick?: () => void;
  disabled?: boolean;
}

const Button = ({
  children,
  type = 'button',
  variant = 'primary',
  onClick,
  disabled = false,
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={`${styles.button} ${styles[variant]}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
