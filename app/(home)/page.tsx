import React from "react";
import { auth } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { ConfirmB } from "@/components/confirm";
import { getCandidates } from "@/actions/get_candidate";
import { CandidateList } from "@/components/candidate_list copy";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";

interface CandidatesPageProps {
  searchParams: {
    candidate_name: string;
    event_id: string;
  };
}

const CandidatesPage: React.FC<CandidatesPageProps> = async ({ searchParams }) => {
  const { userId } = auth();

  if (!userId) {
    redirect("/"); // Assuming this function properly handles redirection
    return null; // Make sure to return something
  }

  const candidates = await prisma.candidate.findMany({
    where: {
      candidatus_status: true, // Filter candidates with candidatus_status as active
      event: {
        event_status: true // Filter events with event_status as active
      }
    },
    include: { event: true }, // Include related event data
    orderBy: {
      candidate_name: "asc" // Order candidates by candidate_name in ascending order
    }
  });

  if (!userId) {
    // Redirect logic goes here
    return null;
  }

  console.log(candidates)

  const eventTitle = candidates.length > 0 ? `Candidates for Event : ${candidates[0]?.event?.event_name}` : "No event's available";

  return (
    <>
      <div className="flex items-center bg-blue-100 flex-col col-span-12 md:col-span-6 lg:col-span-3 mt-5 p-5 rounded-lg mr-4">
        <div className="w-[90%] text-gray-600 mt-5">
          <p className="text-center font-semibold text-5xl">Electronic Voting System</p>
        </div>
        <div className="w-[90%] mt-1">
          <p className="text-red-800 font-semibold text-lg">Attention Voters:</p>
          <p className="text-justify font-semibold text-base">
            Once you've submitted your vote, it cannot be changed. You have only one opportunity
            to cast your vote, so please consider your decision carefully before submitting.
          </p>
      
        </div>
      </div>

      <div className="h-10 mt-4 mr-5">
      <p className="text-center font-semibold text-2xl text-gray-800 mt-3">{eventTitle}</p>
      </div>

      <div className="grid grid-cols-12 gap-4 p-4 items-center justify-center">
        <CandidateList items={candidates} />
      </div>
    </>
  );
};

export default CandidatesPage;
