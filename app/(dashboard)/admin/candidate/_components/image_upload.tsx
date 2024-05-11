"use client";
import React from "react";
import { UploadDropzone } from "@/lib/uploadthing";
import toast from "react-hot-toast";
import { useState } from "react";


const ImageUpload = () => {
  const [imageUrl, setImageUrl]= useState<string>('');
  return (
    <div>
      <UploadDropzone
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          setImageUrl(res[0].url);
          toast.success("Image upload Completed");
        }}
        onUploadError={(error: Error) => {
          toast.error("Something went wrong");
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
