const express = require('express');
const cors = require('cors');
const pool = require('./Database'); // Załóżmy, że ten plik istnieje i jest prawidłowo skonfigurowany

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
	const { username, password } = req.body;
  
	try {
	  // Hashowanie hasła
	  const hashedPassword = await bcrypt.hash(password, 10);
  
	  // Zapisz użytkownika w bazie danych (zastąp to odpowiednim kodem)
	  // ...
  
	  res.status(201).send("Użytkownik utworzony");
	} catch (error) {
	  console.error(error);
	  res.status(500).send("Błąd serwera");
	}
  });

// Endpoint do logowania uzytkownika
  app.post('/api/login', async (req, res) => {
	const { username, password } = req.body;
  
	try {
	  // Pobierz użytkownika z bazy danych (zastąp to odpowiednim kodem)
	  // ...
  
	  // Sprawdź hasło
	  const isValid = await bcrypt.compare(password, userFromDatabase.hashedPassword);
  
	  if (!isValid) {
		return res.status(401).send("Nieprawidłowe dane logowania");
	  }
  
	  // Generowanie tokena JWT
	  const token = jwt.sign({ userId: userFromDatabase.id }, 'tajnyKlucz', { expiresIn: '24h' });
	  res.json({ token });
	} catch (error) {
	  console.error(error);
	  res.status(500).send("Błąd serwera");
	}
  });
  

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Serwer działa na porcie ${port}`);
});
