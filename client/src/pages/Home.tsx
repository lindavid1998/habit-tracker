import Header from "../components/Header";
import Button from "../components/Button";
import Habits from "../components/Habits";
import '../styles/Home.css'

interface HomeProps {
  userName: string
}

const habits = [
  'Exercise for 30 minutes',
  'Drink 2L of water',
  'Water plants'
]

function Home({ userName }: HomeProps) {
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });

  return (
    <div className="home">
      <Header></Header>
      <div className="section">
        <h1>Welcome, {userName}</h1>
        <Button>Add habit</Button>
      </div>
      
      <div className="section">
        <h1>Today, {formattedDate}</h1>
        <Habits habits={habits} />
      </div>
    </div>
  );
}

export default Home
