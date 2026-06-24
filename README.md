# StudyConnect

StudyConnect ist eine Full-Stack-SPA für Studierende der HTWG Konstanz. Die App hilft dabei, Lernpartner nach Fakultät, Studiengang, Semester und Modul zu finden.

## Start

```bash
npm install
npm run backend
npm run dev
```

Frontend: http://localhost:5173  
Backend: http://localhost:3001

## Testuser

E-Mail: `test@htwg-konstanz.de`  
Passwort: `test1234`

## M3-Kriterien und Fundstellen

| Kriterium | Umsetzung im Projekt |
|---|---|
| React Router | `src/App.tsx`, `src/main.tsx`, `src/components/Header.tsx` mit `/`, `/login`, `/register`, `/dashboard`, `/search`, `/requests`, `/chat` |
| Navigation ohne `window.location` | `Link`, `NavLink`, `useNavigate` in Header, Login, Register, Requests |
| Datenfetching & REST | `src/api/api.ts`, `src/components/SearchPage.tsx`, `src/components/Requests.tsx` |
| GET | `GET /api/modules`, `GET /api/partners`, `GET /api/requests` |
| Schreibende Methode | `POST /api/auth/register`, `POST /api/auth/login`, `PUT /api/requests/:id` |
| Ladezustände | Login, Register, SearchPage und Requests zeigen Loading-Texte |
| Fehlerzustände | Login, Register, SearchPage und Requests zeigen sichtbare Fehlermeldungen |
| Geteilter State | `src/context/AuthContext.tsx` verwaltet eingeloggten User und JWT appweit |
| Tests | `src/tests/ModuleCard.test.tsx`, `src/tests/SearchFilters.test.tsx`, `src/tests/Login.test.tsx`, `src/tests/Requests.test.tsx` |
| Backend | `backend/server.js` mit Express |
| Datenbank | `backend/database.js` mit SQLite, kein `data.json` |
| Authentifizierung | Registrierung/Login mit `bcrypt` und JWT in `backend/routes/auth.js` |
| Geschützte Route | `src/components/ProtectedRoute.tsx`, außerdem geschützter Endpunkt `GET /api/requests` |
| Keine Secrets im Repo | `.env.example`, echtes `.env` soll nicht committed werden |

## Architektur

Die Anwendung ist eine Single Page Application mit React und Vite. Das Frontend spricht über HTTP mit einem eigenen Express-Backend. Das Backend stellt REST-Endpunkte bereit und speichert Daten persistent in SQLite.

```text
React SPA  --->  Express REST API  --->  SQLite Database
   |                 |
Router            JWT Auth
Context           Protected API routes
```

SSR oder SSG ist hier nicht nötig, weil StudyConnect eine interaktive Anwendung mit Login, persönlichem Dashboard, geschützten Bereichen und dynamischen API-Daten ist.

## Tests ausführen

```bash
npm test
```

## API-Endpunkte

- `GET /api/health`
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/modules`
- `GET /api/partners`
- `GET /api/requests` geschützt mit JWT
- `PUT /api/requests/:id` geschützt mit JWT

## Abgabehinweis

Für die Abgabe Repository-Link bereitstellen, dieses README nutzen und das Repository mit `Meilenstein 3` taggen.


## Sicherheitshinweis

Der JWT wird in diesem Lehrprojekt aus Vereinfachungsgründen im `localStorage` gespeichert. Für eine produktive Anwendung wären `httpOnly`-Cookies vorzuziehen, um XSS-Risiken zu minimieren.


## Lernpartner-Anfrage

Auf der Search-Seite kann man passende Lernpartner anzeigen und mit **Send Request** eine Lernanfrage erstellen. Die Anfrage erscheint anschließend auf der Requests-Seite und kann dort akzeptiert oder abgelehnt werden. Bei Annahme wird zum Chat weitergeleitet.
