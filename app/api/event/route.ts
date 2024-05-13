import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import toast from "react-hot-toast";
export async function GET() {
  try {
    const events = await prisma.event.findMany();
    return NextResponse.json(events);
  } catch (error) {
    console.error("[Get Events]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { event_id, event_name, event_status } = await req.json();

    // Check if there are any active events
    const activeEvents = await prisma.event.findMany({
      where: {
        event_status: true
      }
    });

    if (activeEvents.length > 0 && event_status === true) {
      // If there are active events and the new event status is true, set event_status of new event to false
      const newEvent = await prisma.event.create({
        data: {
          event_id,
          event_name,
          event_status: false, // Set event_status to false
        },
      });

      // Return error message
      return NextResponse.json(newEvent);  
    } else {
      // Insert data
      const newEvent = await prisma.event.create({
        data: {
          event_id,
          event_name,
          event_status,
        },
      });

      // Return new event
      return NextResponse.json(newEvent);
    }
  } catch (error) {
    console.error("[Create Event]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
