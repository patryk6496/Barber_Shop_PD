import React, { useState, useEffect } from 'react';
import Footer from './Footer'
import Header from './Header';
import '../App.css'

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const userId = localStorage.getItem('userId');

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

  const handleRemove = async (itemId) => {
	try {
	  // Wysłanie żądania DELETE do serwera
	  const response = await fetch(`/api/koszyk/${userId}/item/${itemId}`, {
		method: 'DELETE',
	  });
  
	  if (!response.ok) {
		throw new Error('Błąd podczas usuwania przedmiotu z koszyka');
	  }
  
	  // Odświeżenie listy przedmiotów w koszyku
	  const updatedCart = await fetch(`/api/koszyk/${userId}`);
	  const updatedCartData = await updatedCart.json();
	  setCartItems(updatedCartData);
  
	  // Wyświetlenie komunikatu potwierdzającego
	  alert('Przedmiot został usunięty z koszyka.');
	} catch (error) {
	  console.error('Błąd:', error);
	  alert('Wystąpił błąd podczas usuwania przedmiotu z koszyka.');
	}
  };
  

   // Obliczanie sumy częściowej i całkowitej
   const deliveryCost = 8.00; // Koszt dostawy
   const subtotal = cartItems.reduce((total, item) => total + parseFloat(item.price), 0); // Suma częściowa
   const totalPrice = subtotal + deliveryCost; // Całkowita suma



//tworzenie niby zamowenia
const handleSubmit = async () => {
	try {
	  const userId = localStorage.getItem('userId');
	  const productIds = cartItems.map(item => item.id); // Zbieranie identyfikatorów produktów
  
	  // Wysyłanie całego zamówienia do backendu
	  const response = await fetch('/api/zamowienia', {
		method: 'POST',
		headers: {
		  'Content-Type': 'application/json',
		},
		body: JSON.stringify({
		  userId: userId,
		  id_produkty: productIds,
		  wartosc_zamowienia: totalPrice, // Przesyłanie całkowitej wartości zamówienia
		}),
	  });
  
	  const responseData = await response.json();
	  if (!response.ok) {
		throw new Error(responseData.message || 'Błąd podczas składania zamówienia');
	  }
  
	  // Wyczyszczenie koszyka i dodatkowe wywołanie API do wyczyszczenia koszyka na backendzie
	  setCartItems([]);
	  await fetch(`/api/koszyk/${userId}/clear`, {
		method: 'POST',
	  });
  
	  alert('Zamówienie zostało złożone pomyślnie!');
	} catch (error) {
	  console.error('Błąd:', error);
	  alert('Wystąpił błąd podczas składania zamówienia.');
	}
  };
  
  
   


  return (
	<div className='flex flex-col min-h-screen'>
      <Header />
      <div className="flex-grow grid pt-7 pb-7 sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32 background-component">
       <div className="px-4 pt-8">
        <p className="text-xl font-medium text-white">Podsumowanie zamówienia</p>
        <p className="text-white">Sprawdź swoje przedmioty. I wybierz odpowiednią metodę wysyłki.</p>
        <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
          {cartItems.map((item) => (
            <div key={item.id} className="flex flex-col rounded-lg bg-white sm:flex-row">
              <img className="m-2 h-24 w-28 rounded-md border object-cover object-center" src={item.imageSrc} alt={item.name} />
              <div className="flex w-full flex-col px-4 py-4">
                <span className="font-semibold">{item.name}</span>
                <p className="text-lg font-bold">{item.price}zł</p>
                <button onClick={() => handleRemove(item.id)} className="self-end rounded  px-2 py-1 cart-button">Usuń</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
        <p className="text-xl font-medium">Szczegóły płatności</p>
        <p class="text-gray-400">Dokończ zamówienie, podając szczegóły płatności.</p>
    <div class="">
      <label for="email" class="mt-4 mb-2 block text-sm font-medium">Email</label>
      <div class="relative">
        <input type="text" id="email" name="email" class="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="twój.email@gmail.com" />
        <div class="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
          </svg>
        </div>
      </div>
      <label for="card-holder" class="mt-4 mb-2 block text-sm font-medium">Właściciel karty</label>
      <div class="relative">
        <input type="text" id="card-holder" name="card-holder" class="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="Twoje pełne imie" />
        <div class="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
          </svg>
        </div>
      </div>
      <label for="card-no" class="mt-4 mb-2 block text-sm font-medium">Szczegóły karty</label>
      <div class="flex">
        <div class="relative w-7/12 flex-shrink-0">
          <input type="text" id="card-no" name="card-no" class="w-full rounded-md border border-gray-200 px-2 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="xxxx-xxxx-xxxx-xxxx" />
          <div class="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
            <svg class="h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M11 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1z" />
              <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2zm13 2v5H1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zm-1 9H2a1 1 0 0 1-1-1v-1h14v1a1 1 0 0 1-1 1z" />
            </svg>
          </div>
        </div>
        <input type="text" name="credit-expiry" class="w-full rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500 mx-2" placeholder="MM/YY" />
        <input type="text" name="credit-cvc" class="w-1/6 flex-shrink-0 rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500 mx-2" placeholder="CVC" />
      </div>
      <label for="billing-address" class="mt-4 mb-2 block text-sm font-medium">Adres rozliczeniowy</label>
      <div class="flex flex-col sm:flex-row">
        <div class="relative flex-shrink-0 sm:w-7/12">
          <input type="text" id="billing-address" name="billing-address" class="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="Ulica Adres" />
          <div class="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
            <img class="h-4 w-4 object-contain" src="https://flagpack.xyz/_nuxt/4c829b6c0131de7162790d2f897a90fd.svg" alt="" />
          </div>
        </div>
		<input type="text" name="credit-expiry" class="w-full rounded-md border border-gray-200 px-2 py-3 mx-2 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="Miasto" />

        <input type="text" name="billing-zip" class="flex-shrink-0 rounded-md border border-gray-200 px-4 py-3 mx-2 text-sm shadow-sm outline-none sm:w-1/6 focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="Kod" />
      </div>

    
	  <div class="mt-6 border-t border-b py-2">
      <div class="flex items-center justify-between">
        <p class="text-sm font-medium text-gray-900">Suma częściowa</p>
        <p class="font-semibold text-gray-900">{subtotal.toFixed(2)} zł</p> {/* Display subtotal */}
      </div>
      <div class="flex items-center justify-between">
        <p class="text-sm font-medium text-gray-900">Dostawa</p>
        <p class="font-semibold text-gray-900">{deliveryCost.toFixed(2)} zł</p> {/* Display delivery cost */}
      </div>
    </div>
    <div class="mt-6 flex items-center justify-between">
      <p className="text-sm font-medium text-gray-900">Suma</p>
      <p className="text-2xl font-semibold text-gray-900">{totalPrice.toFixed(2)} zł</p> {/* Display total price */}
    </div>
    </div>
    <button onClick={handleSubmit} class="mt-4 mb-8 w-full rounded-md px-6 py-3 font-medium cart-button">Złóż zamówienie</button>
	</div>
	</div>
      <Footer /> {/* Komponent Footer umieszczony na dole */}
    </div>


  );
};

export default CartPage;
