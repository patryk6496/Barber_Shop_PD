import React, { useState } from 'react';

const AccountPanel = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

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
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Panel Konta</h1>
      {/* Tutaj można dodać więcej treści związanych z panelem użytkownika */}

      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="p-6">
            <h2 className="text-xl font-semibold">Twoje Zamówienia</h2>
            <div className="mt-4"></div>
          </div>

          <div className="p-6">
            <h2 className="text-xl font-semibold">Resetuj Hasło</h2>
            <form onSubmit={handleSubmit} className="mt-4">
              <input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                placeholder="Stare hasło"
                className="border p-2"
              />
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Nowe hasło"
                className="border p-2"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2"
              >
                Resetuj
              </button>
            </form>
          </div>

          <div className="p-6">
            <h2 className="text-xl font-semibold">Twoje Najbliższe Wizyty</h2>
            <div className="mt-4"></div>
          </div>

          <div className="p-6">
            <h2 className="text-xl font-semibold">Historia Wizyt</h2>
            <div className="mt-4"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPanel;
