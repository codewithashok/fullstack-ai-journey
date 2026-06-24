# Step 25 — Replace In-Memory CRUD with Real SQL

## Where I was before

Data was stored in a `users.json` file (or an in-memory array).
Every time the server restarted, all data was gone.

---

## What changed?

Replaced all file/array operations in `usersService.ts` with real SQL queries using `pool.query()`.

### Before (in-memory)
```ts
const users = [...]; // array in memory

const fetchAllUsers = () => {
    return users;
}
```

### After (real database)
```ts
const fetchAllUsers = async () => {
    const result = await pool.query('SELECT * FROM users');
    return result.rows;
}
```

---

## All 5 operations

```ts
// GET all
pool.query('SELECT * FROM users')

// GET one
pool.query('SELECT * FROM users WHERE id = $1', [userId])

// CREATE
pool.query(
    'INSERT INTO users (name, email, city, profile_photo) VALUES ($1, $2, $3, $4) RETURNING *',
    [name, email, city, photo]
)

// UPDATE
pool.query(
    'UPDATE users SET name=$1, email=$2, city=$3, profile_photo=$4 WHERE id=$5 RETURNING *',
    [name, email, city, photo, userId]
)

// DELETE
pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [userId])
```

---

## What is `$1`, `$2`?

These are **parameterized queries** — a safe way to pass values.
`pg` handles escaping automatically, which prevents SQL Injection attacks.

Never do this:
```ts
pool.query(`SELECT * FROM users WHERE id = ${userId}`) // dangerous!
```

Always do this:
```ts
pool.query('SELECT * FROM users WHERE id = $1', [userId]) // safe!
```

---

## What is `RETURNING *`?

After INSERT, UPDATE, DELETE — PostgreSQL doesn't return the row by default.
`RETURNING *` tells it to return the affected row so you can send it back to the client.

---

## Key lesson

Data now lives in PostgreSQL — it survives server restarts.
Local data → `localhost` PostgreSQL on your machine.
Production data → Render PostgreSQL in the cloud.
Both are separate databases with the same table structure.
