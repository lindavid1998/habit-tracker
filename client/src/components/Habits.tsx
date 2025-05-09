import '../styles/Habits.css';
import { useState } from 'react';

interface HabitsProps {
  habits: string[];
}

function Habits({ habits }: HabitsProps) {
  const [completedHabits, setCompletedHabits] = useState<string[]>([]);

  const handleChange = (habit: string) => {
    setCompletedHabits((prev) => {
      if (prev.includes(habit)) {
        return prev.filter((item) => item != habit);
      }

      return [...prev, habit];
    });
  };

  return (
    <div className="habits">
      {habits.map((habit, index) => (
        <div key={index} className="habit">
          <input
            type="checkbox"
            checked={completedHabits.includes(habit)}
            onChange={() => handleChange(habit)}
          />
          <p>{habit}</p>
        </div>
      ))}
    </div>
  );
}

export default Habits;
