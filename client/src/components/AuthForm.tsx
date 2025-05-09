import { useState } from 'react';
import Button from './Button';
import TextInput from './TextInput';
import '../styles/auth.css';

function LoginForm() {
  return (
    <div className="login-form">
      <TextInput label="Email" required />
      <TextInput label="Password" required />
      <Button>Log In</Button>
    </div>
  );
}

function SignUpForm() {
  return (
    <div className="signup-form">
      <TextInput label="Name" required />
      <TextInput label="Email" required />
      <TextInput label="Password" type="password" required />
      <TextInput label="Confirm Password" type="password" required />
      <Button>Sign Up</Button>
    </div>
  );
}

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="auth-form">
      <div className="auth-toggle">
        <Button
          variant={isLogin ? 'auth-toggle-active' : 'auth-toggle-inactive'}
          onClick={() => setIsLogin(true)}
        >
          Log In
        </Button>
        <Button
          variant={!isLogin ? 'auth-toggle-active' : 'auth-toggle-inactive'}
          onClick={() => setIsLogin(false)}
        >
          Sign Up
        </Button>
      </div>
      {isLogin ? <LoginForm /> : <SignUpForm />}
    </div>
  );
}

export default AuthForm;
