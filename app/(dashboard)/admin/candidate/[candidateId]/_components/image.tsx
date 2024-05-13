"use client";

import * as z from "zod";
import axios from "axios";
import { Pencil, PlusCircle, ImageIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Candidate } from "@prisma/client";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import  ImageUpload  from "@/app/(dashboard)/admin/candidate/_components/image_upload";

interface ImageFormProps {
  initialData: Candidate
  candidate_id: number;
};

const formSchema = z.object({
  candidate_photo: z.string().min(1, {
    message: "Image is required",
  }),
});

export const ImageForm = ({
  initialData,
  candidate_id
}: ImageFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values)
    try {
      await axios.patch(`/api/candidate/${candidate_id}`, values);
      toast.success("Candidate updated");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  }

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Candidate's Photo
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && (
            <>Cancel</>
          )}
          {!isEditing && !initialData.candidate_photo && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add an image
            </>
          )}
          {!isEditing && initialData.candidate_photo && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit image
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        !initialData.candidate_photo ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
            <ImageIcon className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <Image
              alt="Upload"
              fill
              className="object-cover rounded-md"
              src={initialData.candidate_photo}
            />
          </div>
        )
      )}
      {isEditing && (
        <div>
          <ImageUpload
            endpoint="imageUploader"
            onChange={(url) => {
              if (url) {
                onSubmit({ candidate_photo: url });
              }
            }}
          />
        </div>
      )}
    </div>
  )
}