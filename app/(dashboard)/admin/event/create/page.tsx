"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { Switch } from "@/components/ui/switch";

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

const formSchema = z.object({
    event_name: z.string().min(1, {
      message: "Event's name is required",
    }),
    event_status: z.boolean().optional(),
  });
  

const CreatePage = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      event_name: "",
      event_status: false
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post("/api/event", values);
  
      if (response.data.error) {
        // If API response contains an error message, display it
        toast.error(response.data.error);
      } else {
        // If successful, redirect to the event page
        router.push(`/admin/event/${response.data.event_id}`);
        router.refresh();
        toast.success("Event created");
      }
    } catch {
      toast.error("Something went wrong");
    }
  };
  
  
  
 

  return ( 
    <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
      <div>
        <h1 className="text-2xl">
          Name your event
        </h1>
        <p className="text-sm text-slate-600">
          How would you like to name your event? Don&apos;t worry, you can change this later.
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-8"
          >
            <FormField
              control={form.control}
              name="event_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Event's Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. 'FCSC President Selection'"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="event_status"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg p-">
                    <FormLabel>
                    Event's Status
                  </FormLabel>
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
              <Link href="../event">
                <Button
                  type="button"
                  variant="ghost"
                >
                  Cancel
                </Button>
              </Link>
              <Button
                type="submit"
                disabled={!isValid || isSubmitting}
              >
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
   );
}
 
export default CreatePage;