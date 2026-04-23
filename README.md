# StudyConnect

**Team:** Amil Ismail Khadida (315460)  
**Repository:** https://github.com/AmilIsmail/studyconnect 

## Projektidee
StudyConnect ist eine Plattform für Studierende der HTWG Konstanz, um Lernpartner zu finden.  
Nutzer können nach Fach (Modul), Semester und Lernformat passende Partner suchen.  

Die Anwendung ist als HTML/CSS-Prototyp umgesetzt und zeigt den vollständigen Ablauf:
Registrierung, Login, Modul-Auswahl, Partnersuche, Anfrageverwaltung und Chat.

## Zugriff und Ablauf
Vor dem Login stehen nur die Seiten **Home, Login und Register** zur Verfügung.  
Nach erfolgreichem Login oder Registrierung wird der Nutzer zum **Dashboard** weitergeleitet,  
wo weitere Funktionen sichtbar werden:

- Modulbibliothek (Modules)
- Partnersuche (Partners)
- Anfragen (Requests)
- Chat
- Profil

Da es sich um einen Prototyp handelt, wird der Login-Zustand über separate Seiten simuliert.

## Kriterien-Zuordnung M1

| Criterion | File | Location |
|----------|------|---------|
| Semantic HTML structure | index.html, dashboard.html, modules.html, search.html, profile.html, request.html, chat.html | header, nav, main, section, article, footer |
| Form with labels | index.html, login.html, register.html | search section, login form, register form |
| Responsive layout (Flexbox/Grid) | styles.css | header (flex), grid-container (grid) |
| Media Query | styles.css | @media (max-width: 700px) |
| URL structure | all HTML files | navigation links and page structure |

#