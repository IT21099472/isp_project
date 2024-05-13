import { prisma } from "@/lib/db";

const getCandidateWithHighestVotes = async () => {
  try {
    // Find active events
    const activeEvents = await prisma.event.findMany({
      where: {
        event_status: true,
      },
      select: {
        event_id: true,
      },
    });

    // Get candidate votes for each active event
    const candidatesWithVotes = await Promise.all(
      activeEvents.map(async (event) => {
        const candidateVotes = await prisma.voting.groupBy({
          by: ["candidate_id"],
          _count: {
            voting_id: true,
          },
          where: {
            event_id: event.event_id,
          },
        });

        return candidateVotes.map((candidateVote) => ({
          candidate_id: candidateVote.candidate_id,
          voteCount: candidateVote._count.voting_id,
        }));
      })
    );

    // Find the candidate with the highest votes among all active events
    let candidateWithHighestVotes = null;
    let highestVoteCount = 0;

    candidatesWithVotes.forEach((eventCandidates) => {
      eventCandidates.forEach((candidate) => {
        if (candidate.voteCount > highestVoteCount) {
          highestVoteCount = candidate.voteCount;
          candidateWithHighestVotes = candidate.candidate_id;
        }
      });
    });

    // Fetch candidate details
    if (candidateWithHighestVotes !== null) {
      const candidate = await prisma.candidate.findUnique({
        where: {
          candidate_id: candidateWithHighestVotes,
        },
        select: {
          candidate_name: true, // Select the candidate's name
        },
      });

      console.log("Candidate with the highest number of votes:", candidate);
      return candidate ? candidate.candidate_name : null; // Return the candidate's name
    } else {
      console.log("No candidate has votes in active events");
      return null;
    }
  } catch (error) {
    console.error("Error fetching candidate with highest votes:", error);
    throw new Error("Error fetching candidate with highest votes");
  }
};

export default getCandidateWithHighestVotes;
