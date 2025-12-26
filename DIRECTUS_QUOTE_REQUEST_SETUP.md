# Directus Quote Request Setup Guide

## Step 1: Create Quote Requests Collection in Directus

1. **Log in to your Directus Admin Panel** (http://0.0.0.0:8055/admin)

2. **Navigate to Settings > Data Model**

3. **Create a new collection** named `quote_requests`

4. **Add the following fields:**

### Sender Information Fields
- `sender_first_name` - String (Interface: Input, Required)
- `sender_last_name` - String (Interface: Input, Required)
- `sender_company` - String (Interface: Input, Optional)
- `sender_email` - String (Interface: Input, Required, Validation: Email)
- `sender_phone` - String (Interface: Input, Required)
- `sender_address` - Text (Interface: Textarea, Required)
- `sender_city` - String (Interface: Input, Required)
- `sender_state` - String (Interface: Input, Required)
- `sender_country` - String (Interface: Dropdown, Required)
- `sender_postal_code` - String (Interface: Input, Optional)

### Receiver Information Fields
- `receiver_first_name` - String (Interface: Input, Required)
- `receiver_last_name` - String (Interface: Input, Required)
- `receiver_company` - String (Interface: Input, Optional)
- `receiver_email` - String (Interface: Input, Required, Validation: Email)
- `receiver_phone` - String (Interface: Input, Required)
- `receiver_address` - Text (Interface: Textarea, Required)
- `receiver_city` - String (Interface: Input, Required)
- `receiver_state` - String (Interface: Input, Required)
- `receiver_country` - String (Interface: Dropdown, Required)
- `receiver_postal_code` - String (Interface: Input, Optional)

### Shipment Information Fields
- `shipment_type` - String (Interface: Dropdown, Required)
  - Options: document, parcel, freight, express
- `service_type` - String (Interface: Dropdown, Required)
  - Options: standard, express, overnight, economy
- `weight` - Decimal (Interface: Input, Required)
- `length` - Decimal (Interface: Input, Optional)
- `width` - Decimal (Interface: Input, Optional)
- `height` - Decimal (Interface: Input, Optional)
- `quantity` - Integer (Interface: Input, Required, Default: 1)
- `declared_value` - Decimal (Interface: Input, Optional)
- `description` - Text (Interface: Textarea, Required)
- `special_instructions` - Text (Interface: Textarea, Optional)
- `insurance` - Boolean (Interface: Toggle, Default: false)

### System Fields (Auto-generated)
- `id` - UUID (Primary Key)
- `status` - String (Interface: Dropdown, Default: 'pending')
  - Options: pending, reviewed, quoted, approved, rejected
- `date_created` - Timestamp (Auto-generated)
- `date_updated` - Timestamp (Auto-updated)
- `user_created` - Many-to-One (directus_users)
- `user_updated` - Many-to-One (directus_users)

## Step 2: Set Permissions

1. **Navigate to Settings > Roles & Permissions**

2. **For "Public" role** (if allowing non-authenticated users):
   - quote_requests: Create only
   - Enable: Create permission
   - Field permissions: All fields writable

3. **For authenticated users**:
   - quote_requests: Create, Read (own records)
   - Enable: Create and Read permissions
   - **To set the filter for Read permission:**
     1. Click on the **Read** checkbox to enable it
     2. Click the **icon with sliders/settings** next to "Read" (Filter icon)
     3. In the filter dialog, click **"Add Filter"**
     4. Select field: **"User Created"** from dropdown
     5. Select operator: **"is"** (equals)
     6. Select value: **"$CURRENT_USER"** (this is a dynamic variable)
     7. Click **"Save"**
   - This ensures users can only see their own quote requests

### Visual Guide for Setting Filter:

```
Permissions Panel:
┌─────────────────────────────────────┐
│ Collection: quote_requests          │
├─────────────────────────────────────┤
│ ☐ Create  ☑ Read  ☐ Update  ☐ Delete│
│           [⚙️] ← Click this icon     │
└─────────────────────────────────────┘

Filter Dialog:
┌─────────────────────────────────────┐
│ Item Permissions                     │
├─────────────────────────────────────┤
│ [+ Add Filter]                       │
│                                      │
│ ┌─────────────────────────────────┐ │
│ │ User Created                    │ │ ← Select this field
│ │ [▼]                             │ │
│ └─────────────────────────────────┘ │
│                                      │
│ ┌─────────────────────────────────┐ │
│ │ is                              │ │ ← Select operator
│ │ [▼]                             │ │
│ └─────────────────────────────────┘ │
│                                      │
│ ┌─────────────────────────────────┐ │
│ │ $CURRENT_USER                   │ │ ← Select this value
│ │ [▼]                             │ │
│ └─────────────────────────────────┘ │
│                                      │
│           [Cancel]  [Save]           │
└─────────────────────────────────────┘
```

## Step 3: API Configuration

The collection will be accessible at:
- **Create:** `POST http://0.0.0.0:8055/items/quote_requests`
- **Read:** `GET http://0.0.0.0:8055/items/quote_requests`
- **Update:** `PATCH http://0.0.0.0:8055/items/quote_requests/:id`

## Step 4: Frontend Integration

The frontend code has been updated to:
1. Import Directus SDK with authentication
2. Submit quote requests to Directus
3. Handle authentication tokens
4. Display success/error messages

## Troubleshooting 401 Errors

If you get 401 (Unauthorized) errors:

1. **Check if the collection exists** in Directus
2. **Verify permissions** are set correctly for the user role
3. **Ensure authentication token** is valid in localStorage
4. **Check CORS settings** in Directus if making cross-origin requests
5. **Verify the user is logged in** before submitting

## Testing

1. Fill out the quote request form
2. Submit the form
3. Check Directus admin panel under "Quote Requests" collection
4. Verify all data is saved correctly
