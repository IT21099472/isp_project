import React from "react";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Actions } from "./_components/actions";
import { prisma } from "@/lib/db";
import { getCandidates } from "@/actions/get_candidate";
import { CandidateList } from "@/components/candidate_list";
import { Events } from "./_components/events";
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { PlusCircle } from "lucide-react"

interface CandidatesPageProps {
  searchParams: {
    candidate_name: string;
    event_id: string;
  };
}

const CandidatesPage = async ({ searchParams }: CandidatesPageProps) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  // Fetch candidates data
  const event = await prisma.event.findMany({
    orderBy: {
      event_name: "asc",
    },
  });
  

  const candidate = await getCandidates({
    ...searchParams,
  });

  return (
    <>

<div>
      <div className="p-5 ">
        <Link href="../admin/candidate/create">
          <Button>
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Candidate
          </Button>
        </Link>
      </div>
      <div className="p-4 space-y-1">
        <Events items={event} />
        <CandidateList items={candidate} />
      </div></div>
    </>
  );
};

export default CandidatesPage;
