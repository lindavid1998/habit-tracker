import { useState } from 'react';
import Dropdown from './Dropdown';
import '../styles/AddHabitForm.css'
import Button from './Button';
import BackArrow from './icons/BackArrow';
import Textarea from './Textarea';

const locations: string[] = ['San Diego, CA', 'Seattle, WA', 'New York, NY'];

export default function AddHabitForm() {
  const [origin, setOrigin] = useState<string>("")
  const [destination, setDestination] = useState<string>("")
  const [description, setDescription] = useState<string>("")

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
        <Button>Add habit</Button>
      </div>
    </div>
  );
}
