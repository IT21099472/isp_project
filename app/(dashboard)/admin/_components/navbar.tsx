import { NavbarRoutes } from "./navbar-routes"
import {UserButton,} from "@clerk/nextjs";
import { MobileSidebar } from "./mobile-sidebar"

export const Navbar = () => {
  return (
    <div className="p-4 border-b h-full flex items-center shadow-sm bg-slate-50">
      <MobileSidebar />
      <NavbarRoutes />
     
    </div>
  )
}