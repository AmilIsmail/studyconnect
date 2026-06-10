# StudyConnect

**Team:** Amil Ismail Khadida (315460)
**Repository:** https://github.com/AmilIsmail/studyconnect

## Projektidee

StudyConnect ist eine Plattform für Studierende der HTWG Konstanz, um Lernpartner zu finden.

Die Anwendung wurde von einem statischen HTML/CSS-Prototyp (M1) zu einer React- und TypeScript-Anwendung weiterentwickelt.

Nutzer können sich registrieren oder anmelden, Module durchsuchen, passende Lernpartner finden, Anfragen verwalten und einen einfachen Chat-Prototyp verwenden.

---

## Setup

```bash
npm install
npm run dev
```

Die Anwendung läuft anschließend unter:

```text
http://localhost:5173
```

---

## Kriterien-Zuordnung M2

| Kriterium | Datei | Zeile / Hinweis |
|------------|--------|----------------|
| npm + Vite | package.json, vite.config.ts | Projekt-Root |
| TypeScript aktiv genutzt | src/types.ts | Z. 1–15: Interfaces `Module` und `Partner` |
| Eigene Types/Interfaces | src/types.ts | Z. 1–7: `Module`, Z. 9–15: `Partner` |
| Komponentenzerlegung | src/components/ | Header, Home, Login, Register, Dashboard, SearchFilters, ModuleCard, PartnerCard, Requests, Chat |
| Props-Übergabe | src/App.tsx | Z. 60–156: Komponenten erhalten Props und Callback-Funktionen |
| useState | src/App.tsx | Z. 20–26: States für Seite, Filter, Modul-Auswahl und Anzeige |
| useEffect | src/App.tsx | Z. 28–35: localStorage laden und speichern |
| Interaktive Filterung | src/App.tsx | Z. 37–44: Module werden nach Fakultät, Studiengang, Semester und Modul gefiltert |
| Durchgängige Nutzeraktion | src/App.tsx | Z. 60–156: Login/Register → Dashboard → Search Partners → Filter → Show Suggestions |
| Dynamische Anzeige | src/App.tsx | Z. 47–55 und Z. 124–159: Vorschläge, Module und Partner werden abhängig vom Zustand angezeigt |

## Verwendete Komponenten

* Header
* Home
* Login
* Register
* Dashboard
* SearchFilters
* ModuleCard
* PartnerCard
* Requests
* Chat

Die Komponenten sind in eigenen Dateien ausgelagert und werden in `App.tsx` zusammengeführt.

---

## Verwendete React Hooks

### useState

Wird verwendet für:

* Seitennavigation
* Suchfilter
* Auswahl eines Moduls
* Anzeige zusätzlicher Module

### useEffect

Wird verwendet, um Suchwerte im localStorage zu speichern und beim erneuten Laden wiederherzustellen.