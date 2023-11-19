const express = require('express');
const pool = require('./database'); // zaimportuj konfigurację bazy danych
const app = express();

app.use(express.json());

// Endpoint do pobierania dostępnych terminów
app.get('/api/terminy', async (req, res) => {
  try {
    const terminy = await pool.query('SELECT * FROM terminy'); // Zapytanie SQL
    res.json(terminy.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// ... inne endpointy

app.get('/api/test-db', async (req, res) => {
	try {
	  const result = await pool.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'");
	  res.json(result.rows);
	} catch (err) {
	  console.error(err.message);
	  res.status(500).send("Problem z połączeniem do bazy danych");
	}
  });
  
  
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Serwer działa na porcie ${port}`);
});
