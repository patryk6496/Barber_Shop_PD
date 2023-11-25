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

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Serwer działa na porcie ${port}`);
});
