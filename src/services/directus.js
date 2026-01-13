import { createDirectus, rest, authentication } from '@directus/sdk';

// Use proxy in development, direct URL in production
const baseUrl = import.meta.env.DEV ? 'https://westeastfreight.com/' : 'https://admin.westeastfreight.com/';

const directus = createDirectus(baseUrl)
    .with(rest())
    .with(authentication('json'));

export default directus;
