# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

EmoSante is a React Native mobile application built with Expo. It's a mental health and wellness journaling app focused on emotional tracking and mindfulness. The app uses TypeScript with strict mode enabled and targets iOS, Android, and Web platforms.

## Development Commands

### Starting the Development Server
```powershell
npm start               # Start Expo dev server (interactive menu)
npm run android         # Start on Android device/emulator
npm run ios             # Start on iOS device/simulator
npm run web             # Start web version
```

### Platform-Specific Notes
- The project uses Expo SDK ~54.0.20
- React Native new architecture is enabled (`newArchEnabled: true`)
- On Android, edge-to-edge is enabled with predictive back gesture disabled
- No test scripts are currently configured in package.json

## Architecture

### Navigation Structure
The app uses React Navigation (v7) with a native stack navigator. Navigation types are centralized in `src/screens/HomeScreen.tsx` via `RootStackParamList`:
- **Home**: Landing page with animated plant icon and auth buttons
- **SignIn**: Email/password login form
- **SignUp**: New user registration form (Note: currently routes to Journal, not fully implemented)
- **Journal**: Main journaling interface with CRUD operations

Navigation flow: Home → SignIn/SignUp → Journal. The Journal screen can log out back to SignIn.

### Screen Responsibilities
- **HomeScreen**: Entry point with animated branding and navigation to auth flows
- **AuthScreens**: Contains both `SignInScreen` and `SignUpScreen` with basic form inputs (no backend integration yet)
- **JournalScreen**: Core feature - manages journal entries (CRUD), includes emoji picker placeholder and audio recording placeholder for future features

### Component Architecture
Located in `src/components/`:
- **CalmButton**: Primary UI button with two variants (`primary`, `ghost`). Handles pressed states, disabled states, and accessibility. Used throughout the app for all actions.
- **Header**: Reusable header component with title and optional right-side content (e.g., logout button)

### Theming
Theme is centralized in `src/theme/colors.ts`. All colors use a muted, calm palette:
- Background gradients: `bgLight` → `bg` → `bgDark`
- Text: `text` (dark) and `textMuted` (lighter)
- Primary action color: neutral gray (`#8d9399`)
- Border color: `border`

Colors are imported and used consistently across all screens and components via `import { colors } from '../theme/colors'`.

### Styling Patterns
- All styles use React Native StyleSheet API
- Components use object destructuring for style combinations (e.g., `[styles.base, variant === 'primary' ? styles.primary : styles.ghost]`)
- Shadows are applied consistently with `shadowColor`, `shadowOpacity`, `shadowRadius`, `elevation` for cross-platform support
- Border radius is typically 12-14px for a modern, rounded aesthetic

### State Management
Currently uses local React state (`useState`) only. No global state management (Redux, Context, etc.) is implemented. Journal entries are stored in component state and will be lost on app reload.

### Font Loading
Uses Expo Google Fonts:
- Poppins (400, 600) for headings and buttons
- Lato (400) for body text
App waits for fonts to load before rendering (returns empty `<View />` while loading).

### Data Model
**JournalEntry** type (defined in `JournalScreen.tsx`):
```typescript
type JournalEntry = { 
  id: string; 
  text: string; 
  emoji?: string; 
}
```
Note: Audio field is not yet in the type but UI has placeholder buttons for future audio recording feature.

### Key Dependencies
- `expo` (~54.0.20): Core platform
- `react-native` (0.81.5)
- `@react-navigation/native` (^7.1.19): Navigation framework
- `expo-linear-gradient`: Used on HomeScreen for background
- `expo-font` + Google Fonts packages: Custom typography
- TypeScript (~5.9.2) with strict mode

## Important Notes
- No backend/API integration exists yet - authentication and data persistence are not implemented
- Test framework is not set up (no test command in package.json)
- Linting and type-checking commands are not defined in package.json
- Navigation type definitions (`RootStackParamList`) live in `src/screens/HomeScreen.tsx` and are imported where needed
