import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home'; // Upewnij się, że ścieżka do importu jest poprawna
import ReservationSystem from './Components/ReservationSystem'; // Upewnij się, że ścieżka do importu jest poprawna
import './App.css';
import LoginRegisterForm from './Components/LoginRegisterForm';
import LoginForm from './Components/LoginForm';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Header powinien być poza <Routes>, aby był wyświetlany na każdej podstronie */}
       
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rezerwacja" element={<ReservationSystem />} />
		  <Route path="/rejestracja" element={<LoginRegisterForm />} />
		  <Route path="/logowanie" element={<LoginForm />} />
        </Routes>
        {/* Footer również powinien być poza <Routes> */}
       
      </div>
	  <ToastContainer />
    </Router>
  );
}

export default App;
