# MINDMELD – THE HUMAN CONNECTION ENGINE
> *"Your next great idea starts with the right people."*

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![React Flow](https://img.shields.io/badge/React_Flow-12.3-violet?style=for-the-badge)](https://reactflow.dev/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=for-the-badge&logo=supabase)](https://supabase.com/)
[![Vitest](https://img.shields.io/badge/Vitest-2.1-FCC72B?style=for-the-badge&logo=vitest)](https://vitest.dev/)

MINDMELD is an intelligent collegiate collaboration platform that connects student innovators based on verified skills, cognitive personality archetypes, project ambitions, and weekly availability. It transforms fragmented student networks, hackathon team formation, and startup co-founder discovery into a science.

---

## 🚀 Key Modules & Architecture

### 1. 🧬 AI Compatibility Matching Engine
A deterministic, explainable multi-factor compatibility algorithm that produces a normalized **0–100** score:
- **Skill Complementarity (30%)**: Analyzes overlap vs. complementary unique superpowers.
- **Shared Interests (20%)**: Aligns technical passions (AI research, Web3, Startups).
- **Project Goals (20%)**: Synchronizes milestone ambitions (hackathon win vs. venture-backed company).
- **Availability Alignment (15%)**: Synchronizes weekly hours to avoid unequal workloads.
- **Experience Compatibility (10%)**: Pairs peers for optimal velocity or senior-junior mentorship.
- **Collaboration Preferences (5%)**: Matches target team roles (Frontend, Backend, Design, ML).

### 2. 🎲 Team Roulette (Signature Feature)
Animated, intelligent squad generator:
- Configure squad size (2 to 6 members).
- Select project domain (AI, FinTech, Healthcare, Cybersecurity, Smart Cities, Social Impact).
- AI Synergy vs. Wildcard mode.
- Deduplicates members, balances cross-functional coverage, appoints a team leader, and distributes roles (Frontend, Backend, AI/ML, UI/UX Designer, Researcher, PM).
- Persists squads directly to dedicated workspaces.

### 3. 💼 Team Workspaces & Sprint Kanban
- Dedicated squad environments with 4-stage Kanban task tracking: **To Do**, **In Progress**, **In Review**, and **Completed**.
- Priority badges, assignee avatars, and due date management.
- Real-time persistent squad chat channels.
- Squad roster and technical stack badges.
- +40 XP awarded on task completion.

### 4. 🏆 Collegiate Mission Generator
- Curated catalog of real-world innovation challenges across 8 domains and 4 difficulty tiers (*Easy*, *Medium*, *Hard*, *Expert*).
- Generates novel problem statements with complete architecture directions and impact estimates.
- Allows accepting challenges, bookmarking favorites, and assigning missions directly to workspaces.

### 5. 🌌 Connection Universe (React Flow)
- Interactive 2D graph network rendering student nodes and verified connection edges.
- Color-coded by domain with custom glowing nodes, smooth panning, zooming, minimap, and instant profile inspection on click.

### 6. 🧠 Collaboration Personality Discovery
- 8-question cognitive collaboration quiz.
- Calculates an empirical archetype:
  - *The Strategic Architect*
  - *The Catalyst Visionary*
  - *The Pragmatic Builder*
  - *The Harmonizing Coordinator*
- Radar chart breakdown across Teamwork, Leadership, Communication, Problem Solving, and Adaptability.

### 7. 🔬 Squad Skill Gap Analyzer
- Audits squad composition against domain benchmarks (AI, FinTech, Healthcare, Full-Stack).
- Pinpoints critical missing skills and recommends ideal student candidates to recruit.
- Suggests curated learning resources to upskill during sprints.

### 8. 💡 AI Project Idea Generator
- Combines team members' multi-disciplinary skills to synthesize novel startup concepts with innovation scores, architecture breakdowns, and role suggestions.

### 9. 🔒 Anonymous Peer Feedback
- Teammate feedback with permanent identity protection.
- Evaluates communication, reliability, technical contribution, and team spirit.
- Aggregated ratings displayed on student profile with strict content moderation.

### 10. 📱 Campus QR Networking
- Generates dynamic SVG/PNG QR badges for instant profile sharing at hackathons and meetups.
- Mobile camera scan support and one-click URL sharing.

### 11. 🛡️ Institutional Governance & Admin Portal
- Protected administrative dashboard with role-based access control.
- Platform growth telemetry, student verification directory, and moderation tools.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 14 (App Router, Server Components & Server Actions) |
| **Language** | TypeScript (Strict mode enabled) |
| **Styling** | Tailwind CSS with custom Cyberpunk AI SaaS design system |
| **Animation** | Framer Motion & HTML5 Canvas Constellation Physics |
| **Graph Visualization** | React Flow (`@xyflow/react`) |
| **Charts** | Recharts (Area charts, Bar charts, Radar charts) |
| **Icons** | Lucide React |
| **Validation** | Zod v3 |
| **Forms** | React Hook Form |
| **Database & Auth** | Supabase PostgreSQL + Row-Level Security (RLS) |
| **State & Persistence**| Multi-tab synchronized LocalStorage fallback (Demo Mode) |
| **Testing** | Vitest (Automated unit test suite) |

---

## ⚡ Zero-Config Demo Mode

MINDMELD works **out of the box** without requiring external credentials:
- When Supabase environment variables are absent, MINDMELD automatically activates **Demo Mode**.
- Seeded with 7+ realistic, diverse student personas from Stanford, MIT, Berkeley, Georgia Tech, CMU, and Waterloo.
- 1-Click Instant Persona Switcher in the top banner:
  - **Aria Vance** (Student – AI/ML Engineer, Stanford)
  - **Marcus Sterling** (Team Leader – Full-Stack PM, MIT)
  - **Dr. Elena Ramos** (Institutional Administrator, CMU)
- Full local browser persistence: create teams, save ideas, send messages, and complete tasks with real-time UI updates.

---

## 💻 Local Development Setup

### 1. Prerequisites
- **Node.js**: v18.17+ or v20+
- **npm** or **pnpm**

### 2. Clone and Install Dependencies
```bash
git clone https://github.com/your-username/mindmeld.git
cd mindmeld
npm install
```

### 3. Run Automated Tests
```bash
npx vitest run
```
Expected output:
```
Test Files  3 passed (3)
     Tests  11 passed (11)
```

### 4. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for Production
```bash
npm run build
npm run start
```

---

## 🗄️ Supabase Database Setup (Production Mode)

When ready to connect a real PostgreSQL database:

1. Create a project at [supabase.com](https://supabase.com).
2. Open the **SQL Editor** in the Supabase Dashboard.
3. Run the schema migration located at `supabase/migrations/001_initial_schema.sql`.
4. (Optional) Run the seed dataset at `supabase/seed.sql`.
5. Copy your credentials into `.env.local`:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```
MINDMELD will automatically detect the configuration and connect to Supabase Auth and PostgreSQL.

---

## 🚢 Vercel Deployment

1. Push your repository to GitHub.
2. In Vercel, click **Add New Project** and select your repository.
3. (Optional) Add your Supabase environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Click **Deploy**. Vercel will build and launch MINDMELD with zero additional configuration.

---
deployed link:https://mind-meld-evsn2dvpi-bhavithamarikeeris-projects.vercel.app/

## 📄 License
MIT License. Crafted for collegiate builders, researchers, and hackathon competitors.
