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
  const { user } = useUser();
  const { setProfile, setLoading } = useUserStore();

  const convexUser = useQuery(api.getUserProfile.getUserProfile, {
    userId: user?.id ?? "",
  });

  useEffect(() => {
    if (!user) return;

    console.log("⚡ useInitUserProfile triggered");

    setLoading(true);

    if (convexUser) {
      console.log("✅ Convex returned user profile", convexUser);
      setProfile(convexUser);
      setLoading(false);
    }
  }, [user, convexUser]);
};
