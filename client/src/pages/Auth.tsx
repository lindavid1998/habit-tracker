import AuthForm from '../components/AuthForm';
import '../styles/auth.css';

function Auth() {
  return (
    <div className="auth-page">
      <h1>Habit Tracker</h1>
      <AuthForm></AuthForm>
    </div>
  );
}

export default Auth;
