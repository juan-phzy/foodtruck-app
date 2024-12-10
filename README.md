# MunchMap 📍🍔

MunchMap is a mobile-first application designed to help users discover nearby food trucks and enjoy a seamless browsing experience. The app features a sleek design, modern UI/UX, and functionality for user authentication, account creation, and personalization.

---

## Current Completed Progress 🚀

- **Sign-In Screen**: Users can log in via phone or email with a beautifully designed interface.  
- **Sign-Up Screen**: Simple and intuitive account creation with fields for personal and contact information.  
- **Dynamic Forms**: Toggle between sign-in options (Phone or Email) with reusable and modular components.  
- **Theming**: Unified theme for consistent design, including primary and secondary colors.  
- **Custom Components**:  
  - `CustomButton`: Fully customizable button styles.  
  - `CustomTextInput`: Reusable input fields with labels and borders.  
  - `IconButton`: Icon-based buttons with labels for alternate sign-in methods.  
- **Blur and Gradient Effects**: Modern design elements such as background blur and gradients.  
- **Food Truck List and Search**:  
  - Dynamically filter food trucks by category.  
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
├── app
│   ├── (tabs)               # Tab layout and related screens
│   │   ├── _layout.tsx      # Tab layout file
│   │   ├── index.tsx        # Home screen
│   │   ├── profile.tsx      # Profile screen
│   │   ├── search.tsx       # Search screen
│   ├── _layout.tsx          # Root layout
│   ├── +not-found.tsx       # Page not found redirect
│   ├── create-account.tsx   # Create Account screen
│   └── Sign-in.tsx          # Sign In Screen
│
├── components               # Reusable UI components
│   ├── CircleButton.tsx
│   ├── CustomButton.tsx
│   ├── CustomTextInput.tsx
│   ├── IconButton.tsx
│   ├── NearbyTrucksCard.tsx
│   ├── SearchBar.tsx
│   ├── SelectedTruckCard.tsx
│   ├── TruckCardList.tsx
│   └── TruckCardSmall.tsx
│
├── assets                   # Static assets
│   ├── images
│   │   ├── favicon.png
│   │   ├── icon.png
│   │   ├── sign-in-bg.jpg   # Background image for Sign-In and Sign-Up screens
│   │   └── truckImages      # Images of food trucks
│   └── fonts                # Fonts used in the application
│
├── theme                    # Theme and styling variables
│   └── theme.ts
│
├── context                  # Context for authentication and state management
│   └── ctx.tsx
│
├── storage                  # Local storage utilities
│   └── useStorageState.ts
│
├── constants.ts             # Shared constants (e.g., category list, initial data)
├── types.ts                 # Type and Interface definitions for data handling
├── expo-env.d.ts            # Environment variable definitions
├── app.json                 # Expo project configuration
├── .env                     # Environment variables
├── .gitignore               # Ignored files for version control
└── README.md                # Project documentation
```

---

## Getting Started 🛠️

Follow these instructions to set up and run the project locally.

### Prerequisites

- **Node.js** (Latest stable version recommended)  
- **Expo CLI** (or use `npx expo` commands, preferred)  
- **Git** (for version control)

---

### Installation

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

4. Set up your `.env` file with your Google API Key:  
   ```env
   EXPO_PUBLIC_GOOGLE_MAPS_API_KEY=your-google-api-key
   ```

---

### Running the App

1. Start the development server:  
   ```bash
   npx expo start
   ```

2. Choose a platform to run the app:  
   - Press `w` to run in the browser (WebView).  
   - Press `a` to run on Android.  
   - Press `i` to run on iOS (requires macOS).

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

4. **Filter Trucks**:  
   - Filter food trucks by categories dynamically.

---

## Key Technologies Used 🛠️

- **React Native**: Framework for building mobile applications.  
- **Expo**: Development environment for React Native apps.  
- **TypeScript**: Typed JavaScript for improved developer experience.  
- **Expo Router**: Simplified navigation with file-based routing.  
- **Google Places API**: Integrated location search functionality.  
- **Expo Blur**: Background blur effects.  
- **Expo Linear Gradient**: Stylish gradient overlays.

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
