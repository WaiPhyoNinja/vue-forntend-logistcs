# Vue 3 Project Setup Guide

## Project Structure

This Vue 3 project has been successfully set up with the following structure:

```
vue-west/
├── index.html              # Main HTML entry point (simplified for Vue mounting)
├── index-backup.html       # Backup of original HTML
├── src/
│   ├── App.vue            # Root component with RouterView
│   ├── main.js            # Vue app initialization
│   ├── components/
│   │   ├── index.vue      # Home page component with Header & Footer
│   │   ├── Chat.vue       # Chat component
│   │   └── HelloWorld.vue # Example component
│   ├── layouts/
│   │   ├── Header.vue     # Header component with navigation
│   │   └── Footer.vue     # Footer component
│   ├── Router/
│   │   └── router.js      # Vue Router configuration
│   └── assets/            # CSS, JS, fonts, images
```

## Key Features

### 1. **index.html**
- Simplified HTML file with just the `#app` mount point
- All CSS and JavaScript libraries are loaded
- Vue will mount the entire application here

### 2. **App.vue**
- Root component that renders `<RouterView>` for page navigation
- Includes the `Chat` component globally

### 3. **Header.vue** (`src/layouts/Header.vue`)
- Complete header with navigation menu
- Uses `<router-link>` for Vue Router navigation
- Responsive mobile menu support

### 4. **Footer.vue** (`src/layouts/Footer.vue`)
- Newsletter subscription form
- Footer links and social media icons
- Contact information
- Uses `<router-link>` for internal navigation

### 5. **index.vue** (`src/components/index.vue`)
- Home page component
- Includes Header and Footer components
- Contains hero section, about section, and services section

### 6. **Vue Router** (`src/Router/router.js`)
- Configured with home route (`/`)
- Ready to add more routes (About, Contact, etc.)
- Includes scroll behavior for smooth navigation

## Running the Project

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

The development server will start at `http://localhost:5173` (or another port if 5173 is in use).

## Adding New Pages

To add a new page:

1. Create a new component in `src/components/` (e.g., `About.vue`)
2. Add the route in `src/Router/router.js`:

```javascript
{
  path: '/about',
  name: 'About',
  component: () => import('../components/About.vue')
}
```

3. Update navigation links in `Header.vue`:

```vue
<router-link to="/about">About</router-link>
```

## Template Structure for New Pages

When creating new pages, use this structure:

```vue
<script setup>
import Footer from '../layouts/Footer.vue';
import Header from '../layouts/Header.vue';
</script>

<template>
    <div class="page-wrapper">
        <Header />
        
        <!-- Your page content here -->
        <div class="main-content">
            <h1>Your Content</h1>
        </div>
        
        <Footer />
    </div>
</template>

<style scoped>
/* Your page-specific styles */
</style>
```

## Libraries and Assets

All original CSS, JavaScript libraries, and assets are preserved in `src/assets/`:
- Bootstrap, jQuery, and various plugins are loaded in `index.html`
- Custom styles available in `src/assets/css/`
- Icons and fonts in `src/assets/fonts/`

## Notes

- The original full HTML content is backed up in `index-backup.html`
- The project uses Vue 3 Composition API (`<script setup>`)
- Router links use `<router-link>` instead of `<a>` tags for SPA navigation
- All external resources (images from dreamlayout.mnsithub.com) are still referenced

## Next Steps

1. ✅ Create additional page components (About, Contact, Services, etc.)
2. ✅ Extract common sections into reusable components
3. ✅ Add API integration for forms
4. ✅ Implement proper state management if needed (Pinia)
5. ✅ Add authentication/authorization if required
