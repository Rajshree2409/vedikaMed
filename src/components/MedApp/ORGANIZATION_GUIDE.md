# MedApp Source Code Organization

## Project Structure

This folder contains the Vedika Medical Application organized in a modular, scalable structure.

```
MedApp/
├── api/                    # API service layer (API calls and data fetching)
├── components/             # Reusable UI components (not full screens)
├── constants/              # Static constants and configuration
│   ├── apiConfig.js       # API endpoints and configuration
│   └── theme.js           # Theme colors and layout styles
├── data/                   # Static data files (product data, privacy sections, etc.)
├── hooks/                  # Custom React hooks
│   └── useViewport.js     # Viewport size detection hook
├── screens/                # Screen components (one file per screen)
│   ├── LoginScreen.js
│   ├── OtpScreen.js
│   ├── HomeScreen.js
│   ├── SearchScreen.js
│   ├── ProductListScreen.js
│   ├── CartScreen.js
│   ├── ProfileScreen.js
│   ├── OrdersScreen.js
│   ├── WalletScreen.js
│   ├── LabTestScreen.js
│   ├── DoctorAppointmentScreen.js
│   └── ...more screens
├── services/               # Business logic and utility services
├── shared/                 # Shared components and utilities
├── utils/                  # Utility functions and helpers
│   └── helpers.js         # General-purpose utility functions
├── index.js               # Main App wrapper component
└── api.js                 # [DEPRECATED - Split into services/]
```

## File Organization Guidelines

### 1. **Constants** (`constants/`)
- **theme.js**: Color scheme, typography, layout grid definitions
- **apiConfig.js**: API endpoints, storage keys, default values

### 2. **Utils** (`utils/`)
- General-purpose utilities that don't depend on React
- String formatting, number parsing, date utilities
- Storage helpers (localStorage operations)
- Error handling utilities

### 3. **Hooks** (`hooks/`)
- Custom React hooks like `useViewport` for responsive design
- Custom hooks for data fetching, state management, etc.

### 4. **Data** (`data/`)
- Static data like product categories, product listings
- Privacy policy sections, sidebar items
- Mock data for development and testing

### 5. **Services** (`services/`)
- API call functions (fetch, POST, etc.)
- Data normalization and transformation
- Business logic that might be used by multiple components

### 6. **Components** (`components/`)
- Reusable UI components (not full screens)
- Examples: `Icon`, `PageHeader`, `SectionTitle`, `CategoryCard`, etc.
- Smaller, focused components with single responsibility

### 7. **Screens** (`screens/`)
- Full-page screen components (one file per screen)
- Each screen should be self-contained
- Import from components, services, and utils

### 8. **Shared** (`shared/`)
- Shared utilities and common patterns
- Common UI patterns that aren't small components

## Migration Guide

### Before (Old Structure)
```
MedApp/
├── api.js                 # 756 lines - Mixed concerns
├── components.js          # 322 lines - Theme + components
├── data.js                # 172 lines - Product data
├── screens.js             # 5342 lines - ALL SCREENS + helpers
└── index.js               # 593 lines - Main component
```

### After (New Structure)
Each concern is separated into its own file:
- Theme → `constants/theme.js`
- API configuration → `constants/apiConfig.js`
- Helper functions → `utils/helpers.js`
- Each screen → `screens/ScreenName.js`
- Reusable components → `components/ComponentName.js`

## Benefits of This Organization

✅ **Scalability**: Easy to add new screens, components, or features
✅ **Maintainability**: Find related code quickly
✅ **Testability**: Small, focused files are easier to test
✅ **Reusability**: Utility functions and components in dedicated locations
✅ **Clarity**: Clear responsibility for each module
✅ **Collaboration**: Team members can work on different parts simultaneously

## Quick Reference

### Adding a New Screen
1. Create `screens/NewScreenName.js`
2. Export the screen component
3. Import it in `index.js`
4. Add route logic in main App component

### Adding a Utility Function
1. Add it to `utils/helpers.js` (or create a new file if it's a large utility)
2. Export the function
3. Import it where needed

### Adding a Reusable Component
1. Create `components/ComponentName.js`
2. Keep it focused and props-driven
3. Export it for use in screens and other components

### Adding Constants
1. Add to appropriate file in `constants/` folder
2. Export for use throughout the app

## Import Examples

```javascript
// Import theme
import { theme, layout, style } from '../constants/theme.js';

// Import API configuration
import { DEFAULT_VENDOR, API_ENDPOINTS } from '../constants/apiConfig.js';

// Import utilities
import { formatCurrency, getSessionName } from '../utils/helpers.js';

// Import custom hooks
import { useViewport } from '../hooks/useViewport.js';

// Import services
import { fetchProducts, normalizeProduct } from '../services/apiServices.js';

// Import components
import { Icon, PageHeader, SectionTitle } from '../components';

// Import screens
import { HomeScreen, ProfileScreen } from '../screens';
```

## Next Steps

1. ✅ Create folder structure
2. ✅ Extract constants and utilities
3. → **Next**: Extract individual screens from `screens.js`
4. → **Next**: Extract API services from `api.js`
5. → **Next**: Reorganize components
6. → **Next**: Update all imports
7. → **Next**: Test and verify

## Maintenance Tips

- Keep files under 300 lines when possible
- One exported component/function per file is ideal
- Use barrel exports (index.js) for easy imports from folders
- Document complex functions with JSDoc comments
- Keep related utilities together in util files
