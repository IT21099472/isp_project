import React from "react";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import {
  CircleDollarSign,
  File,
  LayoutDashboard,
  ListChecks,
} from "lucide-react";

import { prisma } from "@/lib/db";
import { IconBadge } from "@/components/icon-badge";
import { Banner } from "@/components/banner";

import { Actions } from "./_components/actions";
import { EventForm } from "./_components/event_name";
import { EventStatus } from "./_components/event_status";

const EventId = async ({
  params,
}: {
  params: { eventId: string }; // Change eventId to string
}) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const eventId = parseInt(params.eventId, 10); // Convert eventId to number
  if (isNaN(eventId)) {
    return redirect("/"); // Handle invalid eventId
  }

  const Event = await prisma.event.findUnique({
    where: {
      event_id: eventId, // Use the converted eventId
    },
  });

  if (!Event) {
    return redirect("/");
  }

  const requiredFields = [Event.event_name, Event.event_status];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;

  const isComplete = requiredFields.every(Boolean);

  return (
    <>
      {!Event.event_status && (
        <Banner label="This event is inactive. It will not be visible to vote." />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-medium">Event's Name</h1>
            <span className="text-sm text-slate-700">
              Complete all fields {completionText}
            </span>
          </div>
          <Actions
            disabled={!isComplete}
            eventId={parseInt(params.eventId, 10)} // Convert eventId to a number
            isEvent={Event.event_status}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5">
          <div>
            <EventForm initialData={Event} event_id={Event.event_id} />
          </div>
          <div>
            <EventStatus initialData={Event} event_id={Event.event_id} />
          </div>
        </div>
        <div />
      </div>
    </>
  );
};

export default EventId;
