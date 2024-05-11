"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
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


const formSchema = z.object({
  candidate_name: z.string().min(1, {
    message: "Candidate's name is required",
  }),
  candidate_department: z.string().min(1, {
    message: "Candidate's department is required",
  }),
});

const CreatePage = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      candidate_name: "",
      candidate_department: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post("/api/candidate", values);
      const candidateId = response.data.candidate_id;
      router.push(`../candidate/${candidateId}`);
      toast.success("Candidate created");
    } catch (error) {
      console.error("Error creating candidate:", error);
      toast.error("Failed to create candidate");
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
