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
      throw new Error("Missing CLERK_WEBHOOK_SECRET environment variable");
    }

    const svix_id = request.headers.get("svix-id");
    const svix_signature = request.headers.get("svix-signature");
    const svix_timestamp = request.headers.get("svix-timestamp");

    if (!svix_id || !svix_signature || !svix_timestamp) {
      return new Response("Error occurred -- missing svix headers", {
        status: 400,
      });
    }

    const payload = await request.json();
    const body = JSON.stringify(payload);

    const wh = new Webhook(webhookSecret);
    let evt: any;

    try {
      evt = wh.verify(body, {
        "svix-id": svix_id,
        "svix-signature": svix_signature,
        "svix-timestamp": svix_timestamp,
      });
    } catch (err) {
      console.error("Error verifying webhook:", err);
      return new Response("Error occurred", { status: 400 });
    }

    const eventType = evt.type;
    if (eventType === "user.created") {
      // Update destructuring to use the correct property names
      const { id, email_addresses, first_name, last_name, phone_numbers } = evt.data;

      // Safely extract email value from email_addresses array:
      const emailVal =
        Array.isArray(email_addresses) && email_addresses.length > 0
          ? email_addresses[0].email_address
          : null;
      if (!emailVal) {
        console.error("Email data is missing or invalid in the event payload", evt.data);
        return new Response("Invalid email data", { status: 400 });
      }

      // Safely extract phone value from phone_numbers array:
      const phoneVal =
        Array.isArray(phone_numbers) && phone_numbers.length > 0
          ? phone_numbers[0].phone_number
          : "";
      
      try {
        await ctx.runMutation(api.users.createUser, {
          first_name: first_name,
          last_name: last_name,
          phone_number: phoneVal,
          email: emailVal,
          password: "", // Provide a placeholder or a generated password as needed
          dob: "",      // Provide a placeholder if dob is not available
          clerkId: id,
        });
      } catch (error) {
        console.error("Error creating user:", error);
        return new Response("Error creating user", { status: 500 });
      }
    }

    return new Response("Webhook processed successfully", { status: 200 });
  }),
});

export default http;
