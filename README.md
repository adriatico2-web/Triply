# Triply — Next.js Starter (SQLite + Prisma + APIs)

**Zero sbatti**: gira in locale con SQLite (nessun DB da installare).

## Requisiti
- Node.js 18+
- (opzionale) account Stripe in test mode per simulare i pagamenti

## Avvio rapido
```bash
npm install
cp .env.example .env
npm run setup   # genera Prisma client + migra DB (SQLite locale)
npm run dev
```
Apri http://localhost:3000

## Cosa c'è dentro
- **App Router** (`/app`)
- **Prisma (SQLite)**: file DB `prisma/dev.db`
- API:
  - `POST /api/listings` crea annuncio (bozza)
  - `GET /api/listings` lista annunci (mock ricerca con ?q=)
  - `POST /api/bookings` crea booking + (se `STRIPE_SECRET_KEY` presente) PaymentIntent
- Pagine:
  - `/` home asciutta
  - `/stays` lista annunci (usa API)
  - `/host` wizard semplificato → salva bozza annuncio

> Nota: upload foto è mockato (campo URL); quando vorrai useremo S3 presigned URL.

## Stripe (facoltativo, in test)
- Metti la chiave segreta test in `.env`
- In `/stays` clicca **Prenota** → chiama `/api/bookings` che crea un PaymentIntent *fittizio* (senza frontend Elements).

## Migrazioni
Se cambi `schema.prisma`:
```bash
npm run prisma:migrate -- --name tua-migrazione
```
