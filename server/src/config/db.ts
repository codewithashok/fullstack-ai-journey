import { Pool } from 'pg';

export const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

pool.connect()
  .then(() => {
    console.log('\n');
    console.log('<< << << ===== :: Database connected successfully :: ===== >> >> >>');
    console.log('\n');
  })
  .catch(error => {
    console.error('Database connection failed', error);
  });