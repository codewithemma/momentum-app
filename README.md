# Momentum

Momentum is an open-source client relationship management (CRM) frontend for
independent professionals and small teams. It gives users one place to manage
leads, move opportunities through a sales pipeline, record follow-ups and
activities, and keep track of reminders that need attention.

This repository contains the Next.js frontend. It requires a compatible
Momentum API to provide authentication and application data.

## Features

- Google sign-in with Auth.js and JWT-based sessions.
- Guided onboarding for work profile and lead-source preferences.
- Dashboard overview with lead totals, active leads, follow-ups due, won leads,
  pipeline summary, items needing attention, and recent activity.
- Lead creation, search, filtering by source, pagination, detail views,
  editing, deletion, and pipeline status changes.
- Lead activities for calls, emails, meetings, notes, and follow-up events.
- Follow-up scheduling, due/overdue filtering, and notification read states.
- User profile name and default lead-source settings.
- Light, dark, and system theme options.

## Screenshots

Screenshots have not yet been added. Maintainers can add approved product
images here once they are available.

## Tech stack

- [Next.js](https://nextjs.org/) 16.3.6 with the App Router
- [React](https://react.dev/) 19.2.8 and TypeScript
- [Tailwind CSS](https://tailwindcss.com/) 4 with PostCSS
- [Auth.js / NextAuth](https://authjs.dev/) 5.0.0-beta.32
- [Axios](https://axios-http.com/) for API requests
- [TanStack Query](https://tanstack.com/query) for server-state fetching and
  mutations
- `nuqs` for URL query state and `use-debounce` for debounced search
- `date-fns`, `lucide-react`, and `sonner` for date handling, icons, and
  notifications
- pnpm, ESLint, and the Next.js TypeScript ESLint configuration

## Architecture

The browser uses the Axios client in `src/libs/axios-util.ts`, configured with
`NEXT_PUBLIC_API_URL`, to call the Momentum API. API operations are grouped in
`src/services/api-services.ts` and consumed by TanStack Query hooks. When a
session contains an access token, the Axios request interceptor sends it as a
Bearer authorization header.

Auth.js handles the frontend session through the route at
`/api/auth/[...nextauth]`. Google sign-in sends the Google ID token to the
Momentum API's `/auth/google-login` endpoint. The API response supplies the
application user, access token, and refresh token. Auth.js stores these in a
JWT session and refreshes the access token through `/auth/refresh` when needed.
The proxy protects the dashboard, leads, pipeline, settings, and onboarding
routes and redirects users based on authentication and onboarding state.

## Getting started

### Prerequisites

- Node.js compatible with Next.js 16
- pnpm (the repository includes `pnpm-lock.yaml`)
- Access to a compatible Momentum API instance
- Google OAuth credentials for local sign-in

### Install and configure

```bash
git clone https://github.com/codewithemma/momentum-app.git
cd momentum-app
pnpm install
Copy-Item .env.example .env.local
```

On macOS or Linux, use `cp .env.example .env.local` instead of
`Copy-Item`. Fill in the values in `.env.local` as described below before
starting the app.

### Run locally

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). The frontend will redirect
the root route to `/login`.

## Environment variables

Create `.env.local` from [.env.example](./.env.example). Do not commit
`.env.local` or any real credentials.

| Variable | Required | Description |
| --- | --- | --- |
| `NEXT_PUBLIC_API_URL` | Yes | Base URL of the Momentum API. The frontend appends routes such as `/auth/google-login`, `/auth/refresh`, `/leads`, and `/dashboard/overview`. |
| `AUTH_GOOGLE_ID` | Yes | Google OAuth client ID used by the Auth.js Google provider. |
| `AUTH_GOOGLE_SECRET` | Yes | Google OAuth client secret used by the Auth.js Google provider. |
| `AUTH_SECRET` | Yes | Secret used by Auth.js to protect the JWT session. Generate a strong random value for each environment. |

`NODE_ENV` is read by Next.js/Auth.js to enable development debugging and is
normally managed by the framework; it is not included in `.env.example`.

## Backend configuration

This frontend cannot operate fully without a compatible Momentum API instance.
Set `NEXT_PUBLIC_API_URL` to the API origin and ensure that its authentication,
lead, dashboard, activity, notification, and user endpoints match the client
calls in `src/services/api-services.ts`.

The current repository metadata verifies only this frontend repository:
[codewithemma/momentum-app](https://github.com/codewithemma/momentum-app). A
backend repository URL has not been configured or verified here; obtain the
correct URL from the maintainer rather than guessing one.

## Available scripts

These are the scripts currently defined in `package.json`:

| Command | Purpose |
| --- | --- |
| `pnpm dev` | Start the Next.js development server. |
| `pnpm build` | Create a production Next.js build. |
| `pnpm start` | Start the production server after `pnpm build`. |
| `pnpm lint` | Run ESLint. |

There are currently no package scripts for tests or a standalone type-check.

## Project structure

```text
src/
  app/                  App Router pages, layouts, route handlers, and UI
  components/           Shared providers and reusable UI components
  hooks/                TanStack Query and mutation hooks
  libs/                 Axios client, routes, date, and utility helpers
  server/auth/          Auth.js configuration and exports
  services/             Momentum API request definitions
  types/                Shared TypeScript domain and API types
public/                 Static assets
next.config.ts          Next.js redirects and configuration
eslint.config.mjs       ESLint configuration
postcss.config.mjs      Tailwind/PostCSS configuration
pnpm-lock.yaml          Locked pnpm dependency graph
```

The main authenticated screens are `/dashboard`, `/leads`, `/pipeline`, and
`/settings`. `/onboarding` is shown to authenticated users who have not
completed onboarding.

## Authentication and Google OAuth

Auth.js uses the Google provider configured in
`src/server/auth/config.ts`. To use your own Google credentials:

1. Create or select a Google Cloud project.
2. Configure the OAuth consent screen for the users and scopes appropriate to
   your project.
3. Create a Web application OAuth client.
4. Put its client ID in `AUTH_GOOGLE_ID` and client secret in
   `AUTH_GOOGLE_SECRET`.
5. Add the Auth.js callback URL for each environment. For local development,
   use `http://localhost:3000/api/auth/callback/google`. For a deployed
   frontend, use `https://<your-frontend-host>/api/auth/callback/google`.
6. Set `AUTH_SECRET` and configure the Momentum API to accept the Google ID
   token submitted by the frontend.

The API must also be configured to accept the frontend origin where applicable.
Never commit OAuth client secrets or `AUTH_SECRET`.

## Contributing

Please read [CONTRIBUTING.md](./CONTRIBUTING.md) before opening a pull request.
It covers local setup, branch and commit conventions, validation, and pull
request expectations.

## Security

Please do not report suspected vulnerabilities in a public issue. Follow the
private reporting instructions in [SECURITY.md](./SECURITY.md) when they are
available, or contact the repository maintainer privately to request the
approved security-reporting channel. Do not include credentials, tokens, or
personal data in reports.

> Maintainer action: configure a private security contact or GitHub private
> vulnerability reporting channel and replace this placeholder with the exact
> process.

## License

No license file or license declaration is currently present in this
repository. The project license is therefore a maintainer decision before an
open-source launch; do not assume that the code is licensed for reuse until a
license is added.
