"use client";
import React from "react";
import { UploadDropzone } from "@/lib/uploadthing";
import toast from "react-hot-toast";
import { useState } from "react";
import { ourFileRouter } from "@/app/api/uploadthing/core";

interface FileUploadProps {
  onChange: (url?: string) => void;
  endpoint: keyof typeof ourFileRouter;
};


const ImageUpload = ({
  onChange,
  endpoint
}: FileUploadProps) => {
  const [imageUrl, setImageUrl]= useState<string>('');
  return (
    <div>
      <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url);
      }}
      onUploadError={(error: Error) => {
        toast.error(`${error?.message}`);
      }}
    />
      {imageUrl && (
        <div>
          <img src={imageUrl} alt='Image not found' width='100' height='100' />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
