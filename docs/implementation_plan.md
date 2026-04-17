# CampusConnect — Build Timeline

> This file is a **chronological build log**. It is updated after each phase is completed.
> It does not contain planning notes — those live in `bulma.html` (implementation plan) and `prerequisites.html`.
> The log starts at Phase 0. Nothing is logged here until the build begins.

---

## Project Summary

| | |
|---|---|
| **App Name** | CampusConnect |
| **Type** | Smart Campus Mobile App |
| **Assignment** | Mobile Application Development 2 |
| **Framework** | React Native + Expo |
| **UI** | React Native Paper (Material Design) |
| **Auth** | Firebase Auth (email/password) |
| **Database** | Firebase Firestore |
| **API** | OpenWeatherMap |
| **Repo** | GitHub — `campus-connect` |

---

## Phase Status

| Phase | Feature | Type | Status |
|---|---|---|---|
| 0 | Project Setup | Setup | Done |
| 1 | Class Schedule | Basic | Done |
| 2 | Notes / To-Do List | Basic | Done |
| 3 | Announcements (static) | Basic | Done |
| 4 | Campus Map | Basic | Done |
| 5 | Login System | Advanced | Done |
| 6 | Online Database | Advanced | Done |
| 7 | Internet Data / API | Advanced | Done |
| D | Deployment | Deploy | Not Started |

---

## Build Log

> Entries are added here as each phase is completed.
> Format per entry: date, what was done, files created/modified, commit message.

---

### Phase 0 — Project Setup
- **Status:** Done
- **Commit:** `Phase 0: project init`
- **What happened:**
  - `npx create-expo-app . -y --template blank`
  - Installed @react-navigation/native, bottom-tabs, stack, react-native-paper, async-storage, safe-area-context, screens, and gesture-handler.
  - Folder structure created (`src/screens`, `src/components`, `src/services`)
  - `src/theme.js` created with primary color #1a73e8.
  - App.js configured with navigation logic and PaperProvider.
  - Placeholders created for all 4 basic screens.

---

### Phase 1 — Class Schedule
- **Status:** Done
- **Commit:** `Phase 1: class schedule screen`
- **What happened:**
  - `src/screens/ScheduleScreen.js` created and updated with add/delete logic
  - `src/screens/ScheduleScreen.js` created (231 lines)
  - Add class via modal form: subject, time, room, day (Mon–Fri segmented selector)
  - Delete class with confirmation dialog
  - Classes grouped by day with styled day headers
  - Data persisted with AsyncStorage (`@campusconnect_schedule`)
  - Screen wired as first tab in `App.js` with `calendar-clock` icon

---

### Phase 2 — Notes / To-Do List
- **Status:** Done
- **Commit:** `Phase 2: notes and to-do screen`
- **What happens:**
  - `src/screens/NotesScreen.js` created
  - Create, check off, delete notes
  - Data persisted with AsyncStorage
  - Screen added to tab navigation

---

### Phase 3 — Announcements (Static)
- **Status:** Done
- **Commit:** `Phase 3: announcements screen (static data)`
- **What happens:**
  - `src/screens/AnnouncementsScreen.js` created
  - Hardcoded sample announcements array
  - Displayed as React Native Paper Cards
  - Screen added to tab navigation
  - Data shape matches what Firestore will return in Phase 6

---

### Phase 4 — Campus Map
- **Status:** Done
- **Commit:** `Phase 4: campus map screen`
- **What happens:**
  - `src/screens/MapScreen.js` created
  - Static campus map image or Google Maps deep link
  - Screen added to tab navigation
  - **Checkpoint:** all 4 basic features working offline

---

### Phase 5 — Login System *(Advanced #1)*
- **Status:** Done
- **Commit:** `Phase 5: login system (Firebase Auth)`
- **Covers:** "Login System" — Advanced Feature from assignment PDF
- **What happens:**
  - `src/services/firebase.js` created with Firebase config
  - `src/screens/LoginScreen.js` created
  - `src/screens/RegisterScreen.js` created
  - `App.js` updated — navigation locked behind `onAuthStateChanged`
  - Unauthenticated users see Login/Register, authenticated users see main tabs

---

### Phase 6 — Online Database *(Advanced #2)*
- **Status:** Done
- **Commit:** `Phase 6: online database (Firestore)`
- **Covers:** "Online Database" — Advanced Feature from assignment PDF
- **What happens:**
  - Announcements moved from hardcoded array → Firestore `announcements` collection
  - Schedule + Notes moved from AsyncStorage → Firestore under `users/{uid}/`
  - `onSnapshot()` used for live updates
  - Each user's data is private (isolated by Firebase UID)

---

### Phase 7 — Internet Data / API *(Advanced #3)*
- **Status:** Done
- **Commit:** `Phase 7: weather API widget`
- **Covers:** "Internet Data (API)" — Advanced Feature from assignment PDF
- **What happens:**
  - `src/services/weatherService.js` created
  - OpenWeatherMap `fetch()` call
  - Weather card added to home/dashboard screen (temperature, condition, city)
  - Loading state while fetching

---

### Deployment
- **Status:** Not Started
- **Options:**
  1. `eas update` → Expo Go QR link (recommended for demo)
  2. `eas build -p android` → downloadable `.apk`
  3. GitHub Release with `.apk` attached
- **Note:** Firebase (Auth + Firestore) is already live — no deployment step needed for backend.

---

## Pending (after all phases)
- [ ] Write GitHub `README.md` for the repo
- [ ] Short documentation (1–2 pages): app title, purpose, features, screenshots
- [ ] Prepare 5–10 minute demo video
- [ ] Physical model (cartolina/cardboard with printed screenshots) — per assignment requirement
