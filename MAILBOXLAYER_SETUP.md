# Mailboxlayer setup

House Construction Manager uses Mailboxlayer only as an email-quality check during account creation. Supabase Auth remains responsible for account creation, sessions and email verification.

## Netlify

Add this server-side environment variable:

`MAILBOXLAYER_API_KEY`

Do NOT create `VITE_MAILBOXLAYER_API_KEY`. Vite variables are exposed to the browser.

Then redeploy the site.

## Behaviour

- Valid email: signup continues.
- Disposable email: signup is rejected.
- Invalid/MX-failing email: signup is rejected.
- Typo suggestion: customer is asked to correct it.
- Mailboxlayer outage/quota/API error: signup is allowed to continue so a third-party validator cannot take down account creation. Supabase email confirmation remains the final ownership check.

## Security

The API key must remain server-side. Do not commit the key to GitHub or place it in `.env.production`.

Because an API key was previously pasted into a chat, rotate/regenerate that key in the Mailboxlayer dashboard before production use.
