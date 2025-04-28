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
        dob: v.optional(v.string()),
        business_Id: v.optional(v.string()),
        is_onboarded: v.boolean(),
    })
        .index("by_clerk_id", ["clerkId"])
        .index("by_email", ["email"])
        .index("by_phone", ["phone_number"]),

    businesses: defineTable({
        // Identifiers
        business_name: v.string(),
        clerkId: v.string(), // Clerk ID of the organization
        vendor_clerk_id: v.string(), // or v.id("vendors") if you want to enforce ref integrity

        // About the business
        categories: v.optional(v.array(v.string())), // Categories of the business
        description: v.optional(v.string()),
        phone_number: v.optional(v.string()),
        logo_url: v.optional(v.string()), // could be used for branding
        cover_photo_url: v.optional(v.string()), // optional banner/hero image
        primary_city: v.optional(v.string()),

        // Social media
        website: v.optional(v.string()),
        instagram_link: v.optional(v.string()),
        twitter_link: v.optional(v.string()),
        facebook_link: v.optional(v.string()),
        email_link: v.optional(v.string()),
    })
        .index("by_vendor", ["vendor_clerk_id"])
        .index("by_city", ["primary_city"])
        .index("by_business_name", ["business_name"])
        .index("by_clerk_id", ["clerkId"]),

    // Trucks Table
    trucks: defineTable({
        truck_name: v.string(),
        business_clerk_id: v.string(),
        business_convex_id: v.id("businesses"),
        location: v.optional(v.string()),
        latitude: v.optional(v.number()),
        longitude: v.optional(v.number()),
        menu_id: v.optional(v.string()),
        open_status: v.boolean(),
        rating: v.optional(v.number()),
        categories: v.optional(v.array(v.string())),
        truck_type: v.union(v.literal("Stationary"), v.literal("Mobile")),
        schedule:
            v.array(
                v.object({
                    day: v.string(),
                    start_time: v.string(),
                    end_time: v.string(),
                    closed: v.boolean(),
                })
            ),
    })
        .index("by_business_convex_id", ["business_convex_id"])
        .index("by_business_clerk_id", ["business_clerk_id"]),
        
    // Stands Table
    stands: defineTable({
        stand_name: v.string(),
        business_clerk_id: v.string(),
        business_convex_id: v.id("businesses"),
        location: v.optional(v.string()),
        latitude: v.optional(v.number()),
        longitude: v.optional(v.number()),
        menu_id: v.optional(v.string()),
        open_status: v.boolean(),
        
        stand_type: v.union(v.literal("Stationary"), v.literal("Mobile")),

        schedule:
            v.array(
                v.object({
                    day: v.string(),
                    start_time: v.string(),
                    end_time: v.string(),
                    closed: v.boolean(),
                })
            ),
    })
        .index("by_business_convex_id", ["business_convex_id"])
        .index("by_business_clerk_id", ["business_clerk_id"]),

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
