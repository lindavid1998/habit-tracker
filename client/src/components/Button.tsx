import '../styles/Button.css'
import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode,
  size?: 'sm' | 'md',
  variant?: 'primary' | 'secondary' | 'auth-toggle-active' | 'auth-toggle-inactive',
  onClick?: () => void;
}

function Button({ children, size = 'md', variant = 'primary', onClick }: ButtonProps) {
  return (
    <button onClick={onClick} className={`${size} ${variant}`}>{children}</button>
  )
}

export default Button