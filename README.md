# WorkSite Manager

A full-stack workforce and site management platform for construction projects. Built with Next.js 16 (App Router), React 19, TypeScript, and TailwindCSS 4. AI-powered search via OpenRouter. Stripe-integrated payments.

**Live:** [worksite-manager-frontend.vercel.app](https://worksite-manager-frontend.vercel.app)

---

## Features

### Role-based dashboards (4 user types)

- **Admin** — manages all workers, creates Chief and Site Engineers
- **Chief Engineer** — creates sites, manages and approves workers
- **Site Engineer** — assigns daily tasks, processes worker payments
- **Worker** — views profile, tasks, and payment history

### Core modules

- Worker management (CRUD, approval workflow, soft-delete)
- Site management (create, list, status tracking)
- Task assignment between site engineers and workers
- Stripe-integrated payment processing for worker due payments
- Profile view and edit for all roles

### AI Assistant

Admins and Chief Engineers can ask natural-language questions like *"show me all plumbers at Site Alpha"* or *"workers with daily rate above 500"* and get conversational answers pulled from the live database. Powered by OpenRouter LLM.

### Authentication

- JWT-based auth (access + refresh tokens via httpOnly cookies)
- Next.js 16 Edge-compatible middleware (uses `jose`) for route protection
- Role-aware redirects to default dashboard per role

---

## Tech Stack

**Frontend**
- Next.js 16.0.7 (App Router, Turbopack, React Compiler)
- React 19.2
- TypeScript 5.9
- TailwindCSS 4.1
- Radix UI primitives
- Zod 4 for validation
- Sonner for toasts
- `jose` (JWT verify in Edge middleware)
- `jsonwebtoken` (JWT in server actions)
- Stripe Checkout

**Backend** (separate repo)
- Express + TypeScript
- Prisma ORM + PostgreSQL (Neon)
- Stripe SDK
- OpenRouter API (AI module)
- Deployed at: `https://work-site-manager-backend.vercel.app/api/v1`

---

## Getting Started

```bash
# install deps
npm install

# create .env file with:
#   NEXT_PUBLIC_BASE_API_URL=http://localhost:5000/api/v1   (or live backend URL)
#   JWT_SECRET=...
#   REFRESH_TOKEN_SECRET=...
#   RESET_PAASS_TOKEN_SECRET=...

# run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The backend must be running on port 5000 (or update `NEXT_PUBLIC_BASE_API_URL`).

---

## Project Structure

```
src/
├── app/
│   ├── (commonLayout)/         # public + auth pages (login, register, /, /about)
│   └── (DashboardLayout)/      # role-protected dashboard pages
│       ├── admin/dashboard/
│       ├── chief-engineer/dashboard/
│       ├── site-engineer/dashboard/
│       ├── (workerDashboardLayout)/dashboard/
│       ├── ask-ai/             # AI assistant page (admin + chief engineer)
│       └── my-profile/
├── components/
│   ├── module/                 # feature-specific components (AI, Auth, Home, etc.)
│   ├── shared/                 # shared UI utilities
│   └── ui/                     # Radix-based primitives
├── lib/                        # auth-utils, server-fetch, navItems config
├── services/                   # server actions (auth, AI, workers, sites)
├── proxy.ts                    # Next.js 16 middleware (route protection)
└── types/                      # shared TypeScript interfaces
```

---

## Current State

**~70% complete.** Core flows work end-to-end: auth, worker/site CRUD, task assignment, payments, AI search, profile management.

**Roadmap items still in progress:**

- Empty role-specific dashboard home pages (need stats / widgets)
- Attendance UI (backend has 7 endpoints, no frontend yet)
- Task list views for engineer and worker roles
- Worker detail tabs (attendance, payments, assignments)
- Password reset / forgot password / change password flows (backend routes pending)
- Worker approval button currently disabled in chief-engineer view

See `PROJECT_REVIEW.md` for the full audit and roadmap.

---

## Deploy

Deployed on Vercel. Auto-deploys on push to `main`, or manual via:

```bash
vercel --prod
```

Required Vercel environment variables (production):

- `NEXT_PUBLIC_BASE_API_URL`
- `JWT_SECRET`
- `REFRESH_TOKEN_SECRET`
- `RESET_PAASS_TOKEN_SECRET`

---

## Author

Built by **Abdullah Al Noman** ([@aalnoman2042](https://github.com/aalnoman2042)).