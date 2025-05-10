import '../styles/Habits.css';
import { useState } from 'react';

interface Habit {
  id: number;
  description: string;
}

interface HabitsProps {
  habits: Habit[];
}

function Habits({ habits }: HabitsProps) {
  const [completedHabits, setCompletedHabits] = useState<number[]>([]);

  const handleChange = (habitId: number) => {
    setCompletedHabits((prev) => {
      if (prev.includes(habitId)) {
        return prev.filter((id) => id !== habitId);
      }
      return [...prev, habitId];
    });
  };

  return (
    <div className="habits">
      {habits.map((habit) => (
        <div key={habit.id} className="habit">
          <input
            type="checkbox"
            checked={completedHabits.includes(habit.id)}
            onChange={() => handleChange(habit.id)}
          />
          <p>{habit.description}</p>
        </div>
      ))}
    </div>
  );
}

export default Habits;
