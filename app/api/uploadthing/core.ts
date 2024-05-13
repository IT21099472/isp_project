import { auth } from "@clerk/nextjs";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
 
const f = createUploadthing();
 
const handleAuth = () => {
  const { userId } = auth();

  if (!userId ) throw new Error("Unauthorized");
  return { userId };
}
 
// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB" } })
  .middleware(() => handleAuth())
  .onUploadComplete(() => {})
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;