import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    users: defineTable({
        first_name: v.string(),
        last_name: v.string(),
        phone_number: v.string(),
        email: v.string(),
        dob: v.optional(v.string()),
        munchLevel: v.optional(v.float64()),
        primary_city: v.string(),
        clerkId: v.string(),
        selectedCategories: v.optional(v.array(v.string())),
    }).index("by_clerk_id", ["clerkId"]),

    // Vendors Table
    vendors: defineTable({
        clerkId: v.string(),
        first_name: v.string(),
        last_name: v.string(),
        phone_number: v.string(),
        email: v.string(),
        primary_city: v.optional(v.string()),
        dob: v.optional(v.string()),
        business_name: v.optional(v.string()),
        business_certificates: v.optional(v.array(v.string())), // Store file URLs
        instagram_link: v.optional(v.string()),
        email_link: v.optional(v.string()), // public business email
        twitter_link: v.optional(v.string()),
        facebook_link: v.optional(v.string()),
    })
        .index("by_clerk_id", ["clerkId"])
        .index("by_email", ["email"])
        .index("by_phone", ["phone_number"]),

    // Vendor Subaccounts
    vendor_subaccounts: defineTable({
        subaccount_id: v.string(),
        vendor_id: v.string(),
        first_name: v.string(),
        last_name: v.string(),
        email: v.string(),
        password: v.string(),
    }).index("by_vendor", ["vendor_id"]),

    // Trucks Table
    trucks: defineTable({
        truck_name: v.string(),
        vendor_id: v.string(),
        latitude: v.number(),
        longitude: v.number(),
        menu_id: v.optional(v.string()),
        open_status: v.boolean(),
        schedule: v.object({
            days: v.array(v.string()),
            times: v.array(v.string()),
        }), // Example: {days: ['Mon', 'Tue'], times: ['10AM-6PM']}
        truck_type: v.string(), // Stationary or Mobile
    }).index("by_vendor", ["vendor_id"]),

    // Stands Table
    stands: defineTable({
        stand_id: v.string(),
        stand_name: v.string(),
        vendor_id: v.string(),
        latitude: v.number(),
        longitude: v.number(),
        menu_id: v.string(),
        open_status: v.boolean(),
        schedule: v.object({
            days: v.array(v.string()),
            times: v.array(v.string()),
        }),
    }).index("by_vendor", ["vendor_id"]),

    // Ratings Table
    ratings: defineTable({
        rating_id: v.string(),
        user_id: v.string(),
        entity_id: v.string(),
        rated_entity: v.union(v.literal("truck"), v.literal("stand")), // ENUM-like structure
        rating: v.float64(), // Decimal rating (1.0 - 5.0)
        created_at: v.number(),
    })
        .index("by_user", ["user_id"])
        .index("by_entity", ["entity_id"]),

    // User Favorite Trucks
    user_favorite_trucks: defineTable({
        user_id: v.string(),
        truck_id: v.string(),
        created_at: v.number(),
    })
        .index("by_user", ["user_id"])
        .index("by_truck", ["truck_id"]),

    // Vendor Trucks
    vendor_trucks: defineTable({
        vendor_id: v.string(),
        truck_id: v.string(),
    })
        .index("by_vendor", ["vendor_id"])
        .index("by_truck", ["truck_id"]),

    // Truck Categories
    truck_categories: defineTable({
        truck_id: v.string(),
        category_name: v.string(),
    }).index("by_truck", ["truck_id"]),

    // Stand Categories
    stand_categories: defineTable({
        stand_id: v.string(),
        category_name: v.string(),
    }).index("by_stand", ["stand_id"]),

    // Stand Ratings
    stand_ratings: defineTable({
        user_id: v.string(),
        stand_id: v.string(),
        rating: v.float64(),
        review: v.string(),
        created_at: v.number(),
    })
        .index("by_stand", ["stand_id"])
        .index("by_user", ["user_id"]),
});

// webhooks - automated message that are sent when something happens.
// user.created - event in clerk
// we listen to the event once
