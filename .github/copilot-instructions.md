# Copilot Instructions for EnergeX-AI-Hiring-Test

## Overview
This monorepo contains a microservice API built with **Lumen (PHP)** and **Node.js (TypeScript)**, integrating **Redis** for caching, **MySQL** for persistence, and a minimal frontend (React.js or Vue.js). The goal is to provide a robust, testable backend for candidate evaluation.

## Architecture
- **Lumen Backend (`lumen-app/`)**: RESTful API with JWT authentication, models (User, Post), jobs/events/listeners, and service providers. Routes are split into `routes/api.php` and `routes/web.php`.
- **Node.js API (`node-cache-api/`)**: TypeScript service exposing endpoints, with caching logic in `services/`, main entry in `src/app.ts` and `src/server.ts`. Integrates with MySQL and Redis.
- **Frontend**: Not present in repo, but API is designed for consumption by a simple React/Vue app.

## Developer Workflows
- **Build & Run**:
  - Use `docker-compose up` from repo root to start all services (Lumen, Node, DB, Redis).
  - Node API: `npm install` then `npm run dev` in `node-cache-api/` for local development.
  - Lumen: Use `php artisan serve` in `lumen-app/` for local PHP server.
- **Testing**:
  - Node: Run `npm test` (Jest + Supertest) in `node-cache-api/`.
  - Lumen: Run `./vendor/bin/phpunit` in `lumen-app/`.
- **CI/CD**:
  - Tests are expected to run on push (see README for GitHub Actions/GitLab CI setup).

## Conventions & Patterns
- **Lumen**:
  - Controllers in `app/Http/Controllers/`, Models in `app/Models/`, Events/Listeners/Jobs in respective folders.
  - Service Providers register bindings in `app/Providers/`.
  - Use Eloquent ORM for DB access.
- **Node.js**:
  - Service logic in `src/services/`, types in `src/types/`.
  - Use async/await for DB/cache calls.
  - API routes are defined in `src/app.ts`.
- **Testing**:
  - Node: Use Jest for unit/integration tests, Supertest for endpoint testing.
  - Lumen: Use PHPUnit for API and model tests.

## Integration Points
- **Redis**: Used for caching in both Node and Lumen (see service code for usage).
- **MySQL**: Main persistence layer, migrations in `lumen-app/database/migrations/`.
- **JWT Auth**: Lumen API uses JWT for authentication (see `config/auth.php`).

## Examples
- To add a new API endpoint in Node, create a service in `src/services/`, add route in `src/app.ts`, and write tests in `src/__tests__/`.
- To add a new model in Lumen, create in `app/Models/`, add migration, and update relevant controllers/providers.

## References
- See `README.md` in repo root and `lumen-app/README.md` for more details on setup and conventions.
- Key files: `docker-compose.yml`, `lumen-app/routes/api.php`, `node-cache-api/src/app.ts`, `lumen-app/app/Models/User.php`, `node-cache-api/src/services/mysql.ts`.

---
For questions or unclear patterns, review the referenced files or ask for clarification.
