import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { CircleDollarSign, File, LayoutDashboard, ListChecks } from "lucide-react";

import { prisma } from "@/lib/db";
import { IconBadge } from "@/components/icon-badge";
import { Banner } from "@/components/banner";


import { ImageForm } from "./_components/image";
import { CategoryForm } from "./_components/event_Id";

const candidateIdPage = async ({
  params
}: {
  params: { candidateId: number }
}) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const candidate = await prisma.candidate.findUnique({
    where: {
      candidate_id: parseInt(params.candidateId),
    },
  });

  if (!candidate) {
    return redirect("/");
  }

  const requiredFields = [

    candidate.candidate_photo,


  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;

  const isComplete = requiredFields.every(Boolean);

  return (
    <>
      {!candidate.candidatus_status && (
        <Banner
          label="This candidate is inactive. It will not be visible to the voters."
        />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-medium">
              Candidate's Details
            </h1>
            <span className="text-sm text-slate-700">
              Complete all fields {completionText}
            </span>
          </div>
         
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboard} />
              <h2 className="text-xl">
                Customize your candidate
              </h2>
            </div>
            <ImageForm
              initialData={candidate}
              candidate_id={candidate.candidate_id}
            />
          </div>
         
        </div>
      </div>
    </>
   );
}
 
export default candidateIdPage;