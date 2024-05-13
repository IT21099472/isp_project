"use client"

import { useState } from "react";
import React from "react";
import { auth } from "@clerk/nextjs";
import { redirect, useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"

import { Actions } from "@/app/(dashboard)/admin/candidate/_components/actions";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import toast from "react-hot-toast";
 
const FormSchema = z.object({
  mobile: z.boolean().default(false).optional(),
})

interface CandidateCardProps {
  candidate_id: number;
  candidate_name: string;
  candidate_department: string;
  candidate_photo: string;
  candidate_status: boolean;
  event_id?: number;
}

export const CandidateCard = ({
  candidate_id,
  candidate_name,
  candidate_department,
  candidate_photo,
  event_id,
  candidate_status,
}: CandidateCardProps) => {
  
  const [isChecked, setIsChecked] = useState(false);
  const router = useRouter();

  const handleCheckboxChange = async () => {
    const candidateId = candidate_id
    console.log(candidateId)
    candidate_status = !candidate_status
    const values = {
      candidatus_status: candidate_status
    }

    console.log(values)

    try {
      const responce = await axios.patch(`/api/candidate/${candidateId}`, values);
      console.log(responce)
      toast.success("Candidate updated");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };
  const handleDelete = async () => {
    try {
      await axios.delete(`/api/candidate/${candidate_id}`);
      toast.success("Candidate deleted");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center flex-col col-span-12 md:col-span-6 lg:col-span-3 h-96 rounded-lg ">
      <div className="h-[75%] min-w-[90%]  bg-slate-200 mb-5 flex flex-col rounded-lg p-2">
        <div className="flex justify-center items-center">
          <Image
            src={candidate_photo}
            alt="user-image"
            width={180}
            height={180}
            className="border-8 rounded-full relative -top-[30%] objectfield"
          />
        </div>

        <div className="flex items-center justify-center  relative -top-[21%]">
          <p className="truncate text-xl font-sans font-bold">
            {candidate_name}
          </p>
        </div>
        <div className="flex items-center justify-center relative -top-[19%]  ">
          {candidate_department}
        </div>
        <div className="flex flex-col items-center justify-center relative -top-[15%]">
          <Switch
            id="airplane-mode"
            className="mb-2 bg-red-300 border border-black"
            onClick={handleCheckboxChange}
            checked={candidate_status}
          />
          <Badge
            className={cn(
              "bg-red-500 p-2 text-sm",
              candidate_status && "bg-green-500"
            )}
          >
            {candidate_status ? "Active" : "Inactive"}
          </Badge>
          <div className="-top-[25%] -right-[42%] relative">
            <Actions
              candidateId={candidate_id}
              onDelete={handleDelete} // Pass handleDelete function
            />
          </div>
        </div>
      </div>
    </div>
  );
};