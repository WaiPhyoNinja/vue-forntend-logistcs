# Authentication Setup Guide

## ✅ လုပ်ပြီးသား Features:

### 1. Authentication Composable (`useAuth.js`)
- ✅ Login
- ✅ Register
- ✅ Logout
- ✅ Password Reset
- ✅ Get Current User
- ✅ JWT Token Management

### 2. Components Created:
- ✅ `Login.vue` - Login/Register Form
- ✅ `UserMenu.vue` - User dropdown menu

### 3. Router Guards:
- ✅ Protected routes (requiresAuth)
- ✅ Guest routes (requiresGuest)
- ✅ Auto redirect

## 📋 Directus Setup လုပ်ရမှာ:

### 1. Enable Public Registration

Directus Settings → Project Settings → Public:
```
Enable Public Registration: ✓
Default Role: Select "Customer" or create new role
```

### 2. Create Customer Role

Settings → Roles & Permissions → Create New Role:
```
Role Name: Customer
Admin Access: ✗
App Access: ✗
```

### 3. Set Permissions for Customer Role

**Collections Access:**
- `directus_users` (own records only):
  - Read: ✓ (own)
  - Update: ✓ (own)
  
- `pages`:
  - Read: ✓ (published only)
  
- `contact_us`:
  - Create: ✓
  - Read: ✓ (own records)
  - Update: ✓ (own records)

- Add other collections as needed

### 4. Email Configuration (for password reset)

Settings → Project Settings → Email:
```
Transport: SMTP
SMTP Host: smtp.gmail.com
SMTP Port: 587
SMTP User: your-email@gmail.com
SMTP Password: your-app-password
From Email: noreply@yoursite.com
From Name: Your Site Name
```

## 🔧 Header Integration:

Header.vue မှာ UserMenu component ထည့်ပါ:

```vue
<template>
  <header>
    <!-- Existing navigation -->
    
    <!-- Add User Menu -->
    <UserMenu />
  </header>
</template>

<script setup>
import UserMenu from '@/components/auth/UserMenu.vue';
</script>
```

## 📱 Usage Examples:

### Protected Page Example:
```javascript
// In router.js
{
  path: '/dashboard',
  name: 'Dashboard',
  component: Dashboard,
  meta: { requiresAuth: true } // Only logged in users
}
```

### Check Auth in Component:
```vue
<script setup>
import { useAuth } from '@/composables/useAuth';

const { user, isAuthenticated } = useAuth();
</script>

<template>
  <div v-if="isAuthenticated">
    Welcome, {{ user.first_name }}!
  </div>
</template>
```

### Custom Registration Fields:

Directus Users collection မှာ fields ထပ်တိုးလို့ ရပါတယ်:
- Phone Number
- Address
- Company Name
- etc.

Then update `useAuth.js` register function:
```javascript
const response = await directus.request(
  createUser({
    email: userData.email,
    password: userData.password,
    first_name: userData.firstName,
    last_name: userData.lastName,
    phone: userData.phone, // Custom field
    company: userData.company, // Custom field
    role: 'customer'
  })
);
```

## 🎯 Routes Available:

- `/login` - Login/Register page
- `/profile` - User profile (protected)
- `/orders` - User orders (protected)

## 🔐 Security Features:

✅ JWT Token stored in localStorage
✅ Auto token refresh
✅ Route guards
✅ Permission-based access
✅ Password encryption (Directus handles)
✅ CORS protection

## 📝 Next Steps:

1. Directus မှာ Customer role create လုပ်ပါ
2. Public registration enable လုပ်ပါ
3. Email settings configure လုပ်ပါ
4. Header.vue မှာ UserMenu component ထည့်ပါ
5. Test login/register functionality

## 💡 Additional Features (Optional):

- Social Login (Google, Facebook)
- Two-Factor Authentication
- Email Verification
- User Profile Page
- Order History
- Password Strength Meter
- Remember Me
- Session Timeout

အားလုံး အဆင်သင့်ပါပြီ! 🚀
