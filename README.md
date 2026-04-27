
# Food Business Website

This is a code bundle for Food Business Website. The original project is available at https://www.figma.com/design/nFLFQI8OHzt28JqjjyvIjh/Food-Business-Website.

## Running the frontend

Run `npm install` to install the dependencies.

Run `npm run dev` to start the Vite frontend on `http://localhost:5173`.

## Postgres and Prisma setup

This project now includes a Postgres-ready backend scaffold using Prisma and Express.

1. Copy `.env.example` to `.env`.
2. Set `DATABASE_URL` to your Postgres database.
3. Run `npm install`.
4. Run `npm run db:generate`.
5. Run `npm run db:push`.
6. Run `npm run dev:server`.
7. In another terminal, run `npm run dev`.

When `VITE_API_URL` is set, the frontend will use the API for accounts and order history. If it is not set, the app falls back to `localStorage`.
  
