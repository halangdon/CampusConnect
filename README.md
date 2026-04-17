# CampusConnect 🎓

**CampusConnect** is a comprehensive Smart Campus mobile application built for students at Informatics College Consolacion. It acts as an integrated digital hub, allowing students to securely manage their class schedules, track personal to-do notes, receive real-time campus announcements, and navigate the campus layout via Google Maps. 

This project was built as the final requirement for the **Mobile Application Development 2** course. It adheres strictly to the App Proposal requirements, successfully implementing 4 Basic Features and 3 Advanced Features.

---

## 🚀 Features

The application is split into core basic student utilities, entirely powered by an advanced cloud-connected architecture.

### Basic Features
1. **Class Schedule:** A dynamic agenda where students can add custom subjects, times, and room assignments. It includes a multi-day grid selector allowing single classes to span across multiple days (e.g. MWF or TTH).
2. **Notes / To-Do List:** A personal task tracker. Students can write down homework or pending tasks and cross them out visually using interactive checkboxes.
3. **Announcements Feed:** A digital bulletin board that pulls the latest school news, midterm updates, and events directly from the cloud.
4. **Campus Map:** An interactive directory highlighting key locations (Main Library, Student Canteen, IT Department, Admin Office) within Building A, along with an intelligent Google Maps deep-link navigation button that corrects for inaccurate GPS pins by targeting established local landmarks (Paengs Chicken Consolacion).

### Advanced Features
1. **Login System (Firebase Auth):** The entire application is protected. Users are trapped in an authentication stack and cannot access the digital campus until they register and log in with a valid email and password.
2. **Online Database (Firestore):** We migrated away from volatile device-local storage. The user's individual schedules and private notes are securely written and read from Firebase Cloud Firestore (`users/{uid}`), ensuring data persists safely across device upgrades and logouts. Announcements are fetched globally via real-time `onSnapshot` listeners.
3. **Internet Data / API (OpenWeather):** Live weather connectivity! The Announcements feed serves as a smart dashboard featuring a cloud-synced weather widget that fetches the current temperature and atmospheric conditions for Mandaue/Consolacion natively via the OpenWeatherMap REST API.

---

## 🛠️ Technology Stack

- **Framework:** [React Native](https://reactnative.dev/) (Bootstrapped via [Expo](https://expo.dev/))
- **UI & Styling:** [React Native Paper](https://callstack.github.io/react-native-paper/) (Material Design 3 paradigm)
- **Navigation:** `@react-navigation/bottom-tabs` & `@react-navigation/stack`
- **Backend & Database:** [Firebase Auth & Firestore](https://firebase.google.com/)
- **External API:** [OpenWeatherMap API](https://openweathermap.org/api)

---

## ⚙️ Installation & Testing Instructions

To run this application on your local machine or physical device:

### Prerequisites
- [Node.js](https://nodejs.org/) installed
- [Expo Go](https://expo.dev/client) app installed on your physical iOS or Android device

### Steps
1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/campus-connect.git
   cd campus-connect
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```
   *(This will inherently install React Navigation, Firebase, and React Native Paper)*

3. **Configure Environment Variables:**
   - The application relies on Firebase and OpenWeather API keys config files located in `src/services/`.
   - By default, these files are already populated for the course grading review. If setting up your own fork, replace the keys in `src/services/firebase.js` and `src/services/weatherService.js`.

4. **Start the Expo Server:**
   ```bash
   npx expo start
   ```

5. **Run the App:** 
   - Open your device's camera (iOS) or Expo Go app (Android) and scan the QR code generated in your terminal to view the application live.

---

## 📂 Project Structure

```text
campus-connect/
├── App.js                     // Main routing hub (Auth Stack vs Tab Stack)
├── app.json                   // Expo configuration
├── src/
│   ├── theme.js               // Global Material Design color themes
│   ├── services/              // API integrations
│   │   ├── firebase.js        // Firebase initialization core
│   │   └── weatherService.js  // OpenWeather API fetch logic
│   └── screens/               // App Views
│       ├── LoginScreen.js     // Authentication
│       ├── RegisterScreen.js  // Authentication
│       ├── ScheduleScreen.js  // Basic Feature 1
│       ├── NotesScreen.js     // Basic Feature 2
│       ├── Announcements.js   // Basic Feature 3 + Weather Widget (Adv 3)
│       └── MapScreen.js       // Basic Feature 4
└── docs/                      // Internal build timeline & grading criteria
```

---

> **Project Developer:** Junlee Marc M Pepito  
> **Course:** App Dev Yr 2
> (c) 2026 | junl.ee
