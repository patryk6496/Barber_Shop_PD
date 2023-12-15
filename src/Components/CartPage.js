import React, { useState, useEffect } from 'react';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const userId = localStorage.getItem('userId'); // Pobierz userId z localStorage

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch(`/api/koszyk/${userId}`);
        const data = await response.json();
        setCartItems(data);
      } catch (error) {
        console.error('Błąd podczas pobierania danych koszyka:', error);
      }
    };

    if (userId) {
      fetchCartItems();
    }
  }, [userId]);

  return (
    <div>
      <h1>Koszyk</h1>
      <ul>
        {cartItems.map((item, index) => (
          <li key={index}>{item.name} - {item.price}</li>
        ))}
      </ul>
    </div>
  );
};

export default CartPage;
