import Avatar from './Avatar';
import Button from './Button';
import '../styles/Header.css';

function Header() {
  return (
    <div className="app-header">
      <h3>Habit Tracker</h3>
      <div className="user">
        <Button variant="secondary">Sign out</Button>
        <Avatar letter="D"></Avatar>
      </div>
    </div>
  );
}

export default Header;
