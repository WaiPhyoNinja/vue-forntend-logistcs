# Vue West Logistics - Production Deployment Guide

## Environment Configuration

### Development Setup

1. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

2. Update `.env` with your local Directus URL:
```env
VITE_DIRECTUS_URL=http://0.0.0.0:8055
VITE_CUSTOMER_ROLE_UUID=your-customer-role-uuid
```

### Production Setup

1. Update `.env.production` with your production Directus URL:
```env
VITE_DIRECTUS_URL=https://your-production-domain.com
VITE_CUSTOMER_ROLE_UUID=your-customer-role-uuid
```

2. Build for production:
```bash
npm run build
```

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_DIRECTUS_URL` | Directus CMS backend URL | `https://api.yourdomain.com` |
| `VITE_CUSTOMER_ROLE_UUID` | Customer role UUID from Directus | Get from Directus Admin |

## Important Notes

- ✅ All static URLs have been replaced with environment variables
- ✅ `.env` files are ignored in git for security
- ✅ Use `.env.production` for production deployments
- ✅ Never commit sensitive credentials to git

## Deployment Checklist

- [ ] Update `VITE_DIRECTUS_URL` in `.env.production`
- [ ] Update `VITE_CUSTOMER_ROLE_UUID` in `.env.production`
- [ ] Run `npm run build`
- [ ] Deploy `dist` folder to your hosting
- [ ] Ensure CORS is configured in Directus for your production domain

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Modified Files

All files have been updated to use `import.meta.env.VITE_DIRECTUS_URL`:

- Components: ServiceDetails, MyAccount, RequestQuote
- Layouts: Header, Footer
- Blocks: ServiceImage, HeroBlock, FAQ, ProcessFlow, MastheadBlock, ContactCard, Info
- Other: MobileSlider

## Support

For issues, please check:
1. Environment variables are correctly set
2. Directus backend is accessible
3. CORS is configured properly
