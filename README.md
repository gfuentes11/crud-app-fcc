# CRUD App — DevOps Pipeline with Docker & GitHub Actions

This project sets up a full-stack CRUD app using:
- React frontend (`crud-frontend`)
- Node/Express backend (`crud-backend`)
- Docker + Docker Compose
- GitHub Actions for CI (tests + linting)

We followed the guide **"How to Build a Production-Ready DevOps Pipeline with Free Tools"**  
but made some key adjustments to match our specific setup.

---

## ✅ What We Accomplished

### 🔨 Local Setup
- React app (`frontend/`) using **Create React App 4.x**
- Node/Express backend (`backend/`)
- Connected Axios calls in frontend to backend routes

### 🐳 Dockerization
- Created Dockerfiles for **multi-stage frontend build** (Node + Nginx)
- Dockerized backend (Node) server
- Set up Docker Compose to run both services together:
  - Frontend exposed at `localhost:3000`
  - Backend mapped to host `localhost:5001` (container stays on port 5000)

### ⚙ Environment Variables
- Used `.env` files for the frontend:
  - Set `REACT_APP_API_URL=http://backend:5000`  
    ⚠ This is critical because **inside Docker** we connect via the Docker service name, not `localhost` or host-mapped ports.
- Prepared Axios in React to read from `process.env.REACT_APP_API_URL`

### 🔨 CI/CD
- Set up GitHub Actions to:
  - Run linting
  - Run tests
- (Skipped for now) Docker build + push automation to Docker Hub or GHCR

---

## ⚠️ Key Differences from the Guide

| Step                                    | Guide                         | What We Did Differently                                  |
|-----------------------------------------|-------------------------------|--------------------------------------------------------|
| Backend port mapping                    | Same port inside + outside     | We **remapped backend to `5001`** on host to avoid conflicts |
| Axios configuration in React            | Hardcoded localhost            | We **moved API URL to `.env` + Docker Compose env var** |
| Node.js version for frontend build      | Used stable version            | We **hit OpenSSL 3 issues** with Node 18+ and added `NODE_OPTIONS=--openssl-legacy-provider` to bypass |
| Custom ESLint configs                   | Guide assumes none             | We **removed `.eslintrc.json`** that was causing ES6 import parsing issues |
| GitHub Actions                          | Guide extends into Docker push | We **paused at CI for now**, focusing only on local Docker Compose setup |

---
