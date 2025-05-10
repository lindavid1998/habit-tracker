import { useState, useContext } from 'react';
import Header from '../components/Header';
import Button from '../components/Button';
import Habits from '../components/Habits';
import AddHabitForm from '../components/AddHabitForm';
import '../styles/Home.css';
import { AuthContext } from '../context/AuthContext';

const habits = ['Exercise for 30 minutes', 'Drink 2L of water', 'Water plants'];

function Home() {
  const [showAddHabitForm, setShowAddHabitForm] = useState<boolean>(false);
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
  const auth = useContext(AuthContext);

  const toggleFormVisibility = () => {
    setShowAddHabitForm((prev) => !prev);
  };

  return (
    <div className="home">
      {showAddHabitForm && (
        <div className="form-overlay">
          <div className="form-container">
            <AddHabitForm onClickBack={toggleFormVisibility} />
          </div>
        </div>
      )}
      <Header />
      <div className="section">
        {auth?.user ? <h1>Welcome, {auth.user.name}</h1> : <h1>Welcome</h1>}
        <Button onClick={toggleFormVisibility}>Add habit</Button>
      </div>

      <div className="section">
        <h1>Today, {formattedDate}</h1>
        <Habits habits={habits} />
      </div>
    </div>
  );
}

export default Home;
