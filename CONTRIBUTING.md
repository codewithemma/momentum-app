# Contributing to Momentum

Thanks for helping improve Momentum. Contributions are welcome, including bug
fixes, accessible UI improvements, documentation, tests, and focused product
enhancements. Please discuss major changes in an issue before investing in a
large pull request.

## Prerequisites

- Node.js compatible with Next.js 16
- pnpm
- A compatible and authorized Momentum API instance
- Google OAuth credentials for local authentication

## Local setup

Fork the repository on GitHub, then clone your fork:

```bash
git clone https://github.com/<your-user>/momentum-app.git
cd momentum-app
pnpm install
Copy-Item .env.example .env.local
```

On macOS or Linux, use `cp .env.example .env.local`. Set the variables in
`.env.local` with your own Google credentials, an `AUTH_SECRET`, and the URL of
your locally configured or otherwise authorized Momentum API. See
[README.md](./README.md) for the required Google callback URL and API
configuration details.

Start the frontend with:

```bash
pnpm dev
```

## Branches and commits

Use a short, descriptive branch name such as:

- `feat/lead-search`
- `fix/auth-redirect`
- `docs/local-setup`

Use concise imperative commit subjects. Conventional Commit-style prefixes are
recommended, for example `feat: add lead source filter`,
`fix: preserve auth callback URL`, or `docs: clarify OAuth setup`.

## Code quality

- Keep changes focused and avoid unrelated refactoring.
- Preserve the existing TypeScript, Next.js App Router, TanStack Query, and
  Tailwind conventions.
- Keep UI behavior consistent across light, dark, and system themes.
- Reuse existing API services, hooks, types, and shared components where
  appropriate.
- Do not commit secrets, personal data, production credentials, or
  `.env.local`.

## Validation

Run the checks that exist in this repository before opening a pull request:

```bash
pnpm lint
pnpm build
```

There is currently no test script or standalone type-check script in
`package.json`. If your change adds or relies on another validation command,
document it in the pull request.

## Pull requests

Please include:

- A clear summary of the problem and the approach.
- The related issue, when one exists.
- Testing or validation commands and their results.
- Screenshots or a short recording for UI changes, including relevant theme or
  responsive states.
- Notes about API or environment configuration needed to review the change.

Keep pull requests reviewable and limited to one coherent change. Update
documentation when setup or user-facing behavior changes.
