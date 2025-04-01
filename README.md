# MunchMap 📍🍔

MunchMap is a mobile-first application designed to help users discover nearby food trucks and enjoy a seamless browsing experience. The app features a sleek design, modern UI/UX, and functionality for user authentication, account creation, and personalization.

---

## Current Completed Progress 🚀

-   **Sign-In Screen**: Users can log in via phone or email with a beautifully designed interface.
-   **Sign-Up Screen**: Simple and intuitive account creation with fields for personal and contact information.
-   **Theming**: Unified theme for consistent design, including colors, font sizes, and padding.
-   **Custom Components**: Custom and standardized components built from scratch that provide style consistency throughout our application.
-   **Blur and Gradient Effects**: Modern design elements such as background blur and gradients.
-   **Food Truck List and Search**:
    -   Dynamically filter food trucks by category.
    -   Dynamically order trucks by rating or by distance.
    -   Interactive Google Places search integration for seamless location updates.
-   **Interactive Map**:
    -   Custom marker icons for food trucks.
    -   Smooth zooming and animation transitions upon truck selection.
    -   Center map based on user searches.
-   **Selected Truck Details**:
    -   View detailed truck information with categories, ratings, and image galleries.
    -   Interactive buttons for menu, directions, and truck-specific views.
-   **Search Page Integrated**:
    -   Recommended truck lists rendered out.
	-	Search by category rendered out.

---

## Current Project Directory Structure 🗂️

```
FOODTRUCK-APP
│
│── .expo                    	# This folder automatically appears when a dev server is ran
│
│── android                  	# This folder automatically appears when an android prebuild is created
│
│── ios                      	# This folder automatically appears when an ios prebuild is created
│
├── app
|   ├── (auth)               	# Tab layout and related screens
│   │   ├── _layout.tsx      	# Auth layout file
│   │   ├── create.tsx       	# Create Account screen
|	|	└── login.tsx         	# Login Screen
│   ├── (tabs)               	# Tab layout and related screens
│   │   ├── _layout.tsx      	# Tab layout file
│   │   ├── index.tsx        	# Home screen
│   │   ├── profile.tsx      	# Profile screen
│   │   ├── search.tsx       	# Search screen
|	|	└── test.tsx         	# Test Screen
│   ├── _layout.tsx          	# Root layout
│   └── index.tsx          	    # Root Screen (just for navigation)
│
├── assets                   	# Static assets
│   ├── fonts                	# Fonts used in the application
│   ├── images
│   |   ├── favicon.png
│   |   ├── icon.png
│   |   ├── sign-in-bg.jpg   	# Background image for Sign-In and Sign-Up screens
│   |   └── truckImages      	# Images of food trucks
│	└── theme.ts				# Global theme file
|
├── components               	# Reusable UI components
│   ├── buttons
│   |   ├── LargeIconButton.tsx	# Renders the large buttons in profile page
|	|	└── StandardButton.tsx	# Standard Button component with preset styles
│   ├── cards
│   |   ├── FlatListCard.tsx	# White labeled card with box shadow, takes in a title and children
│   |   ├── ItemCard.tsx		# Renders a food item with name, price, description, and image
│   |   ├── TruckCard.tsx		# Renders a fullsize food truck card
│   |   └── TruckCardSmall.tsx	# Renders a small food truck card
│   ├── indexPage
│   |   ├── NearbyTrucks.tsx	# Renders the nearby trucks expandable card
│   |   └── SelectedTruck.tsx	# Renders the selected truck card
│   ├── inputs
│   |   ├── TextInputFancy.tsx		# TextInput with our Signature Styling
│   |   └── TextInputStandard.tsx	# General TextInput component
│   ├── lists
|	|	└── TruckCardList.tsx	# Renders a list of small truck cards
│   ├── modals
│   |   ├── CategoryModal.tsx	# Renders the category selection modal
│   |   ├── MenuModal.tsx		# Renders the truck menu
│   |   └── TruckModal.tsx		# Renders the full truck modal
│   └── navigation
│       └── InitialLayout.tsx	# Used for auth navigation handling throughout app
│   ├── profilePage
│   |   ├── AchievementSection.tsx	# Renders the achievement section
│   |   └── ProfileHeader.tsx	    # Renders the profile header
│   └── search
│       └── SearchBar.tsx		# Renders the google autocomplete map searchbar
|
├── docs					 	# Markdown Documentation
|   └── styling.md           	# Guide for styling
│
├── node_modules             	# Automatically appears when npm and expo is initialized
│
├── store                    	# Contains Zustand custom hooks
│   ├── useFilterStore.tsx   	# State management for selected category filters
│   ├── useMapLayerStore.tsx 	# State management for selected map layer style
│   ├── useMenuModalStore.tsx   # State management for menu toggle
│   └── useTruckStore.tsx    	# State management for selected truck on map
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

-   **Node.js** (Latest stable version recommended)
-   **Expo CLI** (or use `npx expo` commands, preferred)
-   **Git** (for version control)
-   **Android Studio** (for android emulator/android prebuilds)
-   **XCode/Mac** (for ios emulator/ios prebuilds)

---

### Installation

#### WARNINGS:

1. MAKE SURE THE REPO IS NOT WITHIN A LONG PATH ON YOUR MACHINE
2. MAKE SURE THE REPO IS NOT WITHIN A ONEDRIVE OR DROPBOX SYNCED FOLDER

3. Clone the repository:

    ```bash
    git clone https://github.com/juan-phzy/foodtruck-app.git
    cd munchmap
    ```

4. Install dependencies:

    ```bash
    npm install
    ```

5. Install Expo dependencies:

    ```bash
    npx expo install
    ```

6. Set up your `.env.local` file with your Google API & Mapbox Key:

    ```env
    EXPO_PUBLIC_GOOGLE_MAPS_API_KEY=your-google-api-key
    EXPO_PUBLIC_MAPBOX_KEY=your-mapbox-key
    ```

7. Set up your `.expo-env.d.ts` file for expo env definition:

    ```env
    /// <reference types="expo/types" />
    // NOTE: This file should not be edited and should be in your git ignore
    ```

8. Run expo doctor to ensure all dependencies are compatible:
    ```bash
    npx expo-doctor
    ```

---

### Running the App

#### WARNINGS

1. Expo GO is NOT supported for this project.
2. Prebuilds are NECESSARY to run the project

3. Create a prebuild if android or ios folder is not present within your project:

    ```bash
    npx expo prebuild --clean
    ```

4. Choose a platform and emulator to run the app:
	- Your emulator MUST have a screen size of 5". This is due to the react-native-size-matters dependency.
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

5. **User Location**:
	- If you stray far on the map, press the location icon next to the search bar to move back to your device's location

6. **Map Style**:
	- Toggle different map styles such as satellite, street, dark, and light by pressing the layers icon next to the search bar on the map

---

## Key Technologies Used 🛠️

-   **React Native**: Framework for building mobile applications.
-   **Expo**: Development environment for React Native apps.
-   **TypeScript**: Typed JavaScript for improved developer experience.
-   **Expo Router**: Simplified navigation with file-based routing.
-   **Google Places API**: Integrated location search functionality.
-   **Expo Blur**: Background blur effects.
-   **Expo Linear Gradient**: Stylish gradient overlays.
-   **rnmapbox**: Interactive map rendering.
-	**react-native-size-matters**: Auto scales sizing for consistent design across all screen sizes.
-	**Convex**: All in one backend
-	**Clerk**: Authentication

---

## Team Members 👥

| Name             | Role                                      |
| ---------------- | ----------------------------------------- |
| Cheuk Tung Ho    | Front-End Dev, Design Researcher          |
| Elijah Ewers     | Front-End Dev                             |
| Ghalia Azam      | Backend Developer & Researcher            |
| Juan Hernandez   | Project Manager, Lead Developer, Designer |
| Krinal Kathiriya | Front-End Dev                             |

Contact the Lead at jherna50@nyit.edu or jp.hernandez.yz@gmail.com
