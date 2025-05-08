import { useState } from 'react';
import Dropdown from './Dropdown';
import '../styles/AddHabitForm.css'
import Button from './Button';
import BackArrow from './icons/BackArrow';
import Textarea from './Textarea';

const locations: string[] = ['San Diego, CA', 'Seattle, WA', 'New York, NY'];

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export default function AddHabitForm() {
  const [origin, setOrigin] = useState<string>("")
  const [destination, setDestination] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errorMessage, setErrorMessage] = useState<string>("")

  const handleSubmit = async () => {
    setStatus('loading')
    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 2000)) // Simulated API call
      setStatus('success')
    } catch (error) {
      setStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'An error occurred')
    }
  }


  const renderStatusMessage = () => {
    if (status === 'loading') {
      return (
        <div className="add-habit-form status">
          <button className="back-button" aria-label="Back">
            <BackArrow />
          </button>
          <div className="header loading-message">
            <div className="spinner"></div>
            <h3>Creating your habit...</h3>
          </div>
        </div>
      );
    }

    const title = status === 'success' ? 'Success' : 'Error'
    const subtitle = status === 'success' ? "Let's get to work!" : errorMessage

    return (
      <div className="add-habit-form status">
        <button className="back-button" aria-label="Back">
          <BackArrow />
        </button>
        <div className="header">
          <h3>{title}</h3>
          <p className='subtitle'>{subtitle}</p>
        </div>
        <Button variant="secondary" className="full-width">Okay</Button>
      </div>
    )
  }

  if (status != 'idle') {
    return renderStatusMessage()
  }

  return (
    <div className='add-habit-form'>
      <button className="back-button">
        <BackArrow />
      </button>

      <div className="header">
        <h3>Create a habit</h3>
        <p className='subtitle'>What do you want to work on?</p>
      </div>

      <Dropdown options={locations.filter(loc => loc !== destination)} label="Origin" value={origin} onChange={setOrigin} />
      <Dropdown options={locations.filter(loc => loc !== origin)} label="Destination" value={destination} onChange={setDestination} />
      <Textarea 
        label="Description"
        value={description}
        onChange={setDescription}
        required
      />
      
      <div className="add-button">
        <Button onClick={handleSubmit} className='full-width'>
          Add habit
        </Button>
      </div>
    </div>
  );
}
