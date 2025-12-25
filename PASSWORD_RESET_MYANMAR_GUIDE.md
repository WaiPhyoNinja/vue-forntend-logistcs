# Password Reset လုပ်ဆောင်ချက် - Myanmar Guide

## ပြုပြင်ပြီးသော အချက်များ

### ✅ 1. JSON Parse Error ပြင်ဆင်ပြီး
**ပြဿနာ**: "Failed to execute 'json' on 'Response': Unexpected end of JSON input"

**အကြောင်းရင်း**: Directus က password reset request အောင်မြင်ရင် 204 No Content response ပြန်ပေးတယ် (JSON body မပါဘူး)။ ကုဒ်က JSON parse လုပ်ဖို့ ကြိုးစားလို့ error တက်တယ်။

**ဖြေရှင်းချက်**: 
- `requestPasswordReset` function မှာ response.ok ကို စစ်ပြီးမှ JSON parse လုပ်အောင် ပြင်ထားပြီ
- `resetPassword` function မှာလည်း အတူတူ ပြင်ထားပြီ

### ✅ 2. Reset Password Page ထည့်သွင်းပြီး
**အသစ်ဖန်တီးထားသော Files**:
- `/src/components/ResetPassword.vue` - Password reset form page
- `/src/Router/router.js` - `/reset-password` route ထည့်သွင်းပြီး

### ✅ 3. Email ပို့ဖို့ အဆင်သင့်ဖြစ်ပြီ
Password reset function များ 204 response ကို မှန်မှန်ကန်ကန် handle လုပ်နိုင်ပြီ။

---

## Directus Configuration လုပ်ရမည့် အဆင့်များ

### အဆင့် 1: Directus .env File ကို ပြင်ဆင်ပါ

Directus project folder ထဲက `.env` file ကို ဖွင့်ပြီး အောက်ပါ settings များ ထည့်ပေးပါ:

```env
# Password Reset URL ခွင့်ပြုချက်
PASSWORD_RESET_URL_ALLOW_LIST=http://localhost:5173/reset-password,http://yourdomain.com/reset-password

# Email Configuration (Gmail အတွက်)
EMAIL_TRANSPORT=smtp
EMAIL_FROM=youremail@gmail.com
EMAIL_SMTP_HOST=smtp.gmail.com
EMAIL_SMTP_PORT=587
EMAIL_SMTP_USER=youremail@gmail.com
EMAIL_SMTP_PASSWORD=your-app-password-here
EMAIL_SMTP_SECURE=false
```

### အဆင့် 2: Gmail App Password ရယူပါ (Gmail သုံးမယ်ဆိုရင်)

1. Google Account Settings ကို သွားပါ
2. Security → 2-Step Verification ကို ဖွင့်ပါ
3. App Passwords သို့သွားပါ
4. "Mail" အတွက် app password အသစ် generate လုပ်ပါ
5. ထွက်လာတဲ့ password ကို `EMAIL_SMTP_PASSWORD` မှာ ထည့်ပါ (သင့် Gmail password မဟုတ်ပါ)

**မှတ်ချက်**: App password format က `xxxx xxxx xxxx xxxx` ဖြစ်ပါတယ်။ Space မပါအောင် ဖြုတ်ပြီး ထည့်ပေးပါ: `xxxxxxxxxxxxxxxx`

### အဆင့် 3: Email Provider အခြား (SendGrid, Mailgun) သုံးမယ်ဆိုရင်

#### SendGrid အတွက်:
```env
EMAIL_TRANSPORT=sendgrid
EMAIL_FROM=youremail@domain.com
EMAIL_SENDGRID_API_KEY=SG.xxxxxxxxxxxxx
```

#### Mailgun အတွက်:
```env
EMAIL_TRANSPORT=mailgun
EMAIL_FROM=youremail@domain.com
EMAIL_MAILGUN_API_KEY=key-xxxxxxxxxxxxx
EMAIL_MAILGUN_DOMAIN=mg.yourdomain.com
```

### အဆင့် 4: Directus ကို Restart လုပ်ပါ

```bash
# Directus ကို ပိုင်းပါ
# .env file ကို သိမ်းပါ
# Directus ကို ပြန်ဖွင့်ပါ

# Docker သုံးထားရင်:
docker-compose restart

# npx သုံးထားရင်:
# Terminal မှာ Ctrl+C နှိပ်ပြီး
npx directus start
```

---

## အသုံးပြုနည်း

### 1. Frontend မှ Password Reset တောင်းခံခြင်း

```javascript
// User က forgot password link ကို နှိပ်လိုက်ရင်
// Login.vue မှာ showForgotPassword() function က
// Email input ပြပြီး requestPasswordReset() ကို ခေါ်ပါမယ်

const result = await requestPasswordReset('user@example.com');

// အောင်မြင်ရင် user email ကို reset link ပါတဲ့ email ပို့ပေးမယ်
```

### 2. Email ထဲက Link ကို နှိပ်ခြင်း

User က email ထဲက link ကို နှိပ်လိုက်ရင်:
```
http://localhost:5173/reset-password?token=xxxxx-xxxxx-xxxxx
```

### 3. Password အသစ် ထည့်ခြင်း

ResetPassword.vue page က:
- Password အသစ် ထည့်ပါ (အနည်းဆုံး 8 လုံး)
- Password confirm ပြန်ထည့်ပါ
- Reset Password button နှိပ်ပါ

### 4. အောင်မြင်ခြင်း

Password reset အောင်မြင်ရင် home page ကို အလိုအလျောက် ပြန်ပို့ပေးပါမယ်။

---

## Testing လုပ်နည်း

### Terminal မှ Test လုပ်ခြင်း:

```bash
# Password reset request ပို့ကြည့်ပါ
curl -X POST http://0.0.0.0:8055/auth/password/request \
  -H "Content-Type: application/json" \
  -d '{"email":"existing-user@example.com","reset_url":"http://localhost:5173/reset-password"}'

# အောင်မြင်ရင် ဘာမှ မပြပဲ HTTP 204 No Content ပြန်လာမယ်
# Email ပို့သွားပြီဆိုတာ ဖြစ်ပါတယ်
```

### Frontend မှ Test လုပ်ခြင်း:

1. http://localhost:5173/login ကို သွားပါ
2. "Forget Password?" link ကို နှိပ်ပါ
3. Email address ထည့်ပါ
4. Submit နှိပ်ပါ
5. Success message ပေါ်လာရင် email ကို သွားစစ်ပါ
6. Email ထဲက reset link ကို နှိပ်ပါ
7. Password အသစ် ထည့်ပါ
8. Submit လုပ်ပါ

---

## အောင်မြင်မှု စစ်ဆေးခြင်း

### ✅ Email ပို့ပြီးကြောင်း စစ်ခြင်း:
- User email inbox ကို စစ်ပါ
- Spam folder မှာလည်း ကြည့်ပါ
- Subject: "Password Reset" (သို့) Directus မှာ သတ်မှတ်ထားတဲ့ subject

### ✅ Password Reset အောင်မြင်ကြောင်း စစ်ခြင်း:
- Password အသစ်နဲ့ login ဝင်ကြည့်ပါ
- Directus admin panel ကို သွားပြီး user ကို စစ်ကြည့်ပါ

### ❌ အလုပ်မလုပ်ရင် စစ်ဆေးရမည့် အချက်များ:

1. **Email မရောက်ရင်**:
   - Directus console/logs ကို စစ်ပါ
   - Email credentials မှန်/မမှန် စစ်ပါ
   - Gmail မှာ "Less secure app access" ဖွင့်ထားရပါမယ် (သို့) App Password သုံးပါ

2. **"URL can't be used" error**:
   - `PASSWORD_RESET_URL_ALLOW_LIST` မှာ URL မှန်/မမှန် စစ်ပါ
   - Directus restart လုပ်ပြီးပြီလား စစ်ပါ

3. **"Invalid token" error**:
   - Reset link က expire ဖြစ်နေပြီလား စစ်ပါ (အများအားဖြင့် 1 နာရီ valid ဖြစ်ပါတယ်)
   - Token မှန်/မမှန် စစ်ပါ

---

## လက်ရှိ Status

✅ **ပြီးသား**:
- JSON parse error ပြင်ပြီး
- Password reset request function အလုပ်လုပ်ပြီး (204 response handle လုပ်နိုင်ပြီ)
- Password reset function အလုပ်လုပ်ပြီး (204 response handle လုပ်နိုင်ပြီ)
- ResetPassword page component ဖန်တီးပြီး
- Router မှာ /reset-password route ထည့်ပြီး

⚠️ **လုပ်ဆောင်ရန်ကျန်သေးသော**:
- Directus .env မှာ email configuration ထည့်ရန်
- PASSWORD_RESET_URL_ALLOW_LIST ထည့်ရန်
- Directus ကို restart လုပ်ရန်
- Test လုပ်ကြည့်ရန်

---

## နောက်ထပ် လုပ်ဆောင်နိုင်သော အချက်များ

1. **Email Template Customization**:
   - Directus admin → Settings → Email Templates
   - Myanmar language support ထည့်နိုင်ပါတယ်

2. **Token Expiry Time**:
   - Default: 1 hour
   - `.env` မှာ `PASSWORD_RESET_TOKEN_TTL=3600000` (milliseconds)

3. **Email Verification**:
   - User registration အချိန်မှာ email verify လုပ်ချင်ရင်
   - `PUBLIC_REGISTRATION_VERIFY_EMAIL=true` ထည့်ပါ

---

## အကူအညီ လိုအပ်ရင်

မေးခွန်း ရှိရင် documentation ကို ဖတ်ပါ:
- Directus Email: https://docs.directus.io/self-hosted/config-options.html#email
- Password Reset: https://docs.directus.io/reference/authentication.html#request-password-reset

သို့မဟုတ် error message ကို ပြပြီး မေးနိုင်ပါတယ်။
