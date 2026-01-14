import { createDirectus, rest, authentication } from '@directus/sdk';

// Use environment variable with fallback
const baseUrl = import.meta.env.VITE_DIRECTUS_URL || 'http://0.0.0.0:8055';

const directus = createDirectus(baseUrl)
    .with(rest())
    .with(authentication('json'));

export default directus;
