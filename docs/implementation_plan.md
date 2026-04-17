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
| 0 | Project Setup | Setup | Not Started |
| 1 | Class Schedule | Basic | Not Started |
| 2 | Notes / To-Do List | Basic | Not Started |
| 3 | Announcements (static) | Basic | Not Started |
| 4 | Campus Map | Basic | Not Started |
| 5 | Login System | Advanced | Not Started |
| 6 | Online Database | Advanced | Not Started |
| 7 | Internet Data / API | Advanced | Not Started |
| D | Deployment | Deploy | Not Started |

---

## Build Log

> Entries are added here as each phase is completed.
> Format per entry: date, what was done, files created/modified, commit message.

---

### Phase 0 — Project Setup
- **Status:** Not Started
- **Commit:** `Phase 0: project init`
- **What happens:**
  - `npx create-expo-app CampusConnect --template blank`
  - All packages installed (React Navigation, React Native Paper, AsyncStorage, Firebase)
  - Folder structure created (`src/screens`, `src/components`, `src/services`)
  - `src/theme.js` created with shared colors
  - App verified running on phone via Expo Go
  - First push to GitHub

---

### Phase 1 — Class Schedule
- **Status:** Not Started
- **Commit:** `Phase 1: class schedule screen`
- **What happens:**
  - `src/screens/ScheduleScreen.js` created
  - Add/delete classes (subject, time, room)
  - Data persisted with AsyncStorage
  - Screen added to tab navigation

---

### Phase 2 — Notes / To-Do List
- **Status:** Not Started
- **Commit:** `Phase 2: notes and to-do screen`
- **What happens:**
  - `src/screens/NotesScreen.js` created
  - Create, check off, delete notes
  - Data persisted with AsyncStorage
  - Screen added to tab navigation

---

### Phase 3 — Announcements (Static)
- **Status:** Not Started
- **Commit:** `Phase 3: announcements screen (static data)`
- **What happens:**
  - `src/screens/AnnouncementsScreen.js` created
  - Hardcoded sample announcements array
  - Displayed as React Native Paper Cards
  - Screen added to tab navigation
  - Data shape matches what Firestore will return in Phase 6

---

### Phase 4 — Campus Map
- **Status:** Not Started
- **Commit:** `Phase 4: campus map screen`
- **What happens:**
  - `src/screens/MapScreen.js` created
  - Static campus map image or Google Maps deep link
  - Screen added to tab navigation
  - **Checkpoint:** all 4 basic features working offline

---

### Phase 5 — Login System *(Advanced #1)*
- **Status:** Not Started
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
- **Status:** Not Started
- **Commit:** `Phase 6: online database (Firestore)`
- **Covers:** "Online Database" — Advanced Feature from assignment PDF
- **What happens:**
  - Announcements moved from hardcoded array → Firestore `announcements` collection
  - Schedule + Notes moved from AsyncStorage → Firestore under `users/{uid}/`
  - `onSnapshot()` used for live updates
  - Each user's data is private (isolated by Firebase UID)

---

### Phase 7 — Internet Data / API *(Advanced #3)*
- **Status:** Not Started
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
