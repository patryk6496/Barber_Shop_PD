const { Pool } = require('pg');
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Barber_shop',
  password: 'komp1221',
  port: 5433,
});

module.exports = pool;
