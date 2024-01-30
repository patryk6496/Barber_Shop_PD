import React from 'react';
import { ProductsProvider } from './Components/ProductsContext'; 
import products from './Components/productsData'; // Zaimportuj dane produktów

import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home'; // Upewnij się, że ścieżka do importu jest poprawna
import ReservationSystem from './Components/ReservationSystem'; // Upewnij się, że ścieżka do importu jest poprawna
import LoginRegisterForm from './Components/LoginRegisterForm';
import LoginForm from './Components/LoginForm';
import AccountPanel from './Components/AccountPanel'
import CartPage from './Components/CartPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {
  return (
	<ProductsProvider products={products}>
    <Router>
      <div className="App">
        {/* Header powinien być poza <Routes>, aby był wyświetlany na każdej podstronie */}
       
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rezerwacja" element={<ReservationSystem />} />
		  <Route path="/rejestracja" element={<LoginRegisterForm />} />
		  <Route path="/logowanie" element={<LoginForm />} />
		  <Route path="/panel-konta" element={<AccountPanel products={products} />} />
		  <Route path="/koszyk" element={<CartPage />} />
        </Routes>
        {/* Footer również powinien być poza <Routes> */}
       
      </div>
	  <ToastContainer />
    </Router>
	</ProductsProvider>
  );
}

export default App;
