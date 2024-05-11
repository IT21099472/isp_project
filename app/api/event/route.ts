import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

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
    const { event_name, event_status } = await req.json();
    const newEvent = await prisma.event.create({
      data: {
        event_name,
        event_status,
      },
    });
    return NextResponse.json(newEvent);
  } catch (error) {
    console.error("[Create Event]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
