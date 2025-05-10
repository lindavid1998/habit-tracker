import { useState } from 'react';
import Dropdown from './Dropdown';
import '../styles/AddHabitForm.css';
import Button from './Button';
import BackArrow from './icons/BackArrow';
import Textarea from './Textarea';

const locations: string[] = ['San Diego, CA', 'Seattle, WA', 'New York, NY'];

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

interface AddHabitFormProps {
  onClickBack: () => void;
}

const BACKEND_URL = 'http://localhost:3000/habit';

export default function AddHabitForm({ onClickBack }: AddHabitFormProps) {
  const [origin, setOrigin] = useState<string>('');
  const [destination, setDestination] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  interface CreateHabitRequest {
    description: string;
    origin: string;
    destination: string;
    totalDistance: number;
  }

  const totalDistance = 100; // TODO: Calculate distance between origin and destination

  const CreateHabitRequestBody: CreateHabitRequest = {
    description,
    origin,
    destination,
    totalDistance,
  };

  const handleSubmit = async () => {
    setStatus('loading');
    try {
      const response = await fetch(BACKEND_URL, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(CreateHabitRequestBody),
      });

      const data = await response.json();

      if (!response.ok) {
        setStatus('error');
        setErrorMessage(data.message);
      }

      console.log('Successfully added habit id: ', data.habitId);
      setStatus('success');
      // TODO: redirect or refresh page?
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'An error occurred');
    }
  };

  const renderStatusMessage = () => {
    if (status === 'loading') {
      return (
        <div className="add-habit-form status">
          <div className="header loading-message">
            <div className="spinner"></div>
            <h3>Creating your habit...</h3>
          </div>
        </div>
      );
    }

    const title = status === 'success' ? 'Success' : 'Error';
    const subtitle = status === 'success' ? "Let's get to work!" : errorMessage;

    return (
      <div className="add-habit-form status">
        <button className="back-button" aria-label="Back" onClick={onClickBack}>
          <BackArrow />
        </button>
        <div className="header">
          <h3>{title}</h3>
          <p className="subtitle">{subtitle}</p>
        </div>
        <Button variant="secondary" className="full-width" onClick={onClickBack}>
          Okay
        </Button>
      </div>
    );
  };

  if (status != 'idle') {
    return renderStatusMessage();
  }

  return (
    <form className="add-habit-form" onSubmit={handleSubmit}>
      <button className="back-button" onClick={onClickBack}>
        <BackArrow />
      </button>

      <div className="header">
        <h3>Create a habit</h3>
        <p className="subtitle">What do you want to work on?</p>
      </div>

      <Dropdown
        options={locations.filter((loc) => loc !== destination)}
        label="Origin"
        value={origin}
        onChange={setOrigin}
        required
      />
      <Dropdown
        options={locations.filter((loc) => loc !== origin)}
        label="Destination"
        value={destination}
        onChange={setDestination}
        required
      />
      <Textarea label="Description" value={description} onChange={setDescription} required />

      <div className="add-button">
        <Button type="submit" className="full-width">
          Add habit
        </Button>
      </div>
    </form>
  );
}
