import { prisma } from "@/lib/db";
import { clerkClient } from "@clerk/nextjs/server";
import { IncomingHttpHeaders } from "http";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook, WebhookRequiredHeaders } from "svix";

const webhookSecret = process.env.WEBHOOK_SECRET || "";

async function handler(request: Request) {
  const payload = await request.json();
  const headersList = headers();
  const heads = {
    "svix-id": headersList.get("svix-id"),
    "svix-timestamp": headersList.get("svix-timestamp"),
    "svix-signature": headersList.get("svix-signature"),
  };
  const wh = new Webhook(webhookSecret);
  let evt: Event | null = null;

  try {
    evt = wh.verify(
      JSON.stringify(payload),
      heads as IncomingHttpHeaders & WebhookRequiredHeaders
    ) as Event;
  } catch (err) {
    console.error((err as Error).message);
    return NextResponse.json({}, { status: 400 });
  }

  // const eventType: EventType = evt.type;
  // if (eventType === "user.created" || eventType === "user.updated") {
  //   const { id, ...attributes } = evt.data;

  //   console.log('data fetched')

  //   await prisma.user.upsert({
  //       where: { externalId: id as string },
  //       create: {
  //         externalId: id as string,
  //         attributes,
  //       },
  //       update: { attributes },
  //     });
  // }
  const eventType: EventType = evt.type;
  if (eventType === "user.created" || eventType === "user.updated") {
    const { id, first_name, last_name, email_addresses } = evt.data;

    console.log('data fetched');

    if (Array.isArray(email_addresses) && email_addresses.length > 0) {
        const email_address = email_addresses[0].email_address;
        
        await prisma.voter.upsert({
            where: { externalId: id as string },
            create: {
                externalId: id as string,
                first_name: String(first_name),
                last_name: String(last_name),
                email_address: String(email_address),
            },
            update: { first_name: String(first_name) },
        });
    } else {
        console.error('No email address found.');
    }
}

}

type EventType = "user.created" | "user.updated" | "*";

type Event = {
  data: Record<string, string | number>;
  object: "event";
  type: EventType;
};

export const GET = handler;
export const POST = handler;
export const PUT = handler;