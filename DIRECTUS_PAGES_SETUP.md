# Directus Pages Setup Guide

## Pages Collection Structure

ဒီ structure အတိုင်း Directus မှာ pages collection ကို setup လုပ်ပါ:

### Required Fields:

1. **id** (Primary Key)
   - Type: UUID or Integer

2. **title** (String)
   - Required: Yes
   - Interface: Input

3. **permalink** (String)
   - Required: Yes
   - Unique: Yes
   - Interface: Input
   - Example: `/`, `/about`, `/contact`, `/services`, `/services/ocean-freight`

4. **parent_page** (Many-to-One)
   - Type: Relation to pages collection (self-reference)
   - Required: No
   - Interface: Dropdown
   - Use this for nested pages (service sub-pages, blog posts, etc.)

5. **status** (String)
   - Type: Dropdown
   - Options: published, draft, archived
   - Default: draft

6. **sort** (Integer)
   - Type: Number
   - For menu ordering

7. **blocks** (Many-to-Any - M2A)
   - Relation to multiple block collections
   - Already configured

8. **translations** (One-to-Many)
   - Relation to pages_translations
   - Fields: title, meta_title, meta_description, etc.

## Example Pages Setup:

### 1. Home Page
```
title: Home
permalink: /
parent_page: null
status: published
sort: 1
```

### 2. About Page
```
title: About Us
permalink: /about
parent_page: null
status: published
sort: 2
```

### 3. Contact Page
```
title: Contact
permalink: /contact
parent_page: null
status: published
sort: 3
```

### 4. Services Parent Page
```
title: Services
permalink: /services
parent_page: null
status: published
sort: 4
```

### 5. Ocean Freight (Sub-service)
```
title: Ocean Freight
permalink: /services/ocean-freight
parent_page: [ID of Services page]
status: published
sort: 1
```

### 6. Air Freight (Sub-service)
```
title: Air Freight
permalink: /services/air-freight
parent_page: [ID of Services page]
status: published
sort: 2
```

### 7. Blog Parent Page
```
title: Blog
permalink: /blog
parent_page: null
status: published
sort: 5
```

### 8. Blog Post 1 (Sub-blog)
```
title: Shipping Industry Updates
permalink: /blog/shipping-updates
parent_page: [ID of Blog page]
status: published
sort: 1
```

### 9. Third Level Page (Deep nested)
```
title: Special Ocean Services
permalink: /services/ocean-freight/special-services
parent_page: [ID of Ocean Freight page]
status: published
sort: 1
```

## How It Works:

1. **Dynamic Routes**: Router သည် /:slug, /:parent/:slug, /:parent/:child/:slug အတိုင်း handle လုပ်ပါမယ်

2. **Permalink Matching**: Page component က route.path ကို Directus permalink နဲ့ match လုပ်ပြီး blocks တွေ fetch လုပ်ပါမယ်

3. **Automatic Navigation**: Header component က pages ကို fetch လုပ်ပြီး menu structure build လုပ်နိုင်ပါတယ်

## Next Steps:

1. Directus မှာ pages collection ကို ဒီ structure အတိုင်း setup လုပ်ပါ
2. Example pages တွေ create လုပ်ပါ
3. Each page မှာ blocks တွေ assign လုပ်ပါ
4. Header component ကို update လုပ်ပြီး dynamic menu ပြပါ

## Benefits: