# Directus Password Reset Configuration

## Required Configuration

To enable password reset emails in Directus, you need to configure the following environment variables in your Directus `.env` file:

### 1. Email Configuration

```env
# Email Transport (for Gmail)
EMAIL_TRANSPORT=smtp
EMAIL_FROM=your-email@gmail.com
EMAIL_SMTP_HOST=smtp.gmail.com
EMAIL_SMTP_PORT=587
EMAIL_SMTP_USER=your-email@gmail.com
EMAIL_SMTP_PASSWORD=your-app-password
EMAIL_SMTP_SECURE=false

# For other email providers, adjust the SMTP settings accordingly
```

### 2. Password Reset URL Configuration

```env
# Allow password reset from your frontend URL
PASSWORD_RESET_URL_ALLOW_LIST=http://localhost:5173/reset-password,http://yourdomain.com/reset-password

# Or use PUBLIC_URL (Directus will use this + /admin/reset-password)
PUBLIC_URL=http://localhost:8055
```

### 3. Gmail App Password Setup (if using Gmail)

1. Go to your Google Account settings
2. Enable 2-Factor Authentication
3. Go to Security → 2-Step Verification → App passwords
4. Generate a new app password for "Mail"
5. Use this password in `EMAIL_SMTP_PASSWORD` (not your regular Gmail password)

### 4. Alternative Email Providers

#### SendGrid
```env
EMAIL_TRANSPORT=sendgrid
EMAIL_FROM=your-email@domain.com
EMAIL_SENDGRID_API_KEY=your-sendgrid-api-key
```

#### Mailgun
```env
EMAIL_TRANSPORT=mailgun
EMAIL_FROM=your-email@domain.com
EMAIL_MAILGUN_API_KEY=your-mailgun-api-key
EMAIL_MAILGUN_DOMAIN=your-domain.com
```

## Testing

After configuration, restart Directus:

```bash
# Stop Directus
# Update .env file with email settings
# Restart Directus
```

Test the password reset:

```bash
curl -X POST http://0.0.0.0:8055/auth/password/request \
  -H "Content-Type: application/json" \
  -d '{"email":"existing-user@example.com","reset_url":"http://localhost:5173/reset-password"}'
```

Should return:
- **204 No Content** = Success, email sent
- **400 Bad Request** = Email not configured or URL not allowed
- **422 Unprocessable Entity** = Email doesn't exist (but for security, Directus might still return 204)

## Frontend Implementation

The reset password flow:

1. **Request Reset** (`/auth/password/request`):
   - User enters email
   - Directus sends email with reset token
   - Returns 204 No Content

2. **Reset Password** (`/auth/password/reset`):
   - User clicks link in email → redirected to frontend with token
   - User enters new password
   - Frontend sends token + new password to Directus
   - Returns 204 No Content on success

## Current Status

✅ Frontend code updated to handle 204 No Content responses
⚠️ Need to configure Directus email settings
⚠️ Need to add PASSWORD_RESET_URL_ALLOW_LIST to Directus .env

## Next Steps

1. Configure email transport in Directus `.env`
2. Add `PASSWORD_RESET_URL_ALLOW_LIST=http://localhost:5173/reset-password`
3. Restart Directus
4. Create reset password page component
5. Test the complete flow
