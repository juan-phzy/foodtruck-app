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
    distance: number;
    menu: ItemCategory[];
  }

  export interface ItemCategory {
    category: string;
    items: Item[];
  }

  export interface Item {
    name: string;
    description: string;
    price: number;
    imageUrl: string;
  }
  
  // types.ts

export interface Rating {
  truckId: string; // ID of the food truck
  rating: number; // Rating given by the user (e.g., 1-5 stars)
  review?: string; // Optional review text
}

export type UserProfile = {
  id: string;
  name: string;
  email: string;
  phone: string;
  munchLevel: number;
  favoriteTrucks: string[];
  reviews: string[];
  recentlyViewed: string[];
  favoriteCategories: string[];
};
