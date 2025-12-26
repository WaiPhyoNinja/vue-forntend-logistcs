# Quick Setup Steps for Directus Quote Requests

## 1. Create the Collection

In Directus Admin (http://0.0.0.0:8055/admin):

**Settings → Data Model → Create Collection**

- Collection Name: `quote_requests`
- Primary Key Field: `id` (UUID)
- ✅ Enable "Archive" (soft delete)
- ✅ Enable "Sort" 
- ✅ Enable timestamps (date_created, date_updated)
- ✅ Enable user tracking (user_created, user_updated)

Click **"Finish Setup"**

## 2. Add Fields (Click on quote_requests collection)

### Sender Fields
```
Field Name: sender_first_name | Type: String | Required: Yes
Field Name: sender_last_name | Type: String | Required: Yes
Field Name: sender_company | Type: String | Required: No
Field Name: sender_email | Type: String | Required: Yes
Field Name: sender_phone | Type: String | Required: Yes
Field Name: sender_address | Type: Text | Required: Yes
Field Name: sender_city | Type: String | Required: Yes
Field Name: sender_state | Type: String | Required: Yes
Field Name: sender_country | Type: String | Required: Yes
Field Name: sender_postal_code | Type: String | Required: No
```

### Receiver Fields
```
Field Name: receiver_first_name | Type: String | Required: Yes
Field Name: receiver_last_name | Type: String | Required: Yes
Field Name: receiver_company | Type: String | Required: No
Field Name: receiver_email | Type: String | Required: Yes
Field Name: receiver_phone | Type: String | Required: Yes
Field Name: receiver_address | Type: Text | Required: Yes
Field Name: receiver_city | Type: String | Required: Yes
Field Name: receiver_state | Type: String | Required: Yes
Field Name: receiver_country | Type: String | Required: Yes
Field Name: receiver_postal_code | Type: String | Required: No
```

### Shipment Fields
```
Field Name: shipment_type | Type: String | Required: Yes
Field Name: service_type | Type: String | Required: Yes
Field Name: weight | Type: Float | Required: Yes
Field Name: length | Type: Float | Required: No
Field Name: width | Type: Float | Required: No
Field Name: height | Type: Float | Required: No
Field Name: quantity | Type: Integer | Required: Yes | Default: 1
Field Name: declared_value | Type: Float | Required: No
Field Name: description | Type: Text | Required: Yes
Field Name: special_instructions | Type: Text | Required: No
Field Name: insurance | Type: Boolean | Required: No | Default: false
Field Name: status | Type: String | Required: Yes | Default: "pending"
```

## 3. Set Permissions

**Settings → Roles & Permissions → Public**

For `quote_requests` collection:
- ✅ **Create** permission enabled
- Field Permissions: Set all fields to "Create" access

**Settings → Roles & Permissions → Administrator** (if you want authenticated users to create quotes)

For `quote_requests` collection:
- ✅ **Create** permission enabled
- ✅ **Read** permission enabled 
  - **How to add filter:**
    1. Click the Read checkbox
    2. Click the **filter icon** (sliders) next to Read
    3. Click **"Add Filter"**
    4. Field: Select **"User Created"**
    5. Operator: Select **"is"** (equals symbol =)
    6. Value: Select **"$CURRENT_USER"** (special variable)
    7. Save
  - This shows users only their own quotes
- Field Permissions: Full access

## 4. Test the Integration

1. Go to your frontend: http://localhost:5174
2. Fill out the Request Quote form
3. Click Submit
4. Check Directus Admin → Content → quote_requests
5. You should see your new quote request!

## Common Issues & Solutions

### 401 Unauthorized
- **Cause:** Collection doesn't exist or permissions not set
- **Fix:** Follow steps 1-3 above

### 403 Forbidden
- **Cause:** User role doesn't have create permission
- **Fix:** Check step 3, ensure Public role or user's role has Create permission

### Field validation errors
- **Cause:** Required fields missing or wrong data type
- **Fix:** Ensure all required fields are filled in the form

### CORS errors
- **Fix:** Add your frontend URL to CORS_ENABLED in Directus `.env` file:
  ```
  CORS_ENABLED=true
  CORS_ORIGIN=http://localhost:5174
  ```

## Verify Setup

Run this in browser console on your site:
```javascript
fetch('http://0.0.0.0:8055/items/quote_requests')
  .then(r => r.json())
  .then(data => console.log('Success:', data))
  .catch(e => console.error('Error:', e))
```

If you get data back, your collection is set up correctly!
