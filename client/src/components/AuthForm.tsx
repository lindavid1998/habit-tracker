import { useState, useContext } from 'react';
import Button from './Button';
import TextInput from './TextInput';
import '../styles/auth.css';
import { useNavigate } from 'react-router-dom';
import { AuthContext, AuthContextType, User } from '../context/AuthContext';

interface AuthFormData {
  name?: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

interface AuthHandlers {
  onNameChange?: (value: string) => void;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onConfirmPasswordChange?: (value: string) => void;
}

function LoginForm({ data, handlers }: { data: AuthFormData; handlers: AuthHandlers }) {
  const { email, password } = data;
  const { onEmailChange, onPasswordChange } = handlers;

  return (
    <div className="login-form">
      <TextInput label="Email" type="email" onChange={onEmailChange} value={email} required />
      <TextInput
        label="Password"
        type="password"
        onChange={onPasswordChange}
        value={password}
        required
      />
      <Button className="full-width" type="submit">
        Log In
      </Button>
    </div>
  );
}

function SignUpForm({ data, handlers }: { data: AuthFormData; handlers: AuthHandlers }) {
  const { name, email, password, confirmPassword } = data;
  const { onNameChange, onEmailChange, onPasswordChange, onConfirmPasswordChange } = handlers;

  return (
    <div className="signup-form">
      <TextInput label="Name" value={name} onChange={onNameChange} required />
      <TextInput label="Email" type="email" value={email} onChange={onEmailChange} required />
      <TextInput
        label="Password"
        type="password"
        value={password}
        onChange={onPasswordChange}
        required
      />
      <TextInput
        label="Confirm Password"
        type="password"
        value={confirmPassword}
        onChange={onConfirmPasswordChange}
        required
      />
      <Button className="full-width" type="submit">
        Sign Up
      </Button>
    </div>
  );
}

function AuthForm() {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const auth: AuthContextType | null = useContext(AuthContext);
  let navigate = useNavigate();

  const formData: AuthFormData = {
    name,
    email,
    password,
    confirmPassword,
  };

  const formHandlers: AuthHandlers = {
    onNameChange: setName,
    onEmailChange: setEmail,
    onPasswordChange: setPassword,
    onConfirmPasswordChange: setConfirmPassword,
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    isLogin ? await handleLogIn() : await handleSignUp();
    if (!error) {
      navigate('/home');
    }
  };

  const BACKEND_URL = 'http://localhost:3000/auth';

  const handleLogIn = async (): Promise<void> => {
    try {
      const response = await fetch(`${BACKEND_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error);
        return;
      }

      console.log('Login successful:', data);
      setError('');
      auth?.setUser(data.user); // update auth context
    } catch (error) {
      setError('An error occurred');
    }
  };

  const handleSignUp = async (): Promise<void> => {
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await fetch(`${BACKEND_URL}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          name,
          email,
          password,
          confirmPassword,
        }),
      });

      // Handle successful signup
      const data = await response.json();

      if (!response.ok) {
        setError(data.error);
        return;
      }

      console.log('Signup successful:', data);
      setError('');
      auth?.setUser(data.user); // update auth context
    } catch (error) {
      setError('An error occurred');
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <div className="auth-toggle">
        <Button
          variant={isLogin ? 'auth-toggle-active' : 'auth-toggle-inactive'}
          onClick={() => setIsLogin(true)}
          className="full-width"
        >
          Log In
        </Button>
        <Button
          variant={!isLogin ? 'auth-toggle-active' : 'auth-toggle-inactive'}
          onClick={() => setIsLogin(false)}
          className="full-width"
        >
          Sign Up
        </Button>
      </div>

      {error && <div className="error-msg">{error}</div>}

      {isLogin ? (
        <LoginForm data={formData} handlers={formHandlers} />
      ) : (
        <SignUpForm data={formData} handlers={formHandlers} />
      )}
    </form>
  );
}

export default AuthForm;
