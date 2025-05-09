import Header from '../components/Header';
import BackArrow from '../components/icons/BackArrow';
import MeatballsMenu from '../components/icons/MeatballsMenu';
import '../styles/Habit.css'

// TODO: Route back arrow back to Home page

export default function Habit() {
  return (
    <div className='habit-page'>
      <Header />
      <BackArrow />
      <div className="title">
        <h3>Exercise for 30 minutes</h3>
        <MeatballsMenu />
      </div>

      <div className="stats">
        <span className='stat-name'>Longest streak: <span className='stat-value'>12d</span></span>
        <span className='stat-name'>Current streak: <span className='stat-value'>15d</span></span>
        <span className='stat-name'>Distance traveled: <span className='stat-value'>500m</span></span>
      </div>
    </div>
  );
}
