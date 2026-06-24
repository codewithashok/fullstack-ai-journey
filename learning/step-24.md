# Step 24 — Environment Variables and Config Management

## The problem without env variables

Imagine hardcoding your DB password in the code:

```ts
password: '123456'
```

If you push this to GitHub — anyone can see your password. Bad idea.

---

## The solution: `.env` file

Create a `.env` file and put all secrets there:

```
# Server
PORT=4000

# PostgreSQL (Local)
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=123456
DB_NAME=users_app

# Cloudinary (Image Upload)
CLOUDINARY_URL=cloudinary://...
```

Then read them in code using `process.env`:

```ts
password: process.env.DB_PASSWORD
```

---

## How does it work?

The `dotenv` package reads `.env` and loads everything into `process.env`.

```ts
import 'dotenv/config'; // add this at the top of index.ts
```

That's it. Now `process.env.DB_PASSWORD` works everywhere.

---

## Golden rule: never commit `.env` to git

Add `.env` to `.gitignore`:

```
.env
```

Your code goes to GitHub. Your secrets stay on your machine.

---

## Local vs Production

| Environment | Where credentials come from |
|-------------|----------------------------|
| Local | `.env` file on your machine |
| Render (production) | Environment Variables set in Render Dashboard |

Same code, different values — that's the beauty of env variables.

---

## Port from env

```ts
const PORT = Number(process.env.PORT) || 4000;
```

- Locally → `PORT` not set → falls back to `4000`
- On Render → Render sets `PORT` automatically → uses Render's value

---

## Key lesson

Never hardcode secrets. Always use `.env` locally and the hosting platform's env variables in production.
