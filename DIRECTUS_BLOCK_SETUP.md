# Directus Block System Setup Guide

## Overview
This guide explains how to set up a reusable block system in Directus for your Vue.js application.

## Collections Structure

### 1. Pages Collection (`pages`)
Main collection for managing pages.

**Fields:**
- `id` (UUID, Primary Key)
- `title` (String) - Page title
- `permalink` (String) - URL path (e.g., "/", "/about")
- `status` (String) - published/draft
- `published_at` (DateTime)
- `seo` (JSON) - SEO metadata
  ```json
  {
    "title": "Page Title",
    "meta_description": "Description",
    "og_image": "image-id.png",
    "no_index": false
  }
  ```
- `blocks` (Many-to-Any) - Related blocks

### 2. Block Collections

#### a. `block_masthead`
Hero/Banner section at the top of pages.

**Fields:**
- `id` (UUID, Primary Key)
- `status` (String) - published/draft
- `subtitle` (String) - Small text above title
- `title_part1` (String) - Main title
- `typed_words` (String) - Comma-separated words for typing effect
- `typed_default` (String) - Default word to show
- `description` (Text) - Main description
- `button_text` (String) - CTA button text
- `button_link` (String) - CTA button URL
- `main_image` (File/Image) - Main hero image
- `background_pattern` (File/Image) - Background pattern image
- `shape_image` (File/Image) - Decorative shape image
- `translations` (One-to-Many) - Related translations

**Translation Fields:**
- `languages_code` (en-US, mm, th)
- `subtitle` (String)
- `title_part1` (String)
- `typed_words` (String)
- `typed_default` (String)
- `description` (Text)
- `button_text` (String)

#### b. `block_hero`
Simple hero section.

**Fields:**
- `id` (UUID, Primary Key)
- `status` (String)
- `title` (String)
- `description` (Text)
- `button_text` (String)
- `button_link` (String)
- `image` (File/Image)
- `translations` (One-to-Many)

#### c. `block_content`
Rich text content block.

**Fields:**
- `id` (UUID, Primary Key)
- `status` (String)
- `heading` (String)
- `content` (WYSIWYG/HTML)
- `translations` (One-to-Many)

#### d. `block_features`
Features/Services grid section.

**Fields:**
- `id` (UUID, Primary Key)
- `status` (String)
- `title` (String)
- `subtitle` (String)
- `features` (JSON) - Array of features
  ```json
  [
    {
      "icon": "icon-class-name",
      "title": "Feature Title",
      "description": "Feature description"
    }
  ]
  ```
- `translations` (One-to-Many)

#### e. `block_cta`
Call-to-action section.

**Fields:**
- `id` (UUID, Primary Key)
- `status` (String)
- `title` (String)
- `description` (Text)
- `button_text` (String)
- `button_link` (String)
- `background_color` (String) - Hex color
- `translations` (One-to-Many)

### 3. Pages-Blocks Relationship

Setup Many-to-Any (M2A) relationship:
1. In `pages` collection, add field `blocks`
2. Field Type: Many to Any (M2A)
3. Related Collections: Select all block collections
   - block_masthead
   - block_hero
   - block_content
   - block_features
   - block_cta

## Usage in Vue.js

### 1. Create a Page in Directus

1. Go to Pages collection
2. Create new page:
   ```
   Title: Home
   Permalink: /
   Status: published
   ```

3. Add blocks:
   - Click "Add Block"
   - Select block type (e.g., block_masthead)
   - Fill in the content
   - Add translations for each language

### 2. Access in Vue Component

```vue
<script setup>
import { useBlocks } from '@/composables/useBlocks';
import BlockRenderer from '@/components/BlockRenderer.vue';

const { blocks, loading, fetchPageBlocks } = useBlocks();

onMounted(async () => {
  await fetchPageBlocks('/'); // Fetch home page
});
</script>

<template>
  <BlockRenderer :blocks="blocks" />
</template>
```

## Example Directus Data

### Home Page with Masthead Block

```json
{
  "id": "uuid-here",
  "title": "Home",
  "permalink": "/",
  "status": "published",
  "blocks": [
    {
      "collection": "block_masthead",
      "item": {
        "id": "block-uuid",
        "subtitle": "Specialist In Modern Transportation",
        "title_part1": "Modern Logistic",
        "typed_words": "Transport, Provider, Services",
        "typed_default": "Provider",
        "description": "Logistic service provider company plays a pivotal role in the global supply chain ecosystem managing.",
        "button_text": "Discover More",
        "button_link": "/about",
        "main_image": "image-uuid.png",
        "translations": [
          {
            "languages_code": "mm",
            "subtitle": "ခေတ်မီ သယ်ယူပို့ဆောင်ရေး ကျွမ်းကျင်သူ",
            "title_part1": "ခေတ်မီ ပို့ဆောင်ရေး",
            "typed_words": "သယ်ယူပို့ဆောင်ရေး, ဝန်ဆောင်မှုပေးသူ, ဝန်ဆောင်မှုများ",
            "typed_default": "ဝန်ဆောင်မှုပေးသူ",
            "description": "ပို့ဆောင်ရေး ဝန်ဆောင်မှုပေးသော ကုမ္ပဏီသည် ကမ္ဘာလုံးဆိုင်ရာ ထောက်ပံ့ရေးကွင်းဆက် စနစ်တွင် အဓိက အခန်းကဏ္ဍမှ ပါဝင်ပါသည်။",
            "button_text": "ပိုမိုလေ့လာရန်"
          }
        ]
      }
    }
  ]
}
```

## Adding New Block Types

1. Create new collection in Directus (e.g., `block_testimonials`)
2. Add fields for your block
3. Create Vue component in `src/components/blocks/TestimonialsBlock.vue`
4. Register in `BlockRenderer.vue`:
   ```javascript
   const blockComponents = {
     // ... existing blocks
     'block_testimonials': defineAsyncComponent(() => import('./blocks/TestimonialsBlock.vue'))
   };
   ```

## Benefits

✅ Reusable blocks across multiple pages
✅ Multilingual support built-in
✅ Easy content management in Directus
✅ Flexible page building
✅ Type-safe with proper data structure
✅ SEO-friendly with metadata support
✅ Dynamic routing based on permalink

## Tips

- Keep block components simple and focused
- Use translations for all user-facing text
- Cache block data for better performance
- Use proper image optimization
- Test blocks in all languages before publishing
