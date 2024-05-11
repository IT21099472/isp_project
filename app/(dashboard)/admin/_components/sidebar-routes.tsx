"use client";

import { BarChart, Braces, Code, Compass, Bot, Layout, List, FileCheck, Terminal, Image, Languages, User, Vote, CalendarCheck  } from "lucide-react";
import { usePathname } from "next/navigation";

import { SidebarItem } from "./sidebar-item";

const guestRoutes = [
  {
    icon: Layout,
    label: "Dashboard",
    href: "/admin/dashboard",
  },
  {
    icon: CalendarCheck,
    label: "Events",
    href: "/admin/event",
  },
  {
    icon: User,
    label: "Candidates",
    href: "/admin/candidate",
  },
  {
    icon: Vote,
    label: "Voters",
    href: "/admin/voter",
  },
  
];



export const SidebarRoutes = () => {
  const pathname = usePathname();

  const isTeacherPage = pathname?.includes("/teacher");

  const routes = guestRoutes;

  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  )
}