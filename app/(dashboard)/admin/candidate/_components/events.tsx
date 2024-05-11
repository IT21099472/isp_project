"use client";

import { Event } from "@prisma/client";
import { EventItem } from "./event_item"; // Assuming you have a CandidateItem component
import {
  FcEngineering,
  FcFilmReel,
  FcMultipleDevices,
  FcMusic,
  FcOldTimeCamera,
  FcSalesPerformance,
  FcSportsMode
} from "react-icons/fc";
import { IconType } from "react-icons";

interface EventsProps {
  items: Event[];
  // iconMap: Record<string, IconType>; // Define iconMap as a prop
}

const iconMap: Record<Event["event_name"], IconType> = {
  "Music": FcMusic,
  "Photography": FcOldTimeCamera,
  "Fitness": FcSportsMode,
  "Accounting": FcSalesPerformance,
  "Computer Science": FcMultipleDevices,
  "Filming": FcFilmReel,
  "Engineering": FcEngineering,
};

export const Events = ({ 
  items
}: EventsProps) => {
  return (
    <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
      
      {items.map((item) => (
        <EventItem
          key={item.event_id}
          label={item.event_name}
          value={item.event_id.toString()} // Convert to string
        />
      ))}
    </div>
  );
};
