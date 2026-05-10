# SafarYar Frontend

A polished React + Vite frontend for the Iran Travel MVP backend.

## Features

- Elegant travel-planning landing page
- Rich planner form
- Route, weather, and hotel display
- Works with your existing FastAPI backend
- Raw JSON preview for debugging

## Run locally

1. Install dependencies:

```bash
npm install
```

2. Create `.env` from `.env.example`:

```bash
cp .env.example .env
```

3. Start the frontend:

```bash
npm run dev
```

4. Open:

```text
http://127.0.0.1:3000
```

## Backend URL

Set in `.env`:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000
```

Your backend should already be running before you use the frontend.
