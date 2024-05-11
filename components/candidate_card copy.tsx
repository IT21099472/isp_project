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
import { ConfirmB } from "@/components/confirm";
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
import { ConfirmModal } from "./modals/confirm-modal";
import { ButtonC } from "./ui/buttonC";

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

export const CandidateCardd = ({
  candidate_id,
  candidate_name,
  candidate_department,
  candidate_photo,
  event_id,
  candidate_status,
}: CandidateCardProps) => {
  
  const [isChecked, setIsChecked] = useState(false);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const values = {
    event_id,
    candidate_id
  }

  const onCreate = async () => {
    try {
      const response = await axios.post("/api/vote", values);
      router.push('/');
      router.refresh();
      toast.success("You have successfully voted");
    } catch {
      toast.error("You have already Voted !");
    }
  };

  return (
      
    <div className="flex items-center flex-col col-span-6 md:col-span-6 lg:col-span-3 h-96 rounded-lg bg-slate-100">
    <Image
        src={candidate_photo}
        alt="user-image"
        width={180}
        height={180}
        className="border-8 rounded-full objectfield mb-5 mt-5" />
      <div className="min-w-[90%]  flex flex-col rounded-lg p-2 ">
        <div className="flex items-center justify-center ">
          <p className="truncate text-xl font-sans font-bold">{candidate_name}</p>
        </div>
        <div className="flex items-center justify-center ">{candidate_department}</div>
      </div>
      <ConfirmModal onConfirm={onCreate}>
        <ButtonC size="lg" disabled={isLoading} className="bg-slate-500">
          Vote
        </ButtonC>
      </ConfirmModal>
    </div>
  );
};