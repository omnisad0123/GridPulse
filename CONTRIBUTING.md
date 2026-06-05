# Contributing To GridPulse

This repository is intentionally structured for backend-heavy SWE-bench style tasks. Keep changes focused, deterministic, and easy to validate from the repository root.

## Local Setup

Install backend dependencies:

```bash
cd backend
npm ci
```

Install frontend dependencies:

```bash
cd frontend
npm ci
```

Run backend tests from the repo root:

```bash
npm test
```

Run the frontend dashboard:

```bash
cd frontend
npm run dev
```

## Backend Development

Add new backend capabilities as Nest modules under `backend/src`. Prefer small modules with clear controller/service boundaries. If a feature has validation logic, isolate it in a service so tests can exercise the behavior directly through HTTP and through unit tests.

Recommended pattern:

```text
src/example/
  example.module.ts
  example.controller.ts
  example.service.ts
  dto/
```

## Testing

Use the smallest relevant test command while developing:

```bash
npm run test:ingest
npm run test:status
npm run test:analytics
npm run test:alerts
npm run test:audit
npm run test:exports
```

Before committing a broad change, run:

```bash
npm test
npm run build
```

Frontend validation:

```bash
cd frontend
npm run build
```

Docker validation:

```bash
docker build -t gridpulse-backend .
docker run --rm gridpulse-backend
```

## Commit Convention

Use conventional commit prefixes:

- `feat:` for new behavior
- `fix:` for bug fixes
- `test:` for tests
- `docs:` for documentation
- `chore:` for infrastructure and dependency work
- `refactor:` for internal reshaping without behavior changes

Every commit should contain real file changes and keep tests passing for the touched area.

## Adding A New Module

1. Create the module directory under `backend/src`.
2. Add controller and service files.
3. Register the module in `AppModule`.
4. Add e2e tests under `backend/test`.
5. Add utility tests for reusable helpers.
6. Update README API tables if the module exposes routes.

## Silver Task Hygiene

Do not make tasks harder by vague instructions or brittle tests. Good task candidates come from subtle runtime behavior:

- timestamp ordering
- all-or-nothing batch validation
- history versus current status reads
- disabled-rule handling
- export status boundaries
- audit suppression on failure

Tests should assert behavior through APIs or public functions. Avoid source greps, variable-name checks, or implementation-specific assertions.

## Dependency Changes

When changing dependencies:

1. Update the correct package file.
2. Refresh the matching lockfile.
3. Run `npm audit`.
4. Run tests and builds.
5. Keep frontend dependencies independent from backend Docker validation.
