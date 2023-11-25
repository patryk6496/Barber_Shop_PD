import React, { useState, useEffect } from 'react';
import Datepicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../Reservation.css';
import { pl } from 'date-fns/locale';
import Footer from './Footer'

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
      .then((data) => console.log('Rezerwacja zapisana:', data))
      .catch((error) => console.error('Error:', error));
  };

  return (
    <div>
      <h1>System Rezerwacji Wizyt</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Usługa:
          <select
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
        </label>
        <label>
          Fryzjer:
          <select value={selectedBarber} onChange={handleBarberChange} required>
            <option value="" disabled>
              Wybierz fryzjera
            </option>
            {barbers.map((barber) => (
              <option key={barber.id} value={barber.id}>
                {barber.imie_nazwisko}
              </option>
            ))}
          </select>
        </label>
        <label>
          Wybierz termin:
          <Datepicker
            selected={selectedDate}
            onChange={setSelectedDate}
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
                hours >= 8 && (hours < 15 || (hours === 15 && minutes === 0))
              );
            }}
          />
        </label>
		<label>
          Komentarz:
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Dodaj komentarz do rezerwacji"
          />
        </label>
        <button type="submit">Zarezerwuj</button>
      </form>
	  <Footer/>
    </div>
  );
};

export default ReservationSystem;
