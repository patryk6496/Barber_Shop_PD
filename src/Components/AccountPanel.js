import React, { useState, useEffect } from 'react';
import Footer from './Footer';
import Header from './Header';
import '../App.css';
import { useProducts } from './ProductsContext';

const AccountPanel = ({ products: productsFromProps }) => {
  const [rezerwacje, setRezerwacje] = useState([]);
  const [zamowienia, setZamowienia] = useState([]);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const productsFromContext = useProducts();

  console.log(productsFromProps);  // Produkty przekazane przez propsy
  console.log(productsFromContext);

  useEffect(() => {
    const fetchRezerwacje = async () => {
      try {
        const userId = localStorage.getItem('userId'); // Pobierz ID użytkownika
        if (userId) {
          const response = await fetch(`/api/wizyty/${userId}`);
          if (!response.ok) {
            throw new Error('Nie udało się pobrać danych o wizytach');
          }
          const data = await response.json();
          setRezerwacje(data);
        }
      } catch (error) {
        console.error('Błąd podczas pobierania wizyt:', error);
      }
    };

    fetchRezerwacje();
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    // Pobierz ID użytkownika - zakładając, że jest przechowywane w localStorage lub innym miejscu
    const userId = localStorage.getItem('userId');

    // Logowanie wysyłanych danych
    console.log('Wysyłanie danych:', { userId, oldPassword, newPassword });

    // Wysyłanie żądania do serwera
    try {
      const response = await fetch('/api/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          oldPassword,
          newPassword,
        }),
      });

      const data = await response.text();
      alert(data); // Wyświetl odpowiedź serwera (możesz to zmienić na bardziej zaawansowaną obsługę)
    } catch (error) {
      console.error('Błąd zmiany hasła:', error);
    }

    // Resetuj stany formularza
    setOldPassword('');
    setNewPassword('');
  };

  //wyswietlanie zamowien w panelu
	useEffect(() => {
		const fetchZamowienia = async () => {
		  try {
			const userId = localStorage.getItem('userId');
			if (userId) {
			  const response = await fetch(`/api/zamowienia/${userId}`);
			  if (!response.ok) {
				throw new Error('Nie udało się pobrać danych o zamówieniach');
			  }
			  const data = await response.json();
			  console.log('Odebrane zamówienia:', data); // Sprawdź odebrane dane
			  setZamowienia(data);
			}
		  } catch (error) {
			console.error('Błąd podczas pobierania zamówień:', error);
		  }
		};
	  
		fetchZamowienia();
	  }, []);
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="py-16 px-4 md:px-10 lg:px-40 background-component">
  <div className="min-h-screen bg-gray-100 p-8">
          <div className="max-w-4xl mx-auto">
		  <div className="p-6">
  <h2 className="text-xl font-semibold">Twoje Zamówienia</h2>
  <div className="overflow-x-auto mt-4">
    <table className="w-full text-sm text-left text-gray-500 shadow-lg rounded-lg overflow-hidden">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          <th scope="col" className="px-6 py-3">Numer Zamówienia</th>
          <th scope="col" className="px-6 py-3">Produkty</th>
          <th scope="col" className="px-6 py-3">Wartość Zamówienia</th>
          {/* Dodaj więcej kolumn według potrzeb */}
        </tr>
      </thead>
      <tbody>
	  {zamowienia.length > 0 ? (
  zamowienia.map((zamowienie) => {
    console.log(zamowienie.id_produktu); // Logowanie ID produktów

    return (
      <tr key={zamowienie.id_zamowienia} className="bg-white border-b hover:bg-gray-100">
        <td className="px-6 py-4">{zamowienie.id_zamowienia}</td>
        <td className="px-6 py-4">
		{zamowienie.id_produktu.map((idProduktu) => {
  const produkt = productsFromProps.find(p => p.id === idProduktu);
  return produkt ? (
    <div key={idProduktu} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
	<img src={produkt.imageSrc} alt={produkt.imageAlt} className="w-12 h-12 mr-2" />
      <span>{produkt.name}</span>
    </div>
  ) : null;
})}

        </td>
        <td className="px-6 py-4">{zamowienie.wartosc_zamowienia}</td>
      </tr>
    );
  })
) : (
  <tr>
    <td colSpan="3" className="px-6 py-4 text-center">Nie masz jeszcze zamówień.</td>
  </tr>
)}


      </tbody>
    </table>
  </div>
</div>



<div className="p-6">
  <h2 className="text-xl font-semibold">Resetuj Hasło</h2>
  <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4 items-center">
    <input
      type="password"
      value={oldPassword}
      onChange={(e) => setOldPassword(e.target.value)}
      placeholder="Stare hasło"
      className="border p-2 w-full md:w-1/2"
    />
    <input
      type="password"
      value={newPassword}
      onChange={(e) => setNewPassword(e.target.value)}
      placeholder="Nowe hasło"
      className="border p-2 w-full md:w-1/2"
    />
    <button type="submit" className="px-4 py-2 cart-button w-full md:w-auto">
      Resetuj
    </button>
  </form>
</div>



            <div className="p-6">
              <h2 className="text-xl font-semibold">Twoje Najbliższe Wizyty</h2>
              <div className="overflow-x-auto mt-4">
                <table className="w-full text-sm text-left text-gray-500 shadow-lg rounded-lg overflow-hidden">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Data
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Czas
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Nazwa Usługi
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Fryzjer
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Cena
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Komentarz
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {rezerwacje.length > 0 ? (
                      rezerwacje.map((rez) => (
                        <tr
                          key={rez.id}
                          className="bg-white border-b hover:bg-gray-100"
                        >
                          <td className="px-6 py-4">{rez.data}</td>
                          <td className="px-6 py-4">{rez.czas}</td>
                          <td className="px-6 py-4">{rez.nazwa_uslugi}</td>
                          <td className="px-6 py-4">{rez.nazwa_fryzjera}</td>
                          <td className="px-6 py-4">{rez.cena}</td>
                          <td className="px-6 py-4">{rez.komentarz}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="px-6 py-4 text-center">
                          Nie masz jeszcze wizyt.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AccountPanel;
