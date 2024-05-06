import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Logo } from "./logo";

export const Navbar = () => {
  return (
    <div className="p-4 border-b h-full flex items-center shadow-sm bg-slate-50 ">
      <div className="p-6">
      <Link href="" className=""><Logo /></Link>
      </div>
      <div className="flex gap-x-2 ml-auto items-center">
        <UserButton />
      </div>
    </div>
  );
};
