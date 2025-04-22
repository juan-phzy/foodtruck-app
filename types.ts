// types.ts

import { Id } from "./convex/_generated/dataModel";

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

export interface Rating {
    truckId: string; // ID of the food truck
    rating: number; // Rating given by the user (e.g., 1-5 stars)
    review?: string; // Optional review text
}

//------------- FINAL PRODUCTION TYPES ------------------

// Google Autocomplete Types
export interface GoogleAutocompleteResponse {
    suggestions: Suggestion[];
}

export interface Suggestion {
    placePrediction: PlacePrediction;
}

export interface PlacePrediction {
    placeId: string;
    structuredFormat: StructuredFormat;
}

export interface StructuredFormat {
    mainText: {
        text: string;
        matches: { endOffset: number }[];
    };
    secondaryText: {
        text: string;
    };
}

export interface ParsedSuggestion {
    placeId: string;
    mainText: string;
    secondaryText: string;
}

export type Coordinates = {
    latitude: number;
    longitude: number;
};

// Convex Types
export type PublicUserProfile = {
    _id: Id<"users">;
    _creationTime: number;
    dob?: string | undefined;
    munchLevel?: number | undefined;
    first_name: string;
    last_name: string;
    phone_number: string;
    email: string;
    primary_city: string;
    clerkId: string;
    selectedCategories?: string[] | undefined;
};

export type VendorProfile = {
    _id: string;
    _creationTime: number;
    first_name: string;
    last_name: string;
    phone_number: string;
    email: string;
    dob?: string;
    clerkId: string;
};

export type Trucks = {
    truck_name: string;
    vendor_id: string;
    latitude: number;
    longitude: number;
    menu_id?: string | undefined;
    open_status: boolean;
    schedule: {
        days: string[];
        times: string[];
    };
    truck_type: string;
};
