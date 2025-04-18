// users.ts
import { mutation, MutationCtx, query, QueryCtx } from "./_generated/server";
import { v } from "convex/values";

export const createUser = mutation({
    args: {
        first_name: v.string(),
        last_name: v.string(),
        phone_number: v.string(), // Optional
        email: v.string(),
        dob: v.optional(v.string()),
        clerkId: v.string(), // Connects Clerk and Convex
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
            dob: args.dob,
            clerkId: args.clerkId,
            primary_city: "",
            munchLevel: 0,
        });
    },
});

export const getUserByClerkId = query({
    args: { clerkId: v.string() },
    handler: async (ctx, args) => {
        const user = await ctx.db
            .query("users")
            .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
            .unique();
        return user;
    },
});

export async function getAuthenticatedUser(ctx: QueryCtx | MutationCtx) {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    const currentUser = await ctx.db
        .query("users")
        .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
        .first();

    if (!currentUser) throw new Error("User not found");

    return currentUser;
}

export const updateFirstAndLastName = mutation({
    args: {
        clerkId: v.string(),
        first_name: v.string(),
        last_name: v.string(),
    },
    handler: async (ctx, args) => {
        const user = await ctx.db
            .query("users")
            .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
            .unique();

        if (!user) {
            throw new Error("User not found");
        }

        await ctx.db.patch(user._id, {
            first_name: args.first_name,
            last_name: args.last_name,
        });
    },
});

export const updateDOB = mutation({
    args: {
        clerkId: v.string(),
        dob: v.string(),
    },
    handler: async (ctx, args) => {
        const user = await ctx.db
            .query("users")
            .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
            .unique();

        if (!user) {
            throw new Error("User not found");
        }

        await ctx.db.patch(user._id, {
            dob: args.dob,
        });
    },
});
