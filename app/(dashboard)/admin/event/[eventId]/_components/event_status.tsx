"use client";

import React, { useState } from "react";
import { Switch } from "@/components/ui/switch";
import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

interface TitleFormProps {
  initialData: {
    event_name: string;
    event_status: boolean;
}; event_id: number;
};

const formSchema = z.object({
  event_status: z.boolean().nullable().optional(),
});

export const EventStatus = ({ 
  initialData,event_status,event_id }: TitleFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const { isSubmitting, isValid } = form.formState;
  
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/event/${event_id}`, values);
      toast.success("Event updated");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("One Event is in Active Mode!");
    }
  }

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Event's Status
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit Status
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <Badge className={cn("bg-red-500", initialData.event_status && "bg-green-500")}>
          {initialData.event_status ? "Active" : "Inactive"}
        </Badge>
      )}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className=""
          >
            <div className="flex items-center gap-x-2">
              <label htmlFor="eventStatus">Event Status:</label>
              <FormField
              control={form.control}
              name="event_status"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg p-4">
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            </div>
            <div className="flex items-center gap-x-2">
              <Button disabled={!isValid || isSubmitting} type="submit">
                Save
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};
