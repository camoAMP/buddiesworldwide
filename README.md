# buddiesworldwide

## Client Intake Page

- Route: `/client-intake`
- API: `POST /api/client-intake`

Submission behavior:

- Creates `clients/<company>-<timestamp>/README.md`
- Creates `clients/<company>-<timestamp>/submission.json`
- Saves uploaded files under `clients/<company>-<timestamp>/uploads/...`
- Sends email notification to `INTAKE_NOTIFICATION_EMAIL` (default: `cameron@chicagoamp.com`)

Environment variables:

- `GMAIL_USER`
- `GMAIL_APP_PASSWORD`
- `MAIL_FROM` (optional, defaults to `GMAIL_USER`)
- `INTAKE_NOTIFICATION_EMAIL` (optional)
