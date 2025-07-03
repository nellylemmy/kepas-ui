# 🧠 AI Project Task Template

> **Instructions:** Use this template to guide the AI in building a complete and high-quality project. The AI must first prioritize UI/UX design, deeply understand the problem being solved, and apply expert-level thinking in brand creation and backend architecture. Technologies often used include: HTML, CSS, JavaScript, Node.js, PostgreSQL, Redis, Docker, TailwindCSS, and other best-fit modern tools.

---

## 1. Task Overview

### Task Title

**Title:** \[Brief, descriptive title of what you're building or fixing]

### Goal Statement

**Goal:** \[Clear statement of what you want to achieve and why it matters in the real world]

---

## 2. Project Analysis & Current State

### Technology & Architecture

> **AI Agent:** Analyze the following to understand the tech stack and context.

* Check `package.json` for dependencies and versions
* Review Tailwind config for theme and design
* Analyze PostgreSQL schema and Redis usage (if present)
* Check for Dockerfiles and docker-compose
* Detect build tools and CI/CD setup
* Confirm frontend/backend structure (e.g., monorepo, API-first, microservices)

---

## 3. UI/UX & Branding First Approach

### Brand Identity Generation

**AI Agent:**

* Understand the project's mission/problem
* Propose a professional brand name if not defined
* Generate a unique color palette that matches the project's goal (e.g., education, health, fintech, etc.)
* Define typography and iconography suitable for the domain
* Present 2–3 branding suggestions (color, font, tone) with reasoning

### UX First UI Planning

* Layout should follow mobile-first, responsive best practices
* Use TailwindCSS for utility-first styling
* Maintain accessibility standards (WCAG)
* Prefer modern layouts with clear visual hierarchy
* Include animations and transitions or micro-interactions if relevant

---

## 4. Requirements Specification

### Functional Requirements

**AI Agent:** Implement the following features based on user stories or objectives:

*

### Non-Functional Requirements

**AI Agent:** Ensure the following:

*

---

## 5. Assets & UI Resources

### Assets

> **AI Agent:**

* Request or generate placeholders for images, icons, and illustrations
* Store assets in `/assets` or `/public`
* Suggest Figma alternatives if none provided

---

## 6. Backend Best Practices

### Core Guidelines

* Use Node.js (Express) for API design
* Structure project into modules/controllers/services
* Use PostgreSQL with Knex.js or Prisma ORM
* Redis for caching or queuing where relevant
* Validate inputs, sanitize outputs, handle errors gracefully

### Docker Setup

* Include Dockerfile and docker-compose with multi-service config
* Setup volumes, ports, env variables, and database containers

---

## 7. Testing & QA

### Automated Tests

* Write unit tests for utility functions and services
* Add integration tests for endpoints using Supertest or similar

### Manual QA Checklist

*

---

## 8. AI Agent Deliverables

### Output Required

* All source code files (frontend and backend)
* README.md with local setup instructions
* `.env.example` for configuration variables
* Docker files for easy deployment
* Postman collection for API documentation
* Brand identity markdown summary

---

## 9. Deployment Instructions

### Hosting

* Recommend best-fit hosting (hostinger VPS for backend)
* Provide commands for build and deploy
* Ensure `.env` is properly documented and secure keys not committed

---

## 10. Final Notes

* Mention any known bugs or limitations
* Highlight areas needing human review or decisions
* Link to mockups, designs, or test accounts if any
* Prioritize usability, scalability, and clarity

---
