User
please correct my code fr select


"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { Switch } from "@/components/ui/switch";
import { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormLabel,
  FormMessage,
  FormItem,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SelectContent, SelectValue } from "@/components/ui/select";
import { SelectItem } from "@/components/ui/select";
import { SelectTrigger } from "@/components/ui/select";
import { Select } from "@/components/ui/select";
import UploadDropzone from "../_components/image_upload";

const formSchema = z.object({
  candidate_name: z.string().min(1, {
    message: "Candidate's name is required",
  }),
  candidate_department: z.string().min(1, {
    message: "Candidate's department is required",
  }),
  event_id: z.number({
    message: "Event is required",
  }),
  candidatus_status: z.boolean(),
  candidate_photo: z.string(), // Updated schema to include the file field
});

const CreatePage = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      candidate_name: "",
      candidate_department: "",
      candidate_photo: "",
      event_id: null,
      candidatus_status: false,
    },
  });

  const { isSubmitting, isValid } = form.formState;
  const [eventsData, setEventsData] = useState<any[]>([]);
  const [imageUrl, setImageUrl] = useState<any[]>([]);

  useEffect(() => {
    // Fetch events data from your backend API
    const fetchEventsData = async () => {
      try {
        const response = await axios.get("/api/event"); // Assuming you have an API endpoint to fetch events
        console.log(response.data);
        setEventsData(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEventsData();
  }, []); // Empty dependency array to fetch data only once on component mount

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const formData = new FormData();
      formData.append("candidate_name", values.candidate_name);
      formData.append("candidate_department", values.candidate_department);
      formData.append("event_id", values.event_id.toString());
      formData.append("candidatus_status", String(values.candidatus_status));
      formData.append("candidate_photo", values.candidate_photo[0]);
      // if (values.candidate_photo) {
      //   formData.append("candidate_photo", values.candidate_photo[0]);
      // }
      console.log(values);
      const response = await axios.post("/api/candidate", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      router.push("/admin/candidate");
      toast.success("Candidate created");
    } catch (error) {
      console.error("Error creating candidate:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
      <div>
        <h1 className="text-2xl">Name your Candidate</h1>
        <p className="text-sm text-slate-600">
          You can't change a candidate's details after they are created.
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-8"
          >
            <FormField
              control={form.control}
              name="candidate_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Candidate's Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. 'Rivi Abishek'"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="candidate_department"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Candidate's Department</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. 'Faculty of Computing'"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="event_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select the Event</FormLabel>
                  <Select {...field} onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an Event" />
                      </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {eventsData.map((event: any) => (
                          <SelectItem
                            key={event.event_id}
                            value={event.event_id}
                            onSelect={() => {
                              form.setValue("event_id", event.event_id);
                            }}
                          >
                            {event.event_name} - {event.event_id}
                          </SelectItem>
                        ))}
                      </SelectContent>
                  </Select>
                   
                  <FormDescription>
                    You can manage{" "}
                    <Link href="/admin/event/">Events from here</Link>.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="candidate_photo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Candidate's Photo</FormLabel>
                  <FormControl>
                    <UploadDropzone />
                  </FormControl>
                  <FormDescription>
                    Upload a photo for the candidate.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="candidatus_status"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg p-">
                  <FormLabel>Candidate's Status</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Link href="../candidate">
                <Button type="button" variant="ghost">
                  Cancel
                </Button>
              </Link>
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreatePage;