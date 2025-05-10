import { useState, useContext, useEffect } from 'react';
import Header from '../components/Header';
import Button from '../components/Button';
import Habits from '../components/Habits';
import AddHabitForm from '../components/AddHabitForm';
import '../styles/Home.css';
import { AuthContext } from '../context/AuthContext';

interface Habit {
  id: number;
  description: string;
}

function Home() {
  const [showAddHabitForm, setShowAddHabitForm] = useState<boolean>(false);
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
  const auth = useContext(AuthContext);
  const [habits, setHabits] = useState<Habit[]>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const response = await fetch('http://localhost:3000/habits', {
          credentials: 'include',
        });
        const data = await response.json();

        if (!response.ok) {
          setError(data.message);
          return;
        }

        setHabits(data);
      } catch (error) {
        setError('An error occurred. Please try again later');
      } finally {
        setLoading(false);
      }
    };
    fetchHabits();
  }, []);

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

      {/* TODO: Add loading spinner */}
      <div className="section">
        <h1>Today, {formattedDate}</h1>
        {loading ? (
          <div>Loading habits...</div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : (
          <Habits habits={habits} />
        )}
      </div>
    </div>
  );
}

export default Home;
