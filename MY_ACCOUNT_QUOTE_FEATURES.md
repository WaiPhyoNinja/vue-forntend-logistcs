# My Account Quote Request Features

## Overview
The My Account page now displays quote requests with full multi-language support and PDF download functionality for approved quotes.

## Features Implemented

### 1. Multi-Language Support
All quote request displays are now translated in three languages:
- **English (en-US)**
- **Myanmar (mm)**
- **Thai (th)**

#### Translation Keys Added to `/src/locales/auth.js`:

```javascript
// Quote Details
quoteRequests: 'Quote Requests',
loadingQuotes: 'Loading quote requests...',
noQuotesFound: 'No quote requests found',
requestQuote: 'Request a Quote',
viewDetails: 'View Details',
downloadPDF: 'Download PDF',
shipmentDetails: 'Shipment Details',
fromSender: 'From (Sender)',
toReceiver: 'To (Receiver)',
packageInfo: 'Package Information',
name: 'Name',
company: 'Company',
phone: 'Phone',
address: 'Address',
type: 'Type',
service: 'Service',
weight: 'Weight',
dimensions: 'Dimensions',
quantity: 'Quantity',
declaredValue: 'Declared Value',
insurance: 'Insurance',
description: 'Description',
specialInstructions: 'Special Instructions',
yes: 'Yes',
no: 'No',
close: 'Close',
from: 'From',
to: 'To'
```

### 2. Quote Request Display

#### Features:
- **Loading State**: Shows spinner while fetching quotes
- **Empty State**: Displays when no quotes exist with "Request a Quote" button
- **Quote Cards**: Beautiful card design with:
  - Quote ID (first 8 characters)
  - Status badge (color-coded)
  - Date created
  - Route visualization (From → To)
  - Shipment details (type, service, weight, quantity)
  - Action buttons

#### Status Badge Colors:
- **Pending**: Yellow/Amber (`#fbbf24`)
- **Reviewed**: Blue (`#60a5fa`)
- **Quoted**: Light Green (`#34d399`)
- **Approved**: Green (`#10b981`)
- **Rejected**: Red (`#f87171`)

### 3. View Details Modal

The "View Details" button opens a SweetAlert popup showing:

**Sender Information:**
- Name
- Company (if provided)
- Email
- Phone
- Full Address (street, city, state, country)

**Receiver Information:**
- Name
- Company (if provided)
- Email
- Phone
- Full Address (street, city, state, country)

**Package Information:**
- Shipment Type
- Service Type
- Weight (kg)
- Dimensions (L × W × H cm) - if provided
- Quantity
- Declared Value - if provided
- Insurance (Yes/No)
- Description
- Special Instructions - if provided

All labels are translated based on the current language setting.

### 4. PDF Download Feature

#### When Available:
- PDF download button only appears for quotes with `status === 'approved'`
- Button is green-colored to differentiate from the View Details button

#### PDF Contents:
The generated PDF includes:

**Header:**
- Title: "Shipment Quote"
- Quote ID
- Status
- Date Created

**Sender Section:**
- Complete sender information with address

**Receiver Section:**
- Complete receiver information with address

**Package Information:**
- All shipment details
- Special instructions (if any)

**Footer:**
- "This is a computer-generated document. No signature required."

#### PDF Styling:
- Professional layout
- Color-coded section headers (#e03e2d)
- Clear typography
- Proper spacing
- Auto-wrapping for long text

#### File Naming:
Downloaded PDF is named: `Quote_[QUOTE_ID].pdf`
Example: `Quote_a1b2c3d4.pdf`

## Technical Implementation

### Dependencies:
1. **jsPDF Library** (v2.5.1)
   - Added via CDN in `index.html`
   - Used for PDF generation

### Components Modified:
1. **`/src/locales/auth.js`**
   - Added 30+ new translation keys for all 3 languages

2. **`/src/components/MyAccount.vue`**
   - Updated template to use translations
   - Added `downloadPDF()` function
   - Updated `viewQuoteDetails()` to use translations
   - Added CSS for download button

3. **`/index.html`**
   - Added jsPDF library from CDN

### Key Functions:

#### `viewQuoteDetails(quote)`
- Accepts quote object
- Uses current language translations
- Displays detailed information in SweetAlert modal

#### `downloadPDF(quote)`
- Generates professional PDF document
- Includes all quote information
- Uses jsPDF library
- Handles errors gracefully
- Shows success/error messages

#### `formatDate(dateString)`
- Formats date for display
- Returns: "Mon DD, YYYY, HH:MM AM/PM"

## User Experience Flow

1. **Login** → Navigate to My Account
2. **Click "My Request Quote"** tab
3. **View Quote List**:
   - See all submitted quotes
   - Color-coded status badges
   - Quick overview of route and details
4. **Click "View Details"**:
   - Opens detailed modal
   - All information in current language
5. **Click "Download PDF"** (for approved quotes):
   - Generates PDF instantly
   - Downloads to user's device
   - Professional format ready for printing

## Responsive Design

- **Desktop**: Side-by-side route display
- **Mobile**: Stacked route display with rotated arrow
- **Quote Info Grid**: Adapts to screen size (2 columns on mobile)
- **Quote Header**: Stacks on mobile devices

## CSS Classes Added

```css
.btn-download-pdf - Green download button
.btn-download-pdf:hover - Hover effect with lift
```

## Error Handling

1. **Fetch Errors**: 
   - Catches and logs errors
   - Shows user-friendly error message
   - Skips error alert for 403 (permission) errors

2. **PDF Generation Errors**:
   - Catches generation failures
   - Alerts user if jsPDF is not loaded
   - Console logs error details

## Testing Checklist

- [ ] Quote requests load correctly
- [ ] Translations work in all 3 languages
- [ ] View Details shows all information
- [ ] Download PDF button only shows for approved quotes
- [ ] PDF downloads successfully
- [ ] PDF contains all correct information
- [ ] PDF formatting is professional
- [ ] Mobile responsive design works
- [ ] Status badges show correct colors
- [ ] Loading states display properly
- [ ] Empty state shows when no quotes exist

## Future Enhancements

Potential improvements:
1. Add quote price/cost when available
2. Email PDF functionality
3. Print quote directly
4. Quote tracking history
5. Quote cancellation feature
6. Quote amendment requests
7. Multiple PDF language support
8. Company logo in PDF header
9. Digital signature support
10. Quote expiration dates

## Notes

- PDF generation requires jsPDF library to be loaded
- Library is loaded via CDN (internet connection required)
- For offline usage, consider installing jsPDF via npm
- All translations are stored in `/src/locales/auth.js`
- Status field must match one of: pending, reviewed, quoted, approved, rejected
