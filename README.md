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
│   │   └── sign-in.tsx      # Sign-In screen
│   └── create-account.tsx   # Sign-Up screen
│
├── components               # Reusable UI components
│   ├── CustomButton.tsx
│   ├── CustomTextInput.tsx
│   ├── IconButton.tsx
│
├── assets                   # Static assets
│   ├── images
│   │   └── sign-in-bg.jpg   # Background image for Sign-In and Sign-Up screens
│   └── fonts                # Fonts used in the application
│
├── theme                    # Theme and styling variables
│   └── theme.ts
│
├── storage                  # Local storage utilities
│   └── useStorageState.ts
│
├── context                  # Context for authentication
│   └── ctx.tsx
│
└── README.md                # Project documentation
```

---

## Getting Started 🛠️

Follow these instructions to set up and run the project locally.

### Prerequisites

- **Node.js** (Latest stable version recommended)
- **Expo CLI** (or use `npx expo` commands, I personally only use npx expo commands and it's worked very easily so far)
- **Git** (for version control)

---

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo-url/munchmap.git
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
   - The backend is not yet set up so you can access the app by simply pressing Sign In or Sign Up

---

## Key Technologies Used 🛠️

- **React Native**: Framework for building mobile applications.
- **Expo**: Development environment for React Native apps.
- **TypeScript**: Typed JavaScript for improved developer experience.
- **Expo Router**: Simplified navigation with file-based routing.
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
