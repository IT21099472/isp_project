"use client"
 
import { Event } from "../../../../../node_modules/.prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal, Pencil } from "lucide-react"
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export const columns: ColumnDef<Event>[] = [
  {
    accessorKey: "event_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Event Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "event_status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Event's Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const isEvent = row.getValue("event_status") || false;

      return (
        <Badge className={cn(
          "bg-red-500",
          isEvent && "bg-green-500"
        )}>
          {isEvent ? "Active" : "Inactive"}
        </Badge>
      )
    }
  },
  
  {
    id: "actions",
    cell: ({ row }) => {
      const { event_id } = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-4 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <Link href={`/admin/event/${event_id}`}>
              <DropdownMenuItem>
                <Pencil className="h-4 w-4 mr-2" />
                Edit
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
  
]
