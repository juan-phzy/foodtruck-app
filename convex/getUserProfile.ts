import { query } from "./_generated/server";
import { v } from "convex/values";

export const getUserProfile = query({
    args: { userId: v.string() },
    handler: async (ctx, args) => {
        if (!args.userId || args.userId.trim() === "") {
            console.log("🛑 getUserProfile called with empty userId");
            return null;
        }

        const userDoc = await ctx.db
            .query("users")
            .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.userId))
            .first();

        if (!userDoc) {
            console.log(`🔍 No user found for clerkId: ${args.userId}`);
            return null;
        }

        return {
            id: userDoc._id,
            name: `${userDoc.first_name} ${userDoc.last_name}`.trim(),
            email: userDoc.email,
            phone: userDoc.phone_number,
            munchLevel: userDoc.munchLevel ?? 0,
            favoriteTrucks: [],
            reviews: [],
            recentlyViewed: [],
            favoriteCategories: [],
        };
    },
});
