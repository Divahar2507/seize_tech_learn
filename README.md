# SeizeLearn — Practical Skills to Career Platform

<div align="center">

![SeizeLearn Banner](https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&auto=format&fit=crop&q=80)

**Learn useful skills. Build real proof. Grow every day.**  
*Practical skills-to-career learning platform in English & Tamil with real-world practice sandboxes.*

[![CI / Production Build](https://github.com/Divahar2507/seize_tech_learn/actions/workflows/ci.yml/badge.svg)](https://github.com/Divahar2507/seize_tech_learn/actions)
[![React 19](https://img.shields.io/badge/React-19.0.1-61dafb?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2-646CFF?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/TailwindCSS-v4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-v12-FFCA28?logo=firebase)](https://firebase.google.com/)

</div>

---

## 🌟 Key Features

- **🌐 Deep URL Routing & Navigation:** Bookmarkable, shareable URLs (`/courses/:id`, `/practice`, `/projects/:id`, `/dashboard`, `/verify/:id`) with full browser history support via `react-router-dom`.
- **🗣️ Bilingual Learning Experience:** Complete English and Tamil (தமிழ்) toggle for explanations, quizzes, and project guidelines.
- **⚡ Interactive Sandboxes (Practice Studio):**
  - Live Real-time HTML/CSS/JS Sandbox with isolated iframe execution.
  - C.T.C.O AI Prompt Engineering evaluator.
  - Web Speech API voice pronunciation lab.
  - Google X-Y-Z Resume bullet point analyzer.
- **🧠 Active Recall Drills:** Spaced-repetition flashcard system for accelerated technical retention.
- **🏆 Career Credential Engine:** Verifiable digital certificates with public verification URLs (`/verify/:certificateId`) and PDF print export.
- **🔐 Multi-Provider Authentication:**
  - Google One-Click OAuth
  - LinkedIn OIDC
  - Microsoft OAuth
  - Custom Username / Email and Password with secure Firestore cloud synchronization.
- **🛡️ Production Hardened:** React Error Boundaries, debounced Firestore writes, and offline-first cache with automatic network detection.

---

## 🚀 Quick Start

### 1. Clone the repository
```bash
git clone https://github.com/Divahar2507/seize_tech_learn.git
cd seize_tech_learn
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Copy `.env.example` to `.env.local` and add your Firebase credentials:
```bash
cp .env.example .env.local
```

### 4. Start Development Server
```bash
npm run dev
```
Open [http://localhost:5173/](http://localhost:5173/) in your browser.

---

## 📦 Production Build & Testing

```bash
# Type check with TypeScript compiler
npm run lint

# Production build with chunk splitting and tree shaking
npm run build

# Preview production build locally
npm run preview
```

---

## 📂 Project Structure

```text
seize_tech_learn/
├── .github/workflows/ci.yml       # Automated CI build & typecheck pipeline
├── public/
│   ├── _redirects                 # SPA rewrites for Netlify/Cloudflare
│   └── manifest.webmanifest       # PWA mobile installability manifest
├── src/
│   ├── components/                # Modular React views & overlays
│   │   ├── AuthModal.tsx          # Multi-provider login & username auth
│   │   ├── CertificateVerificationView.tsx # Verifiable public credential page
│   │   ├── ErrorBoundary.tsx      # Crash prevention boundary
│   │   ├── PracticeStudio.tsx     # Web, AI, speech, resume sandboxes
│   │   └── ...
│   ├── context/
│   │   └── LearningContext.tsx    # State management with debounced cloud sync
│   ├── data/                      # Course catalogs, roadmaps, daily challenges
│   ├── services/
│   │   └── firebase.ts            # Firebase Auth & Firestore client
│   ├── types/
│   │   └── learning.ts            # Strict TypeScript interface contracts
│   ├── App.tsx                    # Route definitions and code splitting
│   └── main.tsx                   # Application entry point
├── firestore.rules                # Production database security rules
├── firebase.json                  # Firebase Hosting configuration
├── vercel.json                    # Vercel deployment rewrites & cache headers
└── vite.config.ts                 # Rollup chunk optimization
```

---

## 📄 License

MIT © [SeizeLearn](https://github.com/Divahar2507/seize_tech_learn)
