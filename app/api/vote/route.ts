import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export async function POST(req: Request) {

  const {userId} = auth()

  if(!userId){
    redirect('/')
  }

  try {
    const { event_id, candidate_id } = await req.json();
  
    // Check if the user has already voted for the same event
    const existingVote = await prisma.voting.findFirst({
      where: {
        voter_id: userId,
        event_id: event_id,
      },
    });
  
    if (existingVote) {
      // User has already voted for this event, do not insert again
      return new NextResponse("User has already voted for this event", { status: 400 });
    }
  
    // User hasn't voted for this event, proceed with inserting the new vote
    const newEvent = await prisma.voting.create({
      data: {
        voter_id: userId,
        event_id,
        candidate_id,
      },
    });
  
    return NextResponse.json(newEvent);
  } catch (error) {
    console.error("[Create Event]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}  