import './App.css';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Habit from './pages/Habit';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthProvider from './providers/AuthProvider';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route element={<PrivateRoute />}>
            <Route path="/home" element={<Home />} />
            <Route path="/habit/:id" element={<Habit />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
