# Step 22 — Connect Express to PostgreSQL using `pg`

## What is `pg`?

`pg` is a library that lets your Node.js code talk to a PostgreSQL database.
Think of it as a translator — your code speaks JavaScript, PostgreSQL speaks SQL, and `pg` sits in between.

```
Your Express Code  →  pg  →  PostgreSQL Database
```

---

## What did I build?

Created `src/config/db.ts` — a file that sets up the database connection.

```ts
import { Pool } from 'pg';

export const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: { rejectUnauthorized: false }
});

pool.query('SELECT NOW()')
  .then(() => console.log('Database connected'))
  .catch(error => console.error('Database connection failed', error));
```

---

## Why Pool and not a single connection?

A **Pool** keeps multiple connections open and reuses them.

Without Pool → every API request opens and closes a new DB connection → slow.
With Pool → connections are reused → fast.

---

## Why `pool.query()` instead of `pool.connect()`?

`pool.connect()` manually grabs a connection from the pool.
You have to remember to release it after — easy to forget.

`pool.query()` does everything automatically:
- grabs a connection
- runs the query
- releases the connection

Always prefer `pool.query()`.

---

## Key lesson

Credentials (host, password, etc.) should NEVER be hardcoded.
They come from environment variables via `.env` file.
