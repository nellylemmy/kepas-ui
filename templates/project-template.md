# 🧠 AI Project Task Template – KEPAS Professional Web & App Agency

> **Instructions for AI:**
> You're building a professional, trustworthy, and modern digital presence for KEPAS, a Kenyan-based digital agency providing website, mobile app development, and consulting solutions to organizations without strong online visibility. This project targets local institutions (schools, clinics, NGOs, businesses, etc.) and should demonstrate authority, professionalism, and creativity without exaggeration. Prioritize world-class UI/UX, clarity, and backend performance.

Technologies include: **HTML, CSS, JavaScript, Node.js, PostgreSQL, Redis, Docker, TailwindCSS, Nginx** (and optionally: Express, Supabase, Prisma, HTMX, Alpine.js)

---

## 1. Task Overview

### Task Title

**Title:** KEPAS Company Platform – Brand-Focused, Conversion-Oriented Presence

### Goal Statement

**Goal:** Build a digital platform that reflects KEPAS as a modern, capable, and trusted solutions provider for digital transformation in Kenya. The site should convince organizations with no or bad looking web/app presence to trust KEPAS as their go-to digital partner.

---

## 2. Project Analysis & Current State

### Technology & Architecture

> **AI Agent:** Confirm, analyze, or enhance:

* Tailwind config with custom CSS vars (KEPAS green/navy, etc.)
* Responsive layout already in place; improve structure if necessary
* Evaluate HTML or choose HTMX depending on speed and performance structure for accessibility and SEO
* Dockerize the backend where needed
* PostgreSQL for client intake & lead data
* Redis optionally for contact rate-limiting or caching
* Check if forms are connected to backend APIs

---

## 3. UI/UX & Branding First Approach

### Brand Identity Generation

> Use these as reference:

* KEPAS Colors: `#1E2A38` (navy), `#2ECC71` (green), `#00F6A3` (accent teal)
* Fonts: Poppins (headings), Roboto (body)
* Icons: Feather Icons

**AI Agent:**

* Evaluate and preserve the current visual hierarchy
* Ensure visual weight and CTA color contrast is optimal for trust
* Explore subtle elevation, card hover interactions, and scroll reveals
* Define favicon, meta tags, OG images

### UX First UI Planning

* Hero should guide user toward the CTA (Start/Contact)
* Showcase client testimonials in trust-building tone
* Convert service cards into visual proof of capabilities
* Pricing must feel confident and transparent
* Process section must be clear, simple, human

---

## 4. Requirements Specification

### Functional Requirements

* [ ] Contact form with validation, confirmation, and email delivery
* [ ] WhatsApp, Telegram, and SMS quick chat links
* [ ] Project intake form (stored in PostgreSQL)
* [ ] Lead list saving with auto-tagging source (contact form, WhatsApp, etc.)
* [ ] Admin dashboard to view leads (future phase)
* [ ] Testimonial manager (optional phase)
* [ ] Video showcase section (YouTube embed with auto-play disable)
* [ ] Transparent pricing card selector with CTA buttons
* [ ] Google Analytics or [Plausible.io](https://plausible.io/) integration (free/cheap option)
* [ ] Blog/Insight CMS placeholder (phase 3)
* [ ] Floating live chat (optional Crisp or WhatsApp plugin)

### Non-Functional Requirements

* [ ] Lighthouse Score > 90 (Performance, SEO, Accessibility)
* [ ] Mobile-first, optimized load times
* [ ] Secure backend for form processing
* [ ] Spam protection using Redis or token
* [ ] Respectful, clear tone — avoid exaggeration
* [ ] All CTAs must reassure clients (e.g., "No payment needed to contact us")

---

## 5. Assets & UI Resources

### Assets

* Logo (SVG)
* Custom icons (optional)
* Images for landing sections (compressed)
* Placeholder video links
* Company contact details and testimonial quotes

> **AI Agent:** Suggest improvements for:

* Brand icon (favicon and logo refinement)
* Visual mockups for admin dashboard (if enabled later)

---

## 6. Backend Best Practices

### Core Guidelines

* Node.js + Express for API
* PostgreSQL schema: `clients`, `leads`, `messages`
* Redis for rate limiting or contact caching
* REST API with email notification service (e.g. Nodemailer, Africastalking)
* Clean folder structure: `controllers`, `routes`, `services`, `models`

### Docker Setup

* Dockerfile + docker-compose.yml for local and VPS testing
* Services: app, postgres, redis
* Use `.env.example` with safe default values

---

## 7. Testing & QA

### Automated Tests

* [ ] Contact form input validation test
* [ ] API endpoint test for `/lead` and `/message`
* [ ] WhatsApp/Telegram UTM tag checker (if added)

### Manual QA Checklist

* [ ] Form submission works and shows user feedback
* [ ] Mobile menu works on all viewports
* [ ] Contact and pricing CTAs navigate correctly
* [ ] No broken images, layout shifts, or scroll bugs
* [ ] Trust-building content is clear and honest
* [ ] Page transitions (if any) are smooth

---

## 8. AI Agent Deliverables

### Output Required

* Updated `index.html` + CSS with optimized layout
* `backend/` folder with Express server, form logic, database config
* `.env.example`
* `docker-compose.yml`
* `README.md` for local deployment
* Postman collection or OpenAPI spec
* `branding.md` file with brand color hex codes, fonts, tone suggestions

---

## 9. Deployment Instructions

### Hosting

* Docker-ready for Hostinger Ubuntu VPS deployment
* Nginx setup for reverse proxy
* PostgreSQL credentials via `.env`
* Email via SMTP (Mailgun or Gmail relay)
* Analytics via Google Analytics (free) or [Plausible.io](https://plausible.io) (cheap and privacy-focused)

---

## 10. Final Notes

* No overpromising or fluff; let design and copy earn trust
* Focus on converting skeptical offline institutions
* Make site fast, modern, and actionable
* Position KEPAS as **capable, efficient, reliable** — a smart tech partner
* All form CTAs must clearly say: “No payment required to start” or “Reach out free of charge” to build trust

---
