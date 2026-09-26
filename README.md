# Yêu Vải Vụn - Refactored Frontend

## Structure

```text
yeu-vai-vun/
├── index.html
├── css/
│   └── styles.css
└── js/
    ├── data.js
    ├── stations.js
    ├── modal.js
    ├── navigation.js
    ├── contact.js
    ├── animations.js
    └── app.js
```

## Why this structure?

- `index.html`: only page structure/content.
- `css/styles.css`: all styling.
- `js/data.js`: editable project data.
- `js/stations.js`: rescue station search/filter/rendering.
- `js/modal.js`: tutorial video modal.
- `js/navigation.js`: mobile navigation.
- `js/contact.js`: contact form behavior.
- `js/animations.js`: scroll reveal.
- `js/app.js`: application entry point.

## Suggested next JavaScript features

1. Rescue station details modal.
2. Real map links using latitude/longitude.
3. Donation submission flow.
4. Contact form connected to a backend/API.
5. Search by city + material + distance.
6. Admin CRUD for rescue stations.
7. LocalStorage for saving favorite stations.
8. Image upload/preview for fabric donations.
9. Form validation + loading/success/error states.
10. Later migration to a component framework if the project becomes large.

## Running locally

For the current version, opening `index.html` directly should work because the JavaScript files are local.

For future API/fetch development, use a local server, for example VS Code Live Server.
