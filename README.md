<div align="center">

# ⚡ AdminPro

### A Next-Generation React Admin Dashboard

<br/>

[![React](https://img.shields.io/badge/React-18-61dafb?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5-646cff?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38bdf8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Recharts](https://img.shields.io/badge/Recharts-2-22c55e?style=for-the-badge&logo=chartdotjs&logoColor=white)](https://recharts.org/)
[![License](https://img.shields.io/badge/License-MIT-a78bfa?style=for-the-badge)](LICENSE)

<br/>

> **Blazing fast · Pixel perfect · Dark & beautiful**  
> A fully-responsive admin dashboard built for modern web applications.

<br/>

---

</div>

## ✨ What Makes This Different

Most dashboards look the same. **AdminPro** doesn't.

- **Deep obsidian aesthetic** — layered backgrounds, noise-texture overlays, and a violet/cyan accent palette that feels premium
- **Micro-animations everywhere** — staggered fade-ups on mount, smooth sidebar collapse, bar-chart grow animation, hover state transitions
- **Actually interactive** — every button, toggle, filter, and chart works. No placeholder UI.
- **Production-quality code** — clean component architecture, reusable UI primitives, context-based theming

---

## 🖼️ Pages & Features

<table>
  <thead>
    <tr>
      <th>Page</th>
      <th>What's Inside</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><b>🏠 Dashboard</b></td>
      <td>4 stat metric cards · Weekly traffic bar chart · Live activity feed · Top pages with progress bars · KPI summary row</td>
    </tr>
    <tr>
      <td><b>📊 Analytics</b></td>
      <td>Dual-series Revenue vs Users chart · CSS donut chart (device split) · Traffic sources breakdown · Geographic data table</td>
    </tr>
    <tr>
      <td><b>👥 Users</b></td>
      <td>Searchable data table · Role & status filters · Pagination · Color-coded role badges · Hover action buttons</td>
    </tr>
    <tr>
      <td><b>⚙️ Settings</b></td>
      <td>Profile form · Notification toggles · Accent color picker · Security options · Animated save button</td>
    </tr>
  </tbody>
</table>

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** `>=18.x`
- **npm** `>=9.x`

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Rana-Haseeb/admin-dashboard.git

# 2. Navigate into the project
cd admin-dashboard

# 3. Install dependencies
npm install

# 4. Start the dev server
npm run dev
```

Open **[http://localhost:5173](http://localhost:5173)** and enjoy.

### Build for Production

```bash
npm run build      # outputs to /dist
npm run preview    # preview the production build locally
```

---

## 🗂️ Project Structure

```
admin-dashboard/
│
├── index.html                    # Entry HTML + Google Fonts preloads
├── vite.config.js                # Vite build config
├── tailwind.config.js            # Custom design tokens
├── postcss.config.js
├── package.json
│
└── src/
    ├── main.jsx                  # React DOM entry point
    ├── index.css                 # Global tokens, animations, utility classes
    │
    ├── context/
    │   └── ThemeContext.jsx      # Light/dark theme state
    │
    ├── data/
    │   ├── metricsData.js        # KPI card data
    │   └── chartData.js          # Chart series data
    │
    ├── components/
    │   ├── ui/
    │   │   ├── Button.jsx        # Reusable button primitive
    │   │   └── Card.jsx          # Reusable card primitive
    │   └── dashboard/
    │       ├── DashboardLayout.jsx   # Header + main layout wrapper
    │       ├── Sidebar.jsx           # Collapsible sidebar (desktop + mobile)
    │       ├── MetricCard.jsx        # Stat card with trend indicator
    │       ├── AnalyticsCharts.jsx   # Chart components (Recharts)
    │       └── ThemeToggle.jsx       # Dark/light mode toggle
    │
    └── pages/
        ├── UsersPage.jsx
        └── SettingsPage.jsx
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [React 18](https://react.dev/) with Hooks |
| Build Tool | [Vite 5](https://vitejs.dev/) — sub-second HMR |
| Styling | [Tailwind CSS 3](https://tailwindcss.com/) |
| Charts | [Recharts 2](https://recharts.org/) |
| Icons | [Lucide React](https://lucide.dev/) |
| Fonts | Syne · Plus Jakarta Sans · JetBrains Mono |

---

## 🎨 Design System

```
Palette
  Background   →  #0a0a0f  (deep obsidian)
  Surface      →  #12121a  (card layer)
  Border       →  #1e1e2e  (subtle divider)
  Accent       →  #7c3aed  (violet primary)
  Highlight    →  #22d3ee  (cyan secondary)
  Text primary →  #f1f5f9
  Text muted   →  #64748b

Typography
  Display      →  Syne (600–800)
  Body         →  Plus Jakarta Sans (400–600)
  Data / Code  →  JetBrains Mono (400–500)
```

---

## 📸 Screenshots

> *(Add screenshots or a GIF recording here — drag and drop images into this section on GitHub)*

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repository
2. Create your feature branch — `git checkout -b feat/amazing-feature`
3. Commit your changes — `git commit -m "feat: add amazing feature"`
4. Push to the branch — `git push origin feat/amazing-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

Built with ❤️ during the **NexSoft Solutions Internship**

**[⬆ Back to top](#-adminpro)**

</div>
