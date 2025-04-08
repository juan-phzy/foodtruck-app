// users.ts
import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const createUser = mutation({
  args: {
    first_name: v.string(),
    last_name: v.string(),
    phone_number: v.string(), // Optional
    email: v.string(),
    password: v.string(),     // Hashed password
    dob: v.optional(v.string()),
    clerkId: v.string(),      // Connects Clerk and Convex
  },

  handler: async (ctx, args) => {
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .first();

    if (existingUser) return;

    await ctx.db.insert("users", {
      first_name: args.first_name,
      last_name: args.last_name,
      phone_number: args.phone_number,
      email: args.email,
      password: args.password,
      dob: args.dob,
      clerkId: args.clerkId,
      user_id: "",
      primary_city: "",
      munchLevel: 0,
    });
  },
}); 
