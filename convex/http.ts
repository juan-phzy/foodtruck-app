// http.ts
import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { Webhook } from "svix";
import { api } from "./_generated/api";

const http = httpRouter();

http.route({
    path: "/clerk-webhook",
    method: "POST",
    handler: httpAction(async (ctx, request) => {
        const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
        if (!webhookSecret) {
            throw new Error(
                "Missing CLERK_WEBHOOK_SECRET environment variable"
            );
        }

        const headers = extractHeaders(request);
        if (!headers) {
            return new Response("Missing Svix headers", { status: 400 });
        }

        const payload = await request.json();
        const evt: any = verifyWebhook(webhookSecret, payload, headers);
        if (!evt) {
            return new Response("Verification failed", { status: 400 });
        }

        if (evt.type === "user.created") {
            const response = await handleUserCreated(ctx, evt.data);
            if (response) return response;
        }

        return new Response("Webhook processed successfully", { status: 200 });
    }),
});

function extractHeaders(request: Request) {
    const svix_id = request.headers.get("svix-id");
    const svix_signature = request.headers.get("svix-signature");
    const svix_timestamp = request.headers.get("svix-timestamp");

    if (!svix_id || !svix_signature || !svix_timestamp) {
        return null;
    }

    return {
        "svix-id": svix_id,
        "svix-signature": svix_signature,
        "svix-timestamp": svix_timestamp,
    };
}

function verifyWebhook(
    secret: string,
    payload: any,
    headers: Record<string, string>
) {
    const body = JSON.stringify(payload);
    const wh = new Webhook(secret);

    try {
        return wh.verify(body, headers);
    } catch (err) {
        console.error("Error verifying webhook:", err);
        return null;
    }
}

async function handleUserCreated(ctx: any, data: any) {
    const {
        id,
        email_addresses,
        first_name,
        last_name,
        phone_numbers,
        unsafe_metadata,
    } = data;

    const emailVal =
        Array.isArray(email_addresses) && email_addresses.length > 0
            ? email_addresses[0].email_address
            : null;

    if (!emailVal) {
        console.error("Missing email in Clerk payload:", data);
        return new Response("Invalid email data", { status: 400 });
    }

    const phoneVal =
        Array.isArray(phone_numbers) && phone_numbers.length > 0
            ? phone_numbers[0].phone_number
            : "";

    const role = unsafe_metadata?.role;

    if (!role || (role !== "public" && role !== "vendor")) {
        console.error("Invalid or missing user role:", unsafe_metadata);
        return new Response("Invalid role in metadata", { status: 400 });
    }

    try {
        if (role === "public") {
            await ctx.runMutation(api.users.createUser, {
                first_name: first_name ?? "",
                last_name: last_name ?? "",
                phone_number: phoneVal,
                email: emailVal,
                dob: "", // Optional DOB fallback
                clerkId: id,
            });
        } else if (role === "vendor") {
            await ctx.runMutation(api.vendors.createVendor, {
                first_name: first_name ?? "",
                last_name: last_name ?? "",
                phone_number: phoneVal,
                email: emailVal,
                dob: "", // Optional DOB fallback
                clerkId: id,
            });
        }
    } catch (err) {
        console.error("Error creating user/vendor:", err);
        return new Response("Error creating user/vendor", { status: 500 });
    }

    return null;
}

export default http;
