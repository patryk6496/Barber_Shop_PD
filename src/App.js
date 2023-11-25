import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home'; // Upewnij się, że ścieżka do importu jest poprawna
import ReservationSystem from './Components/ReservationSystem'; // Upewnij się, że ścieżka do importu jest poprawna
import './App.css';
// Importuj inne komponenty, jeśli są potrzebne

function App() {
  return (
    <Router>
      <div className="App">
        {/* Header powinien być poza <Routes>, aby był wyświetlany na każdej podstronie */}
       
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rezerwacja" element={<ReservationSystem />} />
          {/* Dodaj więcej ścieżek w razie potrzeby */}
        </Routes>
        {/* Footer również powinien być poza <Routes> */}
       
      </div>
    </Router>
  );
}

export default App;
