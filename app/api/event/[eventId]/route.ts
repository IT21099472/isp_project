import Mux from "@mux/mux-node";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { prisma } from "@/lib/db";

export async function DELETE(
  req: Request,
  { params }: { params: { eventId: number } }
) {
  try {
    const { userId } = auth()
    const {eventId} = params
    const eID = parseInt(eventId)
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const event = await prisma.event.findUnique({
      where: {
        event_id: eID,
      },
      include: {
        candidates: true, // Include related candidates
        votings: true,    // Include related votings
      },
    });
    

    if (!Event) {
      return new NextResponse("Not found", { status: 404 });
    }

    // First, find all votings associated with the candidates you want to delete
const votingsToDelete = await prisma.voting.findMany({
  where: {
    candidate: {
      event_id: eID,
    },
  },
  select: {
    voting_id: true,
  },
});

// Extract the IDs of the votings to be deleted
const votingIds = votingsToDelete.map(voting => voting.voting_id);

// Then, delete the votings
await prisma.voting.deleteMany({
  where: {
    voting_id: {
      in: votingIds,
    },
  },
});

// Now, you can safely delete the candidates
await prisma.candidate.deleteMany({
  where: {
    event_id: eID,
  },
});

   
    const deletedCourse = await prisma.event.delete({
      where: {
        event_id: eID,
      },
    });

    return NextResponse.json(deletedCourse);
  } catch (error) {
    console.log("[COURSE_ID_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { eventId: number } }
) {
  try {
    const { userId } = auth();
    const { eventId } = params;
    const eID = parseInt(eventId);
    const values = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const existingEventsWirhTrueStatus = await prisma.event.findMany({
      where: {
        event_status: true,
      },
    });
    if (existingEventsWirhTrueStatus.length> 0 && values.event_status === true){
      return new NextResponse("Only one event can have status true", { status: 400 });
    }


    const event = await prisma.event.update({
      where: {
        event_id: eID,
      },
      data: {
        event_name: values.title, // Correct field name to event_name
        event_status: values.event_status, // Ensure event_status is provided
      },
    });

    return new NextResponse(JSON.stringify(event), { status: 200 });
  } catch (error) {
    console.log("[EVENT_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}


