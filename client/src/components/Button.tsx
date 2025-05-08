import '../styles/Button.css'
import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode,
  size?: 'sm' | 'md',
  variant?: 'primary' | 'secondary' | 'auth-toggle-active' | 'auth-toggle-inactive',
  onClick?: () => void,
  className?: string;
}

function Button({ children, size = 'md', variant = 'primary', onClick, className = '' }: ButtonProps) {
  return (
    <button 
      onClick={onClick} 
      className={`${size} ${variant} ${className}`.trim()}
    >
      {children}
    </button>
  )
}

export default Button