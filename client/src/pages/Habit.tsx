import { useEffect, useState } from 'react';
import Header from '../components/Header';
import BackArrow from '../components/icons/BackArrow';
import MeatballsMenu from '../components/icons/MeatballsMenu';
import '../styles/Habit.css';
import { useParams, useNavigate } from 'react-router-dom';

interface Habit {
  description: string;
  longestStreak: number;
  currentStreak: number;
  distanceTraveled: number;
  totalDistance: number;
}

export default function Habit() {
  const params = useParams();
  const habitId = params.id;
  const [habit, setHabit] = useState<Habit | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  // ping backend for habit details
  // do i want to do this? or is it better to pass in data from parent component
  // since im already fetching all on the home page
  useEffect(() => {
    const fetchHabit = async () => {
      try {
        const response = await fetch(`http://localhost:3000/habit/${habitId}`, {
          credentials: 'include',
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.message);
          return;
        }

        const habit: Habit = {
          description: data.description,
          longestStreak: data.longest_streak,
          currentStreak: data.current_streak,
          distanceTraveled: data.distance_traveled,
          totalDistance: data.total_distance,
        };

        setHabit(habit);

        /*
        {
          "id": 21,
          "user_id": 7,
          "description": "test",
          "created_at": "2025-05-10T19:47:35.714Z",
          "origin": "origin",
          "destination": "destination",
          "total_distance": "1000",
          "distance_traveled": "0",
          "longest_streak": 0,
          "current_streak": 0,
          "last_completed": null
        }
        */
      } catch (error) {
        console.log(error);
        setError('An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchHabit();
  }, []);

  if (loading) {
    return <div>Loading habit...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="habit-page">
      <Header />
      <button aria-label="Back" onClick={() => navigate('/home')}>
        <BackArrow />
      </button>
      <div className="title">
        <h3>{habit?.description}</h3>
        <MeatballsMenu />
      </div>

      <div className="stats">
        <span className="stat-name">
          Longest streak: <span className="stat-value">{habit?.longestStreak}d</span>
        </span>
        <span className="stat-name">
          Current streak: <span className="stat-value">{habit?.currentStreak}d</span>
        </span>
        <span className="stat-name">
          Distance traveled: <span className="stat-value">{habit?.distanceTraveled}m</span>
        </span>
      </div>
    </div>
  );
}
