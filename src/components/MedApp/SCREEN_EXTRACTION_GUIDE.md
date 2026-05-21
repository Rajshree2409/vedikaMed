# Screen Extraction Guide

This document provides exact line numbers for each screen component in `screens.js` to help with extraction.

## Screen Components and Their Boundaries

All screens are currently in: `src/components/MedApp/screens.js`

| # | Screen Name | Start Line | Est. End Line | Est. Lines | Priority |
|---|-------------|-----------|--------------|-----------|----------|
| 1 | LoginScreen | 489 | 576 | ~88 | HIGH |
| 2 | OtpScreen | 577 | 717 | ~141 | HIGH |
| 3 | HomeScreen | 718 | 2302 | ~1585 | HIGH |
| 4 | DoctorAppointmentsScreen | 2303 | 2495 | ~193 | MEDIUM |
| 5 | DoctorAppointmentScreen | 2496 | 2923 | ~428 | MEDIUM |
| 6 | ProfileScreen | 2924 | 3097 | ~174 | MEDIUM |
| 7 | ProfileEditScreen | 3098 | 3261 | ~164 | MEDIUM |
| 8 | AccountsScreen | 3262 | 3395 | ~134 | LOW |
| 9 | AddAddressScreen | 3396 | 3606 | ~211 | MEDIUM |
| 10 | LogoutScreen | 3607 | 3629 | ~23 | LOW |
| 11 | RetailerScreen | 3630 | 4137 | ~508 | MEDIUM |
| 12 | LabTestScreen | 4138 | 4722 | ~585 | HIGH |
| 13 | WalletScreen | 4723 | 4938 | ~216 | MEDIUM |
| 14 | SearchScreen | 4939 | 5111 | ~173 | HIGH |
| 15 | OrdersScreen | 5112 | 5232 | ~121 | MEDIUM |
| 16 | ProductListScreen | 5233 | 5496 | ~264 | HIGH |
| 17 | CartScreen | 5497 | 5610 | ~114 | HIGH |
| 18 | ChatScreen | 5611 | 5619 | ~9 | LOW |
| 19 | AboutScreen | 5620 | 5631 | ~12 | LOW |
| 20 | PrivacyScreen | 5632 | 5645 | ~14 | LOW |
| 21 | ContactScreen | 5646 | 5676 | ~31 | LOW |

## Helper Components and Functions (Top of screens.js)

Before the screen exports, there are also:

### Helper Components
- `InlineMessage` - Toast/notification component
- `ProductListCard` - Product card component
- `SearchResultCard` - Search result display

### Style Objects
- `formInputStyle` - Input field styling
- `primaryButtonStyle` - Primary button styling
- `stackedActionGridStyle` - Grid layout styling
- `surfaceCardStyle` - Card surface styling
- `mutedTextStyle` - Muted text styling

### Helper Functions
- `formatCurrency(value)` - Format numbers as currency
- `getCategoryFromProduct(product)` - Extract category from product data
- `buildDoctorPortrait(doctor)` - Build doctor profile object
- `buildInitialAddressForm()` - Initialize address form state
- `buildInitialProfileForm()` - Initialize profile form state
- `buildInitialRetailerForm()` - Initialize retailer form state

## Extraction Steps

### Step 1: Create Screens Directory Structure
```bash
mkdir -p src/components/MedApp/screens/helpers
mkdir -p src/components/MedApp/screens/components
```

### Step 2: Extract Helper Components First
Create these files in `src/components/MedApp/screens/components/`:

1. **InlineMessage.js** (Lines: ~100-150 from screens.js)
2. **ProductListCard.js** (Lines: ~150-250 from screens.js)
3. **SearchResultCard.js** (Lines: ~250-350 from screens.js)

### Step 3: Extract Helper Functions
Create `src/components/MedApp/screens/helpers/screenHelpers.js`:
- `formatCurrency()`
- `getCategoryFromProduct()`
- `buildDoctorPortrait()`
- `buildInitialAddressForm()`
- `buildInitialProfileForm()`
- `buildInitialRetailerForm()`

Create `src/components/MedApp/screens/helpers/styles.js`:
- `formInputStyle`
- `primaryButtonStyle`
- `stackedActionGridStyle`
- `surfaceCardStyle`
- `mutedTextStyle`

### Step 4: Extract Style Constants
Create `src/components/MedApp/screens/constants.js`:
- `homeCategoryCards` array (Lines ~45-200)
- `vedikaLogoImageSrc` constant

### Step 5: Extract Individual Screens (Priority Order)

**HIGH PRIORITY (Extract First):**
1. LoginScreen.js → Lines 489-576
2. OtpScreen.js → Lines 577-717
3. CartScreen.js → Lines 5497-5610
4. SearchScreen.js → Lines 4939-5111
5. ProductListScreen.js → Lines 5233-5496

**MEDIUM PRIORITY (Extract Second):**
6. ProfileScreen.js → Lines 2924-3097
7. ProfileEditScreen.js → Lines 3098-3261
8. AddAddressScreen.js → Lines 3396-3606
9. OrdersScreen.js → Lines 5112-5232
10. WalletScreen.js → Lines 4723-4938
11. LabTestScreen.js → Lines 4138-4722
12. RetailerScreen.js → Lines 3630-4137
13. DoctorAppointmentScreen.js → Lines 2496-2923
14. DoctorAppointmentsScreen.js → Lines 2303-2495
15. AccountsScreen.js → Lines 3262-3395

**LOW PRIORITY (Extract Last):**
16. ChatScreen.js → Lines 5611-5619 (Very simple)
17. AboutScreen.js → Lines 5620-5631 (Very simple)
18. PrivacyScreen.js → Lines 5632-5645 (Very simple)
19. ContactScreen.js → Lines 5646-5676 (Very simple)
20. LogoutScreen.js → Lines 3607-3629 (Very simple)

### Step 6: Create index.js for Screens
Create `src/components/MedApp/screens/index.js`:
```javascript
// Export all screen components for easy importing
export { LoginScreen } from './LoginScreen.js';
export { OtpScreen } from './OtpScreen.js';
export { HomeScreen } from './HomeScreen.js';
// ... export all others
```

### Step 7: Update imports in each screen file

When extracting, update these imports in each screen:

**FROM:**
```javascript
import { Icon, SectionTitle, /* ... */ } from "./components";
import { DEFAULT_VENDOR, fetchProducts, /* ... */ } from "./api";
import { productData, categorySidebarItems } from "./data";
```

**TO:**
```javascript
import { Icon, SectionTitle, /* ... */ } from "../components";
import { DEFAULT_VENDOR, fetchProducts, /* ... */ } from "../services";
import { productData, categorySidebarItems } from "../constants/data.js";
import { useViewport } from "../hooks/useViewport.js";
import { formatCurrency, createAvatarLabel } from "../utils";
```

## File Template for New Screen

```javascript
/**
 * [ScreenName] Component
 * 
 * Purpose: [Brief description of what this screen does]
 * Props:
 *   - [prop1]: [description]
 *   - [prop2]: [description]
 * 
 * Related files:
 *   - [Related components/services]
 */

import React, { useState, useEffect } from 'react';
import { [needed imports from utils, constants, services] } from '../...';

export const [ScreenName] = ({ [props] }) => {
  // ... component code
  
  return (
    <div>
      {/* JSX */}
    </div>
  );
};

export default [ScreenName];
```

## Verification Checklist

After extracting each screen, verify:

- [ ] Import statement updated to new paths
- [ ] All helper components imported correctly
- [ ] All utility functions imported correctly
- [ ] Component exported as named export
- [ ] File saved with PascalCase naming
- [ ] JSDoc comment added at top
- [ ] No console errors when component loads
- [ ] Component renders without breaking layout

## Tools for Extraction

### Manual Extraction
1. Open `screens.js`
2. Copy lines from start to end line numbers above
3. Create new file with screen name
4. Update imports
5. Save file

### Automated Extraction (Node.js script)

If you want to automate this, create a script like:

```javascript
// extractScreens.js
const fs = require('fs');
const path = require('path');

const screens = [
  { name: 'LoginScreen', start: 489, end: 576 },
  { name: 'OtpScreen', start: 577, end: 717 },
  // ... more screens
];

const content = fs.readFileSync('src/components/MedApp/screens.js', 'utf8');
const lines = content.split('\n');

screens.forEach(screen => {
  const screenLines = lines.slice(screen.start - 1, screen.end);
  const screenContent = screenLines.join('\n');
  
  // Update imports
  let updated = screenContent
    .replace(/from "\.\/components"/g, 'from "../components"')
    .replace(/from "\.\/api"/g, 'from "../services"')
    .replace(/from "\.\/data"/g, 'from "../constants/data"');
  
  const filePath = `src/components/MedApp/screens/${screen.name}.js`;
  fs.writeFileSync(filePath, updated);
  console.log(`✓ Created ${filePath}`);
});
```

## Common Import Fixes

When extracting screens, you'll likely need to update:

```javascript
// ❌ OLD (relative to screens.js location)
import { ... } from "./components";
import { ... } from "./api";
import { ... } from "./data";

// ✅ NEW (relative to screens/ folder)
import { ... } from "../components";
import { ... } from "../services"; // after api.js is moved
import { ... } from "../constants/data";
import { theme, style, layout } from "../constants/theme";
import { formatCurrency } from "../utils/helpers";
import { useViewport } from "../hooks/useViewport";
```

## Next Steps

1. Extract helper components (InlineMessage, ProductListCard, SearchResultCard)
2. Extract helper functions to screenHelpers.js
3. Extract screen styles to styles.js
4. Extract high-priority screens first (LoginScreen, OtpScreen, etc.)
5. Update index.js to import from new locations
6. Test each screen renders correctly
7. Delete old monolithic screens.js file once all screens extracted

---

## Questions About Specific Screens?

Each screen has different imports and dependencies. When extracting, check:
- What state does it need from appState?
- What API functions does it call?
- What helper functions or components does it use?
- Does it use any styles or constants specific to it?

Refer to the screen contents to ensure all dependencies are imported in the new file.
