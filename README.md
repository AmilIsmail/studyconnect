# StudyConnect

StudyConnect ist eine Webanwendung, die Studierenden dabei hilft, Lernpartner für ihre Module zu finden.

## Verwendete Technologien

* React + TypeScript
* React Router
* Node.js + Express
* SQLite
* JWT-Authentifizierung
* Vitest

## Installation

Abhängigkeiten installieren:

```bash
npm install
```

Frontend starten:

```bash
npm run dev
```

Backend starten:

```bash
npm run backend
```

Tests ausführen:

```bash
npm test
```

## Funktionen

* Registrierung und Login
* Module suchen
* Lernpartner finden
* Lernanfragen senden
* Anfragen annehmen oder ablehnen
* Chat mit akzeptierten Lernpartnern

## Projektaufbau

```text
Frontend (React)
        ↓
Backend (Express)
        ↓
Datenbank (SQLite)
```

Wir haben eine Single-Page-Anwendung verwendet, da die Anwendung interaktiv ist und kein Server-Side-Rendering benötigt.

## Tests

Folgende Tests wurden implementiert:

* Login-Test
* SearchFilters-Test
* Requests-Test
* ModuleCard-Test
