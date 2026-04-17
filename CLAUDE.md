# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Start dev server (scan QR in Expo Go on phone)
npx expo start

# Start with cache cleared (use when switching branches or after package changes)
npx expo start --clear

# Build APK for Android (requires eas-cli and Expo account)
eas build -p android --profile preview

# Publish OTA update (requires Expo account login)
npx expo login
eas update --branch main --message "description"
```

No test runner is configured. Manual testing is done via Expo Go on a physical device.

## Architecture

**Entry point:** `index.js` → `App.js` → all screens.

**`App.js`** is the root. It wraps everything in two providers that must stay at the top level:
- `PaperProvider` (React Native Paper) — supplies the Material Design theme to all components
- `NavigationContainer` (React Navigation) — required wrapper for all navigation

Navigation is a single `BottomTabNavigator` with 4 tabs. Tab icons use `MaterialCommunityIcons` from `@expo/vector-icons`. When Phase 5 (login) is added, `App.js` will need an auth state check (`onAuthStateChanged`) to conditionally render a login stack vs. the tab navigator.

**Theme:** `src/theme.js` is the single source of truth for colors, spacing, and roundness. All screens import from it. The Paper theme in `App.js` is built on top of `MD3LightTheme` and overrides `primary` using `theme.colors.primary`. Always use `theme.*` values instead of hardcoded colors or numbers.

**Screen pattern:** Every screen follows the same structure:
1. `useState` for local state, `useEffect` to load persisted data on mount
2. AsyncStorage for persistence (key format: `@campusconnect_<feature>`)
3. React Native Paper components (`Card`, `FAB`, `Modal`, `TextInput`, `Button`) for all UI
4. `StyleSheet.create` at the bottom of the file using `theme.*` values

**Planned but not yet created:**
- `src/services/firebase.js` — Firebase config + `auth` and `db` exports (Phase 5)
- `src/services/weatherService.js` — OpenWeatherMap `fetch()` wrapper (Phase 7)
- `src/screens/LoginScreen.js` + `RegisterScreen.js` (Phase 5)

## Current Phase Status

| Phase | Feature | Status |
|---|---|---|
| 0 | Project setup, navigation shell, theme | Done |
| 1 | ScheduleScreen — full CRUD with AsyncStorage | Done |
| 2 | NotesScreen | Stub only |
| 3 | AnnouncementsScreen | Stub only |
| 4 | MapScreen | Stub only |
| 5 | Login (Firebase Auth) | Not started |
| 6 | Online DB (Firestore) | Not started |
| 7 | Weather API (OpenWeatherMap) | Not started |

See `docs/implementation_plan.md` for the full build log and `docs/bulma.html` for the step-by-step coding guide.

## Key Decisions

- **MUI is not used** — MUI is React web only. React Native Paper is the Material Design equivalent for this project.
- **Firebase config** is safe to commit for this school project. It goes in `src/services/firebase.js` and exports `auth` and `db`.
- The `app.json` slug is `scma` (original Expo init name) but the display name and repo are `CampusConnect`/`campus-connect`.
