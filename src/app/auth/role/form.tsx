"use client";
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/button";
import {
  FormField,
  FormItem,
  FormMessage,
} from "@/components/_shared/form/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/_shared/form/form";
import { useRouter } from "next/navigation";
import { MoveRight, Shield, User } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/input/radio-group";
import { cn } from "@/shared/_utils/cn";

const RoleSchema = z.object({
  role: z.string({
    message: "Role is required.",
  }),
});

type RoleType = z.infer<typeof RoleSchema>;

export default function RoleForm() {
  const router = useRouter();
  const form = useForm<RoleType>({
    resolver: zodResolver(RoleSchema),
    defaultValues: {
      role: "scout",
    },
  });

  const handleSubmit = useCallback((data: RoleType) => {
    console.log(data);
    if (data?.role === "club") {
      router.push("/auth/team-profile");
    } else {
      router.push("/auth/scout-profile");
    }
  }, []);

  return (
    <div className=" w-full h-full overflow-y-scroll max-w-3xl rounded-md dark:bg-dark-ash-900 bg-white dark:text-white text-black p-3 lg:p-8 flex flex-col gap-6">
      <h6 className=" font-bold text-gray-500 text-xl">ISPORTS</h6>
      <section>
        <h1 className="text-3xl font-semibold">Select Your Role!</h1>
        <p className="text-sm mt-1 dark:text-gray-400">
          Please let us know your role here on Isportsx
        </p>
      </section>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className=" flex flex-col gap-4"
        >
          <FormField
            name="role"
            control={form.control}
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormMessage />
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col gap-4"
                >
                  <div className="flex flex-col gap-5 items-stretch">
                    {[
                      {
                        label: "Club",
                        value: "club",
                        description:
                          "Manage the team, register players, Compete with other teams.",
                        icon: <Shield />,
                      },
                      {
                        label: "Scout",
                        value: "scout",
                        description:
                          "Discover talents, create reports, track player development",
                        icon: <User />,
                      },
                    ].map((option) => (
                      <label
                        key={option.value}
                        className=" cursor-pointer items-stretch"
                      >
                        <RadioGroupItem
                          id={option.value}
                          value={option.value}
                          className="hidden"
                        />
                        <div
                          className={cn(
                            form.getValues().role === option?.value &&
                              " bg-primary/20 border-primary-dull border-2",
                            !(form.getValues().role === option?.value) &&
                              "border-gray-300 border",
                            "flex flex-col lg:flex-row items-start lg:items-center gap-4 p-4 rounded-lg hover:bg-primary/20 transition-all "
                          )}
                        >
                          <div
                            className={cn(
                              form.getValues().role === option?.value &&
                                " border-primary-dull dark:border-white",
                              !(form.getValues().role === option?.value) &&
                                "border-gray-300",
                              "p-2 border rounded-md w-fit"
                            )}
                          >
                            {option?.icon}
                          </div>
                          <div className=" flex flex-col gap-1">
                            <h4 className=" font-semibold text-lg">
                              {option.label}
                            </h4>
                            <p className=" text-gray-700 dark:text-white">
                              {option?.description}
                            </p>
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </RadioGroup>
              </FormItem>
            )}
          />
          <div className=" w-full text-center my-7 flex flex-col gap-2">
            <Button type="submit" className=" flex items-center gap-2">
              Continue <MoveRight />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
