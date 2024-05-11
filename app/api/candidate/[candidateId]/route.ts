import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function DELETE(
  req: Request,
  { params }: { params: { candidateId: number } }
) {
  try {
    const { userId } = auth()
    const {candidateId} = params
    const cID = parseInt(candidateId)
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const event = await prisma.candidate.findUnique({
      where: {
        candidate_id: cID,
      },
      include: {
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
      candidate_id: cID,
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


   
    const deletedCourse = await prisma.candidate.delete({
      where: {
        candidate_id: cID,
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
  { params }: { params: { candidateId: number } }
) {
  try {
    const { userId } = auth();
    const {candidateId} = params
    const cID = parseInt(candidateId);
    const values = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const event = await prisma.candidate.update({
      where: {
        candidate_id: cID,
      },
      data: {
        candidatus_status: values.candidate_status, // Correct field name to event_name
        candidate_department : values.candidate_department,
        candidate_photo: values.candidate_photo,}
    });

    return new NextResponse(JSON.stringify(event), { status: 200 });
  } catch (error) {
    console.log("[EVENT_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
