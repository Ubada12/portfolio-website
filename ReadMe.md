# 🚀 Next.js 16 Animated Portfolio

<p align="center">
  <strong>Engineered like a product • Designed like a brand • Built for performance</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=nextdotjs" />
  <img src="https://img.shields.io/badge/React-19-20232A?style=for-the-badge&logo=react" />
  <img src="https://img.shields.io/badge/TypeScript-Strict-blue?style=for-the-badge&logo=typescript" />
  <img src="https://img.shields.io/badge/TailwindCSS-v4-38B2AC?style=for-the-badge&logo=tailwindcss" />
  <img src="https://img.shields.io/badge/FramerMotion-Animations-purple?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Architecture-Production%20Grade-success?style=for-the-badge" />
</p>

---

# ✨ Overview

A **modern animated developer portfolio** built with **Next.js 16 App Router**, **React 19**, **TypeScript**, and **Tailwind CSS v4**.

This project is designed as a **production‑grade front‑end system**, not a simple template.

It focuses on:

• Smooth interactions
• Modular architecture
• Performance‑first animation
• Scalable content management
• Modern UI engineering patterns

Features include:

* Custom magnetic cursor system
* Scroll‑aware navigation
* Smooth scrolling via Lenis
* Interactive engineering timeline
* Dynamic project detail system
* Modular content architecture

---

# 🧱 Tech Stack

## Core Technologies

| Category         | Technology                          |
| ---------------- | ----------------------------------- |
| Framework        | Next.js 16 (App Router + Turbopack) |
| Language         | TypeScript (Strict Mode)            |
| UI Library       | React 19                            |
| Styling          | Tailwind CSS v4 + PostCSS           |
| Animation        | Framer Motion                       |
| Smooth Scroll    | Lenis                               |
| UI Primitives    | Radix UI                            |
| Component System | shadcn‑style components             |
| Theming          | next-themes                         |
| Analytics        | Vercel Analytics                    |

---

# 📂 Project Architecture

```bash
app/
  layout.tsx
  page.tsx
  globals.css
  error.tsx
  not-found.tsx

  projects/[slug]/
    page.tsx
    ProjectDetail.tsx
    not-found.tsx

components/
  core/
    CustomCursor.tsx
    SmoothScroll.tsx
    ThemeProvider.tsx
    ThemeToggle.tsx

  layout/
    Navigation.tsx

  reusable/
    MagneticButton.tsx
    MarqueeText.tsx
    SectionBadge.tsx
    TextReveal.tsx

  sections/
    hero/
    about/
    stack/
    projects/
    experience/
    contact/
    footer/
    loading/

hooks/
  useScrollSpy.ts

lib/
  constants.ts
  utils.ts

constants/
  personal.ts
  metadata.ts
  navigation.ts
  hero.ts
  about.ts
  stack.ts
  experience.ts
  contact.ts
  footer.ts

  projects/
    _template.ts
    index.ts
    goat-detection.ts
    e-commerce-platform.ts
    ai-writing-assistant.ts
    fitness-tracking-app.ts

public/
  icons/
  images/
  docs/
  resume.pdf
```

---

# 🏗 System Architecture

## Theme System

* Dark mode is default
* Powered by **next-themes**
* Tailwind custom dark variant

```css
@custom-variant dark (&:is(.dark *))
```

Key characteristics:

* Explicit dark surfaces
* CSS variable shimmer effects
* Theme persistence across sessions

---

## Navigation & Scroll Intelligence

Navigation uses a **viewport‑overlap scroll spy algorithm**.

Key details:

* Calculates visible pixels for each section
* Uses `requestAnimationFrame` throttling
* Prevents scroll‑state flicker

Engineering Process is excluded from the Experience wrapper to avoid false active states.

---

# 🧠 Content Architecture

All editable content lives inside the **`constants/` directory**.

This enforces **complete separation between UI logic and content data**.

| File          | Purpose                  |
| ------------- | ------------------------ |
| personal.ts   | Name, socials, resume    |
| metadata.ts   | SEO + OpenGraph metadata |
| navigation.ts | Navbar configuration     |
| hero.ts       | Hero section content     |
| about.ts      | Philosophy + pipeline    |
| stack.ts      | Tech stack definitions   |
| experience.ts | Work experience          |
| contact.ts    | Contact form labels      |
| footer.ts     | Footer text + modal      |

Components import via:

```ts
@/constants
```

---

# 📦 Project Data System

Each portfolio project lives inside:

```
constants/projects/
```

Every project exports a **ProjectDoc object**.

### Example Structure

```ts
export const project: ProjectDoc = {
  id: "goat-detection",
  slug: "goat-detection",
  title: "AI Goat Detection System",
  description: "Deep learning model for livestock detection",
  tags: ["YOLO", "Deep Learning", "Python"],
  github: "#",
}
```

Optional fields automatically enable or disable sections on the project detail page.

---

# ⚡ Performance Engineering

Performance is treated as a **first‑class concern**.

Optimizations include:

* `memo()` wrapped components
* `requestAnimationFrame` scroll throttling
* CSS‑based infinite animations
* `ResizeObserver` marquee loops
* `useMemo` computed styles

The UI maintains **consistent 60fps rendering** even during animation heavy sections.

---

# 🎯 Key Interactive Sections

## Hero

* Animated SVG background
* Code editor simulation
* Floating technology icons

## Tech Stack

Two modes:

**All Mode**

* Infinite dual marquee rows

**Filtered Mode**

* Static centered technology grid

---

## About

Left Panel

* Engineering philosophy
* Thinking pipeline
* Currently exploring

Right Panel

* Glass UI container
* Capability grid
* Differentiators

---

## Experience Timeline

Desktop:

* Alternating timeline layout
* Center gradient timeline indicator

Mobile:

* Vertical timeline
* Gradient connectors

---

## Engineering Process

One of the most advanced sections:

* 400vh sticky section
* Horizontal scroll illusion
* Scroll progress indicators
* Interactive stage cards

---

# 🛠 Development

Start the development server:

```bash
npm run dev
```

Runs on:

```
Port: 5000
Host: 0.0.0.0
```

Allowed dev origins are configured in:

```
next.config.mjs
```

---

# 🚀 Production

Build the application:

```bash
npm run build
```

Run production server:

```bash
npm run start
```

Deployment target:

* Autoscale environment
* Optimized for Vercel

---

# 🛡 Error Handling

Implemented using **Next.js App Router error boundaries**.

| File              | Purpose               |
| ----------------- | --------------------- |
| app/error.tsx     | Global crash recovery |
| app/not-found.tsx | Styled 404 page       |

The contact form also includes safe try/catch handling.

---

# ♿ Accessibility

Accessibility is considered across the UI:

* `aria-label` for icon buttons
* `aria-pressed` for filter toggles
* secure external links
* optimized image loading

---

# 🧠 Design Philosophy

This portfolio is **engineered like a product system**.

Principles:

* Separation of concerns
* Modular component architecture
* Scalable content management
* Performance‑first animations
* Maintainable code structure

---

# 🌟 What Makes This Portfolio Unique

✔ Magnetic cursor physics system
✔ Scroll‑aware navigation engine
✔ Modular constants‑driven architecture
✔ Dynamic project documentation pages
✔ Horizontal engineering walkthrough
✔ Production‑grade performance optimization

---

<p align="center">

### Built with precision. Designed with intention.

</p>
