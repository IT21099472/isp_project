import React from 'react'
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";

import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { title } from 'process';

const VoterPage = async () => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }
  try {
    const Post = await db.post.findMany();
    console.log(Post)
    return (
      <div className="p-6">
        <DataTable columns={columns} data={Post} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return <div>Error fetching data. Please try again later.</div>;
  }
  
}

export default VoterPage

