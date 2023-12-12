const express = require('express');
const cors = require('cors');
const pool = require('./Database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();

app.use(cors()); // Użyj CORS dla wszystkich zapytań
app.use(express.json()); // Parse JSON payloads

// Endpoint do testowania połączenia z bazą danych
app.get('/api/test-db', async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'",
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Problem z połączeniem do bazy danych');
  }
});

// Endpoint do pobierania listy usług
app.get('/api/uslugi', async (req, res) => {
  try {
    const wynik = await pool.query('SELECT * FROM uslugi ORDER BY id ASC');
    res.json(wynik.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Problem z połączeniem do bazy danych');
  }
});

// Endpoint do pobierania fryzjerów na podstawie specyficznej usługi lub wszystkich fryzjerów
app.get('/api/fryzjerzy/:id_uslugi', async (req, res) => {
  const { id_uslugi } = req.params;
  try {
    let query;
    if (id_uslugi === 'all') {
      query = 'SELECT * FROM fryzjerzy';
    } else {
      query = `SELECT f.* FROM fryzjerzy f
               JOIN fryzjer_usluga fu ON f.id = fu.id_fryzjera
               WHERE fu.id_uslugi = $1`;
    }
    const dostepniFryzjerzy = await pool.query(
      query,
      id_uslugi !== 'all' ? [id_uslugi] : [],
    );
    res.json(dostepniFryzjerzy.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Błąd serwera');
  }
});

// Endpoint do dodawania nowej rezerwacji
app.post('/api/rezerwacje', async (req, res) => {
  const {
    id_uzytkownika,
    id_fryzjera,
    id_uslugi,
    data_i_czas,
    status,
    komentarz,
  } = req.body;
  try {
    const nowaRezerwacja = await pool.query(
      `INSERT INTO rezerwacje (id_uzytkownika, id_fryzjera, id_uslugi, data_i_czas, status, komentarz)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [id_uzytkownika, id_fryzjera, id_uslugi, data_i_czas, status, komentarz],
    );
    res.json(nowaRezerwacja.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Błąd podczas zapisywania rezerwacji');
  }
});

// Endpoint do dodawania rejestracji uzytkownika
app.post('/api/register', async (req, res) => {
	const { email, password } = req.body;
  
	try {
	  // Zapisz użytkownika w bazie danych (zastąp to odpowiednim kodem)
	  await pool.query('INSERT INTO uzytkownicy (email, password) VALUES ($1, $2)', [email, password]);
  
  // Pobranie informacji o użytkowniku, aby uzyskać jego ID do tokenu
  const userQuery = await pool.query('SELECT * FROM uzytkownicy WHERE email = $1', [email]);
  const user = userQuery.rows[0];

  // Generowanie tokena JWT
  const token = jwt.sign({ userId: user.id }, 'tajnyKlucz', { expiresIn: '24h' });

  // Zwracanie tokena w odpowiedzi
  res.json({ token });
} catch (error) {
  console.error(error);
  res.status(500).send("Błąd serwera");
}
});
  

// Endpoint do logowania użytkownika
app.post('/api/login', async (req, res) => {
	const { email, password } = req.body;
  
	try {
	  const userQuery = await pool.query('SELECT * FROM uzytkownicy WHERE email = $1', [email]);
	  const user = userQuery.rows[0];
  
	  if (!user) {
		return res.status(401).json({ error: "Nieprawidłowy email lub hasło" });
	  }
  
	  // Proste porównanie zamiast bcrypt.compare
	  if (password !== user.password) {
		return res.status(401).json({ error: "Nieprawidłowy email lub hasło" });
	  }
  
	  const token = jwt.sign({ userId: user.id }, 'tajnyKlucz', { expiresIn: '24h' });
	  res.json({ token, userId: user.id });
	} catch (error) {
	  console.error(error);
	  res.status(500).send("Błąd serwera");
	}
  });
  
  app.post('/api/change-password', async (req, res) => {
	const { userId, oldPassword, newPassword } = req.body;

	// Logowanie otrzymanych danych
	console.log('Otrzymane dane:', { userId, oldPassword, newPassword });
  
	try {
	  // Pobierz dane użytkownika z bazy danych
	  const userQuery = await pool.query('SELECT * FROM uzytkownicy WHERE id = $1', [userId]);
	  const user = userQuery.rows[0];
  
	  // Sprawdź, czy stare hasło jest poprawne
	  if (user && user.password === oldPassword) {
		// Aktualizuj hasło na nowe
		await pool.query('UPDATE uzytkownicy SET password = $1 WHERE id = $2', [newPassword, userId]);
		res.status(200).send('Hasło zostało zmienione');
	  } else {
		res.status(400).send('Nieprawidłowe stare hasło');
	  }
	} catch (error) {
	  console.error(error);
	  res.status(500).send('Błąd serwera');
	}
  });


//Endpoint pobierania twoich wizyt w panelu
app.get('/api/wizyty/:id_uzytkownika', async (req, res) => {
	const { id_uzytkownika } = req.params;
  
	try {
	  const rezerwacje = await pool.query(
		`SELECT
		  r.id,
		  to_char(r.data_i_czas, 'YYYY-MM-DD') AS data,
		  to_char(r.data_i_czas, 'HH24:MI') AS czas,
		  fr.imie_nazwisko AS fryzjer,
		  fr.specjalizacje,
		  fr.godziny_pracy,
		  u.nazwa AS nazwa_uslugi,
		  r.komentarz,
		  u.cena
		FROM rezerwacje r
		INNER JOIN fryzjerzy fr ON r.id_fryzjera = fr.id
		INNER JOIN uslugi u ON r.id_uslugi = u.id
		WHERE r.id_uzytkownika = $1`,
		[id_uzytkownika]
	  );
	  res.json(rezerwacje.rows);
	} catch (err) {
	  console.error(err.message);
	  res.status(500).send('Błąd serwera');
	}
  });
  
  
  

  
  

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Serwer działa na porcie ${port}`);
});
