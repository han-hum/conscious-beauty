# ILUS.me – Conscious Beauty Web Platform 🌿

**ILUS.me** is a modern, user-friendly platform designed to help people make conscious beauty product choices.  
It provides transparency through verified data, ethical product reviews, and sustainability insights – all while integrating with the [Open Beauty Facts API](https://world.openbeautyfacts.org/).

---

## Features

- Responsive SvelteKit front-end
-  Supabase authentication (user login, admin panel)
-  Dynamic product pages (from user + Open Beauty Facts data)
-  Search functionality
-  Admin interface with basic CRUD logic
-  Custom UI/UX and visual identity

---

## Tech Stack

| Area | Tool |
|------|------|
| Frontend | SvelteKit, CSS |
| Backend logic | Supabase (Auth & DB) |
| External API | Open Beauty Facts |
| Version Control | Git + GitHub |
| Design & Planning | Figma, Trello, Canva |

---

##  Project Structure


---

## Environment and `/server` Notice

This project uses environment variables to handle private keys securely.  
The `.env` file was removed from version control for security reasons.

> A `.env.example` can be used as a reference if environment setup is needed.

The `/server` folder currently serves as a placeholder for potential backend functionality  
(e.g., Node.js, Express, or serverless functions).

---

## Deployment

Static SvelteKit build:

To run locally:
```bash
npm install
npm run dev

Created by Hanna H. as a final thesis and portfolio project