import { mutation, MutationCtx, query, QueryCtx } from "./_generated/server";
import { v } from "convex/values";

// Create Truck
export const createTruck = mutation({
    args: {
        truck_id: v.string(),
        truck_name: v.string(),
        vendor_id: v.string(),
        latitude: v.number(),
        longitude: v.number(),
        menu_id: v.string(),
        open_status: v.boolean(),
        schedule: v.object({
            days: v.array(v.string()),
            times: v.array(v.string()),
        }),
        truck_type: v.string(), // Stationary or Mobile
    },

    handler: async (ctx, args) => {
        const existingTruck = await ctx.db
            .query("trucks")
            .withIndex("by_vendor", (q) => q.eq("vendor_id", args.vendor_id))
            .first();
        if (existingTruck) return;

        await ctx.db.insert("trucks", {
            truck_id: args.truck_id,
            truck_name: args.truck_name,
            vendor_id: args.vendor_id,
            latitude: args.latitude,
            longitude: args.longitude,
            menu_id: args.menu_id,
            open_status: args.open_status,
            schedule: args.schedule,
            truck_type: args.truck_type,
        });
    },
});

// Get All Trucks for a Vendor
export const getTrucksByVendorId = query({
    args: { vendor_id: v.string() },
    handler: async (ctx, args) => {
        const trucks = await ctx.db
            .query("trucks")
            .withIndex("by_vendor", (q) => q.eq("vendor_id", args.vendor_id))
            .collect();
        return trucks;
    },
});

// Get Authenticated Vendor’s Trucks (if you're using auth)
export async function getAuthenticatedVendorTrucks(
    ctx: QueryCtx | MutationCtx
) {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    const vendor = await ctx.db
        .query("vendors")
        .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
        .first();

    if (!vendor) throw new Error("Vendor not found");

    const trucks = await ctx.db
        .query("trucks")
        .withIndex("by_vendor", (q) => q.eq("vendor_id", vendor._id))
        .collect();

    return trucks;
}
