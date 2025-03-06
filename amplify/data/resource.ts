import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
    Users: a
        .model({
            first_name: a.string(),
            last_name: a.string(),
            phone_number: a.string(),
            email: a.string(),
            dob: a.string(),
            primary_city: a.string(),
        })
        .authorization((allow) => [allow.owner()]),

    Vendors: a
        .model({
            first_name: a.string(),
            last_name: a.string(),
            phone_number: a.string(),
            email: a.string(),
            primary_city: a.string(),
            business_name: a.string(),
            social_links: a.string(),
            business_certificates: a.string(),
        })
        .authorization((allow) => [allow.owner()]),

    VendorSubaccounts: a
        .model({
            vendor_id: a.string(),
            first_name: a.string(),
            last_name: a.string(),
            phone_number: a.string(),
            truck_access: a.string(),
        })
        .authorization((allow) => [allow.owner()]),

    Trucks: a
        .model({
            truck_name: a.string(),
            vendor_id: a.string(),
            latitude: a.float(),
            longitude: a.float(),
            open_status: a.boolean(),
            schedule: a.string(),
            truck_type: a.string(),
            truck_images: a.string(),
            menu: a.string(),
        })
        .authorization((allow) => [allow.owner(), allow.publicApiKey()]),

    Stands: a
        .model({
            stand_name: a.string(),
            vendor_id: a.string(),
            latitude: a.float(),
            longitude: a.float(),
            open_status: a.boolean(),
            schedule: a.string(),
            stand_images: a.string(),
            menu: a.string(),
        })
        .authorization((allow) => [allow.owner(), allow.publicApiKey()]),

    TruckRatings: a
        .model({
            truck_id: a.string(),
            user_id: a.string(),
            rating: a.float(),
            review: a.string(),
            created_at: a.datetime(),
        })
        .authorization((allow) => [allow.owner(), allow.authenticated()]),

    StandRatings: a
        .model({
            stand_id: a.string(),
            user_id: a.string(),
            rating: a.float(),
            review: a.string(),
            created_at: a.datetime(),
        })
        .authorization((allow) => [allow.owner(), allow.authenticated()]),

    GlobalCategories: a
        .model({
            category_name: a.string(),
            description: a.string(),
            image_url: a.string(),
        })
        .authorization((allow) => [allow.publicApiKey()]),

    TruckCategories: a
        .model({
            category_name: a.string(),
            truck_id: a.string(),
        })
        .authorization((allow) => [allow.publicApiKey()]),

    StandCategories: a
        .model({
            category_name: a.string(),
            stand_id: a.string(),
        })
        .authorization((allow) => [allow.publicApiKey()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
    schema,
    authorizationModes: {
        defaultAuthorizationMode: "iam",
    },
});
