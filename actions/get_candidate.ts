import { Candidate , Event } from "@prisma/client";
import { prisma } from "@/lib/db";

type CandidateWithEvent = Candidate & {
  event: Event | null;
};

type GetCandidates = {
  candidate_name?: string;
  event_id?: string;
};

export const getCandidates = async ({
  candidate_name,
  event_id
}: GetCandidates): Promise<CandidateWithEvent[]> => {
  try {
    const candidates = await prisma.candidate.findMany({
      where:{
        candidate_name:{
          contains: candidate_name
        },
        event_id: event_id ? parseInt(event_id) : undefined,
      },
      include: {
        event: true
      }
    });
    return candidates;
  } catch (error) {
    throw new Error(`Failed to fetch candidates: ${error}`);
  }
};

