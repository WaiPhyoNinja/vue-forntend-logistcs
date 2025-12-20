import { createDirectus, rest } from '@directus/sdk';

// Use proxy in development, direct URL in production
const baseUrl = import.meta.env.DEV ? 'http://localhost:5174/api' : 'http://0.0.0.0:8055';

const directus = createDirectus(baseUrl).with(rest());

export default directus;