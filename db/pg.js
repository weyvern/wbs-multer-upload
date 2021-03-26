import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  user: 'gtnqoprr',
  host: 'queenie.db.elephantsql.com',
  database: 'gtnqoprr',
  password: 'RL34RfjlgIN32kCnDFzFoF7VKPBmJjZU',
  port: 5432
});

export default pool;
