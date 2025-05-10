import Avatar from './Avatar';
import Button from './Button';
import '../styles/Header.css';
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext';

function Header() {
  const auth = useContext(AuthContext)

  return (
    <div className="app-header">
      <h3>Habit Tracker</h3>
      <div className="user">
        <Button variant="secondary" onClick={auth?.logout}>Sign out</Button>
        <Avatar letter="D"></Avatar>
      </div>
    </div>
  );
}

export default Header;
