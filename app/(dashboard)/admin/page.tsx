import { auth } from "@clerk/nextjs"

import { redirect } from "next/navigation";
import { CheckCircle, Clock } from "lucide-react";





export default async function Dashboard() {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }



  return (
    <div className="p-6 space-y-4">
      admin home
    </div>
  );
  
}
