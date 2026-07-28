A project by Launch Web Design and Marketing. June 2025.

## Endpoint Target Toggle (Local vs Prod)

The quote form action endpoint is centrally controlled by `src/config/runtime.ts`.

### Default behavior

- `npm run dev` uses values from `.env.development`
- `.env.development` is configured to submit to local contact handler:
	- `PUBLIC_CONTACT_FORM_HANDLER_URL=http://localhost:8787`

### Explicit target commands

- Local target:
	- `npm run dev:local-target`
- Production target:
	- `npm run dev:prod-target`

### Where to change the central value

- Runtime resolver: `src/config/runtime.ts`
- Development default: `.env.development`
- One-off overrides: command scripts in `package.json`

In development, `SubmissionModal` logs the resolved target URL to the browser console so you can verify the active destination quickly.