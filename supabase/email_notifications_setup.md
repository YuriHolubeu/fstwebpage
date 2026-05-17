# Email notifications for subscription signups

Notifications are sent to:

```text
focus.structure.tool@gmail.com
```

The frontend calls this Supabase Edge Function after saving a signup:

```text
send-signup-notification
```

## 1. Create a Resend API key

1. Open https://resend.com
2. Create or open your account.
3. Go to API Keys.
4. Create an API key.
5. Copy the key. It starts with `re_`.

For quick testing, `onboarding@resend.dev` is used as the sender. For production, verify your own domain in Resend and replace the `from` email in:

```text
supabase/functions/send-signup-notification/index.ts
```

## 2. Install Supabase CLI if needed

```bash
brew install supabase/tap/supabase
```

Then login:

```bash
supabase login
```

## 3. Link the local project

```bash
supabase link --project-ref xlgiwuqgjcefpamjulsp
```

## 4. Add secrets

```bash
supabase secrets set RESEND_API_KEY=your_resend_api_key_here
supabase secrets set NOTIFICATION_EMAIL=focus.structure.tool@gmail.com
```

## 5. Deploy the Edge Function

```bash
supabase functions deploy send-signup-notification
```

## 6. Test from the site

1. Run the app locally.
2. Open the Contact us form.
3. Fill the email and select one or more subscription options.
4. Submit.
5. Check `focus.structure.tool@gmail.com`.

The function also understands Supabase Database Webhook payloads for these tables:

```text
waitlist_subscriptions
vip_subscription_requests
newsletter_subscriptions
```
