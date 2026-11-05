# NIRT Solar CRM — Pure React Edition (Vite + React 19)

Complete Rooftop Solar Project Management & Lifecycle CRM for NIRT Renewable Energy Private Limited, Salem, Tamil Nadu.

Built with **Pure React 19**, **Vite**, **React Router v7**, and **Tailwind CSS**.
Eliminates all Next.js compilation overhead, `.next` caching locks, and port locking issues on Windows.

---

## ⚡ Quick Start

```bash
# 1. Navigate to directory
cd D:\Nirt\react-app

# 2. Start Vite Dev Server (instant HMR)
npm run dev

# 3. Production Build
npm run build

# 4. Preview Build
npm run preview
```

---

## 🏗️ Architecture & Features

- **Pure React Routing (`react-router-dom`)**:
  - `/` — Interactive 8-Role Dashboard, Executive Pipeline KPI charts, Salem/Namakkal/Erode circle filters.
  - `/pipelines` — 5-Pipeline Quad Board (20 Stages) with Dropped/Lost Leads Archive.
  - `/projects` — Solar Projects Master Registry with multi-status filters.
  - `/projects/:id` — Dynamic project slug detail view with communication trails, document previews, and print modals.
  - `/calculator` — Turnkey Rooftop Solar Sizer, PM Surya Ghar subsidy calculator, and 80/10/10 payment tracker.
  - `/settings/users` — 15 BFRD Roles Governance, RBAC Architecture Flowchart, and User Provisioning.
  - `/settings` — Master Data Hub, Circle Configurations, and SLA matrices.
  - `/login` — Session Switcher and Employee Sign-in.

- **Dynamic Slugs (`/projects/:id`)**:
  - Uses standard `useParams()` from `react-router-dom`.
  - Zero hydration issues, zero async param errors.

- **Design System**:
  - Apple SF Pro Optical Typography & Spring feedback animations (`cubic-bezier(0.2, 0, 0, 1)`).
  - Apple Translucent Glass Materials (`backdrop-filter: blur(20px)`).
  - Strict **Zero-Amber Policy** (Pure Electric Blue, Emerald Green, Indigo, Violet, Slate, Rose).
