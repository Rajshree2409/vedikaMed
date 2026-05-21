# VedikaApp Code Organization - Quick Reference

**Bookmark this page!** This is your quick reference for the new structure.

---

## 📍 File Locations Quick Guide

### 🎨 Theme & Styling
```javascript
import { theme, style, layout } from '../constants/theme.js';
// ✅ Colors, shadows, fonts, grid layouts all here
```

### ⚙️ Configuration
```javascript
import { DEFAULT_VENDOR, API_ENDPOINTS, STORAGE_KEYS } from '../constants/apiConfig.js';
// ✅ API endpoints, constants, default values
```

### 🛠️ Utilities
```javascript
import { formatCurrency, getSessionName, createAvatarLabel } from '../utils/helpers.js';
// ✅ String manipulation, formatting, storage, date utilities
```

### 📱 Screen Components
```javascript
import { LoginScreen } from '../screens/LoginScreen.js';
import { HomeScreen } from '../screens/HomeScreen.js';
import { ProfileScreen } from '../screens/ProfileScreen.js';
// ✅ One screen per file
```

### 🔌 API Services
```javascript
import { fetchProducts, loginUser } from '../services/api.js';
// ✅ All API calls and business logic
```

### 🪝 Custom Hooks
```javascript
import { useViewport } from '../hooks/useViewport.js';
// ✅ Reusable React hooks
```

### 📦 Reusable Components
```javascript
import { Icon, PageHeader, SectionTitle } from '../components';
// ✅ UI components used across multiple screens
```

---

## 📋 File Creation Checklist

When creating a new screen file, use this checklist:

```javascript
/**
 * ScreenName Component
 * 
 * Purpose: [What does this screen do?]
 * Props: [What props does it take?]
 * State Flow: [What state changes occur?]
 * Related Files: [What other files does it import from?]
 */

import React, { useState, useEffect } from 'react';

// ✅ Import from new organized locations
import { theme } from '../constants/theme.js';
import { DEFAULT_VENDOR } from '../constants/apiConfig.js';
import { formatCurrency } from '../utils/helpers.js';
import { useViewport } from '../hooks/useViewport.js';
import { fetchProducts } from '../services/api.js';
import { Icon, PageHeader } from '../components';

export const ScreenName = ({ prop1, prop2 }) => {
  // Component code here
  return (
    <div>{/* JSX */}</div>
  );
};

export default ScreenName;
```

---

## 🔄 Import Updates Needed

### Old Import Paths (❌ Don't use)
```javascript
import { theme } from './components';
import { fetchProducts } from './api';
import { productData } from './data';
```

### New Import Paths (✅ Use these)
```javascript
import { theme } from '../constants/theme.js';
import { fetchProducts } from '../services/api.js';
import { productData } from '../constants/data.js';
```

---

## 📦 What Goes Where?

### `constants/` - Configuration & Constants
✅ **Should contain:**
- Theme colors, typography, shadows
- Layout grid definitions
- API endpoints and URLs
- Default values and constants
- Product categories and data

❌ **Should NOT contain:**
- React components
- Hooks
- Utility functions (those go to utils/)

### `utils/` - Helper Functions
✅ **Should contain:**
- String formatting (formatCurrency, formatDate)
- Number parsing and manipulation
- Date utilities (getDateStamp)
- Storage operations (readStorage, writeStorage)
- Error handling

❌ **Should NOT contain:**
- React components
- Hooks
- API calls (those go to services/)

### `services/` - API & Business Logic
✅ **Should contain:**
- All fetch/API calls
- Data normalization functions
- Payload builders
- Storage operations related to data persistence
- Business logic functions

❌ **Should NOT contain:**
- React components
- Hooks
- UI styling (those go to constants/theme)

### `screens/` - Page Components
✅ **Should contain:**
- Full-page screen components
- Screen-specific state management
- Screen-specific styles (can be inline or in styles.js)
- Navigation logic

❌ **Should NOT contain:**
- Reusable UI components (those go to components/)
- General utilities (those go to utils/)

### `components/` - Reusable UI Components
✅ **Should contain:**
- Icon component
- Button components (if any)
- Card components
- Form inputs (if any)
- Any component used in multiple screens

❌ **Should NOT contain:**
- Full screens
- Page-specific logic

### `hooks/` - Custom React Hooks
✅ **Should contain:**
- useViewport - viewport size detection
- useLocalStorage - storage operations
- Any custom hook used in multiple components

❌ **Should NOT contain:**
- Regular functions (those go to utils/)
- React components

---

## 🚀 Common Tasks

### I need to use a theme color
```javascript
import { theme } from '../constants/theme.js';

const color = theme.green;  // ✅ Correct
const color = theme.red;    // ✅ Correct
const color = '#fff';       // ❌ Don't hardcode colors
```

### I need to format currency
```javascript
import { formatCurrency } from '../utils/helpers.js';

const display = formatCurrency(250);  // ✅ "Rs. 250.00"
```

### I need to fetch products
```javascript
import { fetchProducts } from '../services/api.js';

const products = await fetchProducts(vendorId);  // ✅ Correct
```

### I need to use a custom hook
```javascript
import { useViewport } from '../hooks/useViewport.js';

const { width, height } = useViewport();  // ✅ Get viewport size
```

### I need to use theme layout
```javascript
import { layout } from '../constants/theme.js';

<div style={layout.content}>  // ✅ Use layout grid
  {/* content */}
</div>
```

---

## 🔍 Finding Things

### Where is the login logic?
→ `/screens/LoginScreen.js`

### Where are API calls?
→ `/services/api.js` (and related service files)

### Where are colors defined?
→ `/constants/theme.js`

### Where is the product data?
→ `/constants/data.js`

### Where are formatting functions?
→ `/utils/helpers.js`

### Where is the useViewport hook?
→ `/hooks/useViewport.js`

### Where are reusable components?
→ `/components/` folder

---

## ✅ Before Pushing Code

Always verify:

- [ ] All imports use new paths (not old `./api`, `./components`, etc.)
- [ ] Used barrel exports where available (e.g., `from '../constants'`)
- [ ] No hardcoded values (use theme colors, constants)
- [ ] Component properly documented with JSDoc
- [ ] Component exported as both named and default export
- [ ] Tested that component renders without console errors
- [ ] File is under 300 lines if possible

---

## 📊 Current Progress

```
COMPLETED:
  ✅ Folder structure (all folders created)
  ✅ Theme configuration (constants/theme.js)
  ✅ API configuration (constants/apiConfig.js)
  ✅ Utilities (utils/helpers.js)
  ✅ LoginScreen & OtpScreen extracted
  ✅ Documentation (4 guides created)

IN PROGRESS:
  🔄 Extracting remaining 19 screens
  🔄 Extracting helper components
  
TODO:
  ⏳ Extract API services
  ⏳ Reorganize components folder
  ⏳ Update all imports in index.js
  ⏳ Final testing and verification
```

---

## 🎓 Learning the Pattern

Study these two files to understand the new pattern:

1. **`screens/LoginScreen.js`** - Simple example with clear JSDoc
2. **`screens/OtpScreen.js`** - Slightly more complex example

Both follow the same pattern:
1. JSDoc comments at top
2. Import from new organized locations
3. Component function
4. Export as both named and default

---

## 💡 Pro Tips

1. **Use barrel exports** for cleaner imports:
   ```javascript
   // ✅ GOOD - clean
   import { formatCurrency } from '../utils';
   
   // ❌ OK but longer
   import { formatCurrency } from '../utils/helpers.js';
   ```

2. **Import only what you need**:
   ```javascript
   // ✅ GOOD
   import { formatCurrency, getSessionName } from '../utils';
   
   // ❌ BAD - imports everything
   import * as utils from '../utils';
   ```

3. **Group imports by type**:
   ```javascript
   // ✅ GOOD - organized
   import { theme } from '../constants';
   import { formatCurrency } from '../utils';
   import { fetchProducts } from '../services';
   ```

4. **Use JSDoc for documentation**:
   ```javascript
   /**
    * ScreenName Component
    * Purpose: Clear description
    * Props: List them here
    */
   ```

---

## 🆘 Troubleshooting

### Error: "Cannot find module"
→ Check the import path. Use `../constants`, `../utils`, etc. based on relative location

### Error: "theme is not defined"
→ Did you import it? Add: `import { theme } from '../constants/theme.js';`

### Error: "formatCurrency is not defined"
→ Import it: `import { formatCurrency } from '../utils';`

### Screen not showing
→ Check imports, make sure component is exported, check spelling

---

## 📞 Quick Questions?

- **Structure question?** → Read `ORGANIZATION_GUIDE.md`
- **How to extract a screen?** → Read `SCREEN_EXTRACTION_GUIDE.md`
- **Big picture?** → Read `REFACTORING_SUMMARY.md`
- **Migration progress?** → Read `MIGRATION_GUIDE.md`

---

**Made the structure easier to navigate!** 🎉
