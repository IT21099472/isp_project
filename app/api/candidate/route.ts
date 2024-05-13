import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const { candidate_name, candidate_department, eventID } = await req.json();
    const event = await prisma.event.findFirst({
      // Define your conditions here to find an existing event, or remove this line if you want to always create a new event
    });
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const course = await prisma.candidate.create({
      data: {
        candidate_name,
        candidate_department,
        candidate_photo: "https://utfs.io/f/6406880d-58d0-43fa-bbeb-cbb969ab1895-agf2u3.jpg",
        // event: {
        //   connect: {
        //     event_id: event ? event.event_id : undefined, // Connect to existing event or leave undefined to handle foreign key constraint
        //   },
        // },
        event_id: eventID
      },
    });

    return NextResponse.json(course);

  } catch (error) {
    console.log("[CANDIDATE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
