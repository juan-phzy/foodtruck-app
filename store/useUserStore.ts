import { create } from "zustand";
import { useEffect } from "react";
import { useUser } from "@clerk/clerk-expo";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

// Type for your custom user profile
type UserProfile = {
    id: string;
    name: string;
    email: string;
    phone: string;
    password: string;
    munchLevel: number;
    favoriteTrucks: string[];
    reviews: string[];
    recentlyViewed: string[];
    favoriteCategories: string[];
};

type UserStore = {
    profile: UserProfile | null;
    isLoading: boolean;
    setProfile: (profile: UserProfile) => void;
    setLoading: (loading: boolean) => void;
};

export const useUserStore = create<UserStore>((set) => ({
    profile: null,
    isLoading: true,
    setProfile: (profile) => set({ profile }),
    setLoading: (isLoading) => set({ isLoading }),
}));

export const useInitUserProfile = () => {
    const { user } = useUser();
    const { setProfile, setLoading } = useUserStore();

    const convexUser = useQuery(api.getUserProfile.getUserProfile, {
        userId: user?.id ?? "",
    });
    console.log("Fetched user from Convex:", convexUser);
    if (convexUser === undefined) {
        console.log("Query is loading...");
    } else if (convexUser === null) {
        console.log("Query returned null.");
    } else {
        console.log("Query returned data:", convexUser);
    }

    useEffect(() => {
        if (!user) return;

        console.log("Initializing user profile...");
        setLoading(true);

        if (convexUser) {
            setProfile(convexUser);
            setLoading(false);
        }
    }, [user, convexUser]);
};
