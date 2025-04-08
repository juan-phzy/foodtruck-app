import { create } from "zustand";
import { useEffect } from "react";
import { useUser } from "@clerk/clerk-expo";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { UserProfile } from "@/types"; // ✅ Use centralized type

type UserStore = {
    profile: UserProfile | null;
    isLoading: boolean;
    setProfile: (profile: UserProfile) => void;
    setLoading: (loading: boolean) => void;
};

export const useUserStore = create<UserStore>((set) => ({
    profile: null,
    isLoading: true,
    setProfile: (profile) => {
        console.log("✅ Zustand: setting user profile", profile);
        set({ profile });
    },
    setLoading: (isLoading) => set({ isLoading }),
}));

export const useInitUserProfile = () => {
    const { user, isLoaded } = useUser();
    console.log("Clerk status:", isLoaded, user?.id);
    const { setProfile, setLoading, profile, isLoading } = useUserStore();

    const convexUser = useQuery(
        api.getUserProfile.getUserProfile,
        user?.id ? { userId: user.id } : "skip"
    );

    useEffect(() => {
        if (!user) return;

        setLoading(true);

        if (convexUser !== undefined) {
            if (convexUser) {
                setProfile(convexUser);
            } else {
                console.warn("No user profile found");
            }
            setLoading(false);
        }
    }, [user, convexUser]);

    console.log("Clerk user:", user?.id); // Ensure user.id is there
    console.log("Convex user profile:", convexUser); // See if it's ever returned
    console.log("useUserStore state:", profile?.id, isLoading); // Zustand state sanity check
};
