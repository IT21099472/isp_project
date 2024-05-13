import React from 'react'
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { InfoCard } from "../_components/info-card";
import { CheckCircle, Clock } from "lucide-react";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { prisma } from "@/lib/db";
import getCandidateWithHighestVotes from './_components/getHighestVotes';

const EventPage = async () => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }

  const totalVotes = await prisma.voting.count();
  const highestVotes = await getCandidateWithHighestVotes()

  console.log("votes count" + highestVotes)
  try {
    const Voter = await prisma.voting.findMany();
    return(
    <div className="p-6 space-y-4">
      Dashboard

      <div className="p-6 space-y-4">
      admin home
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
       <InfoCard
          icon={Clock}
          label="Total Vote Count"
          numberOfItems={totalVotes}
       />
       <InfoCard
          icon={CheckCircle}
          label="Candidate with highest no. of votes"
          name={highestVotes!}
          variant="success"
       />
       {highestVotes !== null ? highestVotes : "No candidate"}
      </div>
      <div className="p-6">
        <DataTable columns={columns} data={Voter} />
      </div>
      
    </div>
    </div>
    );
  } catch (error) {
   
      return <div>Error fetching data. Please try again later.</div>;
    }
    
  }

export default EventPage