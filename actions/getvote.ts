import { prisma } from "@/lib/db";

// Function to get total vote count
export async function getTotalVoteCount(): Promise<number> {
  try {
    const totalVotes = await prisma.voting.count();
    return totalVotes;
  } catch (error) {
    console.error("Error fetching total vote count:", error);
    throw new Error("Error fetching total vote count");
  }
}

// Function to get number of voters to be voted
export async function getVotersToBeVoted(): Promise<number> {
  try {
    const votersToBeVoted = await prisma.voter.count({
      where: { voting_status: false },
    });
    return votersToBeVoted;
  } catch (error) {
    console.error("Error fetching voters to be voted:", error);
    throw new Error("Error fetching voters to be voted");
  }
}

// Function to get candidate with the highest number of votes
export async function getCandidateWithHighestVotes(): Promise<string | null> {
  try {
    const candidateVotes = await prisma.candidate.findMany({
      select: {
        candidate_name: true,
        votings: {
          select: {
            voting_id: true,
          },
        },
      },
    });
console.log(candidateVotes)
    // Find candidate with the most votes
    let maxVotes = 0;
    let candidateWithMostVotes: string | null = null;

    candidateVotes.forEach((candidate) => {
      if (candidate.votings.length > maxVotes) {
        maxVotes = candidate.votings.length;
        candidateWithMostVotes = candidate.candidate_name;
      }
    });

    return candidateWithMostVotes;
  } catch (error) {
    console.error("Error fetching candidate with highest votes:", error);
    throw new Error("Error fetching candidate with highest votes");
  }

}
