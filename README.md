# MunchMap 📍🍔

MunchMap is a mobile-first application designed to help users discover nearby food trucks and enjoy a seamless browsing experience. The app features a sleek design, modern UI/UX, and functionality for user authentication, account creation, and personalization.

---

## Current Completed Progress 🚀

- **Sign-In Screen**: Users can log in via phone or email with a beautifully designed interface.  
- **Sign-Up Screen**: Simple and intuitive account creation with fields for personal and contact information.  
- **Dynamic Forms**: Toggle between sign-in options (Phone or Email) with reusable and modular components.  
- **Theming**: Unified theme for consistent design, including primary and secondary colors.  
- **Custom Components**:  
  - `CategoryModal`: Full screen modal that shows categories to select which will affect truck filtering.
  - `CircleButton`: Custom circle button ui.
  - `ButtonStandard`: Fully customizable button styles.  
  - `CustomTextInput`: Reusable input fields with labels and borders.  
  - `IconButton`: Icon-based buttons with labels for alternate sign-in methods.  
  - `MenuModal`: Full screen modal that shows a truck's menu items.
  - `NearbyTrucksCard`: Card that lists the visible trucks on the map.
  - `SearchBar`: Google API address search UI on top of the map.
  - `SelectedTruckCard`: Modal that shows the selected truck's information.
  - `TruckCardList`: Returns a list of small truck cards.
  - `TruckCardSmall`: Minimized truck card displaying key information.
  - `TruckPage`: Full truck page that shows all specific truck information.
- **Blur and Gradient Effects**: Modern design elements such as background blur and gradients.  
- **Food Truck List and Search**:  
  - Dynamically filter food trucks by category.  
  - Dynamically order trucks by rating or by distance.
  - Interactive Google Places search integration for seamless location updates.  
- **Interactive Map**:  
  - Custom marker icons for food trucks.  
  - Smooth zooming and animation transitions upon truck selection.  
  - Center map based on user searches.  
- **Selected Truck Details**:  
  - View detailed truck information with categories, ratings, and image galleries.  
  - Interactive buttons for menu, directions, and truck-specific views.

---

## Current Project Directory Structure 🗂️

```
FOODTRUCK-APP
│
│── .expo                    # This folder automatically appears when a dev server is ran
│
│── android                  # This folder automatically appears when an android prebuild is created
│
│── ios                      # This folder automatically appears when an ios prebuild is created
│
├── app
│   ├── (tabs)               # Tab layout and related screens
│   │   ├── _layout.tsx      # Tab layout file
│   │   ├── index.tsx        # Home screen
│   │   ├── profile.tsx      # Profile screen
│   │   ├── search.tsx       # Search screen
│   ├── _layout.tsx          # Root layout
│   ├── +not-found.tsx       # Page not found redirect
│   ├── create-account.tsx   # Create Account screen
│   └── sign-in.tsx          # Sign In Screen
│
├── assets                   # Static assets
│   ├── images
│   │   ├── favicon.png
│   │   ├── icon.png
│   │   ├── sign-in-bg.jpg   # Background image for Sign-In and Sign-Up screens
│   │   └── truckImages      # Images of food trucks
│   └── fonts                # Fonts used in the application
│
├── components               # Reusable UI components
│   ├── CategoryModal.tsx
│   ├── CircleButton.tsx
│   ├── ButtonStandard.tsx
│   ├── CustomTextInput.tsx
│   ├── IconButton.tsx
│   ├── MenuModal.tsx
│   ├── NearbyTrucksCard.tsx
│   ├── SearchBar.tsx
│   ├── SelectedTruckCard.tsx
│   ├── TruckCardList.tsx
│   ├── TruckCardSmall.tsx
│   └── TruckPage.tsx
│
├── context                  # Placeholder context for authentication (not actually implemented)
│   └── ctx.tsx
│
├── node_modules             # Automatically appears when npm and expo is initialized
│
├── storage                  # Placeholder local storage utilities (not fully implemented)
│   └── useStorageState.ts
│
├── store                    # Contains Zustand custom hooks
│   ├── useFilterStore.tsx   # State management for selected category filters
│   └── useTruckStore.tsx    # State management for selected truck on map
│
├── theme                    # Theme and styling variables
│   └── theme.ts
│
├── .env.local               # Local environment variables
│
├── .gitignore               # List of files to be ignored on github
│
├── app.json                 # Expo project configuration
│
├── constants.ts             # Shared constants (e.g., category list, initial data)
│
├── expo-env.d.ts            # Environment variable definitions
│
├── global.d.ts              # Global module definitions
│
├── package-lock.json        # Dependencies
│
├── package.json             # Dependencies
│
├── README.md                # Project documentation
│
├── tsconfig.json            # TypeScript configuration
│
└── types.ts                 # Type and Interface definitions for data handling 
```

---

## Getting Started 🛠️

Follow these instructions to set up and run the project locally.

### Prerequisites

- **Node.js** (Latest stable version recommended)  
- **Expo CLI** (or use `npx expo` commands, preferred)  
- **Git** (for version control)
- **Android Studio** (for android emulator/android prebuilds)
- **XCode/Mac** (for ios emulator/ios prebuilds)

---

### Installation

#### WARNINGS: 
   1. MAKE SURE THE REPO IS NOT WITHIN A LONG PATH ON YOUR MACHINE
   2. MAKE SURE THE REPO IS NOT WITHIN A ONEDRIVE OR DROPBOX SYNCED FOLDER

1. Clone the repository:  
   ```bash
   git clone https://github.com/juan-phzy/foodtruck-app.git
   cd munchmap
   ```

2. Install dependencies:  
   ```bash
   npm install
   ```

3. Install Expo dependencies:  
   ```bash
   npx expo install
   ```

4. Set up your `.env.local` file with your Google API & Mapbox Key:  
   ```env
   EXPO_PUBLIC_GOOGLE_MAPS_API_KEY=your-google-api-key
   EXPO_PUBLIC_MAPBOX_KEY=your-mapbox-key
   ```

5. Set up your `.expo-env.d.ts` file for expo env definition:  
   ```env
   /// <reference types="expo/types" />
   // NOTE: This file should not be edited and should be in your git ignore
   ```

6. Run expo doctor to ensure all dependencies are compatible:  
   ```bash
   npx expo-doctor
   ```
---

### Running the App

#### WARNINGS
   1. Expo GO is NOT supported for this project.
   2. Prebuilds are NECESSARY to run the project

1. Create a prebuild if android or ios folder is not present within your project:  
   ```bash
   npx expo prebuild --clean
   ```

2. Choose a platform to run the app:  
   - npx expo run:android
   - npx expo run:ios

---

## How to Use 🧑‍💻

1. **Sign In**:  
   - Launch the app.  
   - The backend is not yet set up, so you can access the app by simply pressing Sign In or Sign Up.

2. **Search Food Trucks**:  
   - Use the search bar to find locations using the Google Places API.  
   - The map will center on the selected location.

3. **View Food Truck Details**:  
   - Tap on a marker or truck card to view detailed information, including ratings, categories, and images.
   - Tap on truck card's menu to view food items
   - Tap on truck card's truck button to view full truck page

4. **Filter Trucks**:  
   - Filter food trucks by categories dynamically.
   - Reorder food truck list by distance or rating

---

## Key Technologies Used 🛠️

- **React Native**: Framework for building mobile applications.  
- **Expo**: Development environment for React Native apps.  
- **TypeScript**: Typed JavaScript for improved developer experience.  
- **Expo Router**: Simplified navigation with file-based routing.  
- **Google Places API**: Integrated location search functionality.  
- **Expo Blur**: Background blur effects.  
- **Expo Linear Gradient**: Stylish gradient overlays.
- **rnmapbox**: Interactive map rendering

---

## Team Members 👥

| Name               | Role                                       |  
|--------------------|--------------------------------------------|  
| Cheuk Tung Ho      | Front-End Dev, Design Researcher           |  
| Elijah Ewers       | Front-End Dev                              |  
| Ghalia Azam        | Backend Developer & Researcher             |  
| Juan Hernandez     | Project Manager, Lead Developer, Designer  |  
| Krinal Kathiriya   | Front-End Dev                              |  

Contact the Lead at jherna50@nyit.edu or jp.hernandez.yz@gmail.com
