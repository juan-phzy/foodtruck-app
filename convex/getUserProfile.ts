import { query } from "./_generated/server";
import { v } from "convex/values";

export const getUserProfile = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const userDoc = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.userId))
      .first();

    if (!userDoc) return null;

    return {
      id: userDoc._id,
      name: `${userDoc.first_name} ${userDoc.last_name}`.trim(),
      email: userDoc.email,
      phone: userDoc.phone_number,
      password: userDoc.password ?? "",
      munchLevel: userDoc.munchLevel ?? 0,
      favoriteTrucks: [],
      reviews: [],
      recentlyViewed: [],
      favoriteCategories: [],
    };
  },
});

