import React, { useState, useEffect } from 'react';
import Datepicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../Reservation.css';
import { pl } from 'date-fns/locale';
import Footer from './Footer';
import Header from './Header';
import { toast } from 'react-toastify';
import '../App.css'

// Rejestracja lokalizacji językowej dla Datepicker
registerLocale('pl', pl);

const ReservationSystem = () => {
  const [services, setServices] = useState([]);
  const [barbers, setBarbers] = useState([]);
  const [selectedService, setSelectedService] = useState('');
  const [selectedBarber, setSelectedBarber] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [comment, setComment] = useState('');

  useEffect(() => {
    fetch('/api/uslugi')
      .then((response) => response.json())
      .then((data) => setServices(data))
      .catch((error) => console.error('Error fetching services:', error));
  }, []);

  const handleServiceChange = (e) => {
    const serviceId = e.target.value;
    setSelectedService(serviceId);
    const endpoint =
      serviceId === '3' ? '/api/fryzjerzy/all' : `/api/fryzjerzy/${serviceId}`;

    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => setBarbers(data))
      .catch((error) => console.error('Error fetching barbers:', error));
  };

  const handleBarberChange = (e) => {
    setSelectedBarber(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const reservationData = {
      id_uzytkownika: 1, // Tu powinien być ID zalogowanego użytkownika
      id_fryzjera: selectedBarber,
      id_uslugi: selectedService,
      data_i_czas: selectedDate.toISOString(), // Formatowanie daty na string ISO
      status: 'Nowa', // Przykładowy status
      komentarz: comment, // Dodanie komentarza
    };

    fetch('/api/rezerwacje', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reservationData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Rezerwacja zapisana:', data);
        toast.success('Zarezerwowano wizytę');
      })
      .catch((error) => {
        console.error('Error:', error);
        toast.error('Wystąpił błąd podczas rezerwacji');
      });
  };

  return (
    <div className="flex flex-col min-h-screen">
	<Header/>
      <div className="flex-grow flex items-center justify-center background-component">
        <div className="w-full max-w-xl mx-auto p-5 bg-white shadow-md rounded-lg">
          <h1 className="text-2xl font-semibold text-center text-gray-700 mb-6">
            System Rezerwacji Wizyt
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col">
              <label className="mb-2 font-medium text-gray-700">Usługa:</label>
              <select
                className="form-select block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-600 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={selectedService}
                onChange={handleServiceChange}
                required
              >
                <option value="" disabled>
                  Wybierz usługę
                </option>
                {services.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.nazwa}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label className="mb-2 font-medium text-gray-700">Fryzjer:</label>
              <select
                className="form-select block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-600 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={selectedBarber}
                onChange={handleBarberChange}
                required
              >
                <option value="" disabled>
                  Wybierz fryzjera
                </option>
                {barbers.map((barber) => (
                  <option key={barber.id} value={barber.id}>
                    {barber.imie_nazwisko}
                  </option>
                ))}
              </select>
            </div>

            {/* Uwaga: Możesz potrzebować dostosować style dla Datepicker zależnie od użytej biblioteki */}
            <div className="flex flex-col">
              <label className="mb-2 font-medium text-gray-700">
                Wybierz termin:
              </label>
              <Datepicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                locale="pl"
                showTimeSelect
                dateFormat="d MMMM, yyyy HH:mm"
                minTime={new Date().setHours(8, 0)}
                maxTime={new Date().setHours(15, 30)}
                timeIntervals={30}
                filterTime={(time) => {
                  const hours = time.getHours();
                  const minutes = time.getMinutes();
                  return (
                    hours >= 8 &&
                    (hours < 15 || (hours === 15 && minutes === 0))
                  );
                }}
                className="form-input block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-600 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-2 font-medium text-gray-700">
                Komentarz:
              </label>
              <textarea
                className="form-textarea mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-600 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Dodaj komentarz do rezerwacji"
              />
            </div>

			<button
  type="submit"
  className="flex max-w-full grid-cols-2 flex-row items-center justify-center bg-orange-500 px-8 py-4 text-center font-semibold text-white transition [box-shadow:rgb(212,182,143)_-8px_8px] hover:[box-shadow:rgb(212,182,143)_0px_0px]"
>
  <p className="mr-6 font-bold">Zarezerwuj wizytę</p>
  <div className="h-4 w-4 flex-none">
    <svg
      fill="currentColor"
      viewBox="0 0 20 21"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Arrow Right</title>
      <polygon points="16.172 9 10.101 2.929 11.515 1.515 20 10 19.293 10.707 11.515 18.485 10.101 17.071 16.172 11 0 11 0 9"></polygon>
    </svg>
  </div>
</button>

          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ReservationSystem;
