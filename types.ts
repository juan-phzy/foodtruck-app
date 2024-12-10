// types.ts

export interface Coordinates {
    latitude: number;
    longitude: number;
  }
  
  export interface Hours {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  }
  
  export interface Contact {
    email: string;
    social: {
      instagram: string;
      facebook: string;
      twitter: string;
    };
  }
  
  export interface FoodTruck {
    id: string;
    name: string;
    categories: string[];
    location: string;
    type: "Stationary" | "Mobile";
    coordinates: Coordinates;
    hours: Hours;
    rating: number;
    reviewCount: number;
    contact: Contact;
    isOpen: boolean;
    imageUrl: string;
    images: string[];
  }
  
  // types.ts

export interface Rating {
  truckId: string; // ID of the food truck
  rating: number; // Rating given by the user (e.g., 1-5 stars)
  review?: string; // Optional review text
}

export interface User {
  phoneNumber: string; // User's phone number
  firstName: string; // User's first name
  lastName: string; // User's last name
  dateOfBirth: Date; // User's date of birth
  password: string; // User's password (hashed ideally)
  username: string; // Unique username for the user
  favoriteTrucks: FoodTruck[]; // List of favorite food trucks
  recentlyViewedTrucks: FoodTruck[]; // List of recently viewed food trucks
  ratings: Rating[]; // List of ratings and reviews the user has given
  favoriteCategories: string[]; // List of favorite food categories (e.g., Burgers, Pizza)
}
