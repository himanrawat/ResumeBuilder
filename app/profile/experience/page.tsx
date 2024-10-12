"use client";

import React, { useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const experienceSchema = z.object({
	employmentHistory: z.array(
		z.object({
			employer: z.string().min(2, { message: "Employer is required" }),
			jobTitle: z.string().min(2, { message: "Job Title is required" }),
			city: z.string().min(2, { message: "Enter City" }),
			state: z.string().min(2, { message: "Enter State" }),
			description: z.string().min(100, { message: "Express yourself" }),
			startMonth: z.string().min(1, { message: "Start month is required" }),
			startYear: z.string().min(1, { message: "Start year is required" }),
			endMonth: z.string().optional(),
			endYear: z.string().optional(),
			currentlyWorkHere: z.boolean().optional(),
		})
	),
});

type ExperienceFormValues = z.infer<typeof experienceSchema>;

const months = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 50 }, (_, i) => currentYear - i);

export default function Experience() {
	const form = useForm<ExperienceFormValues>({
		resolver: zodResolver(experienceSchema),
		defaultValues: {
			employmentHistory: [
				{
					employer: "",
					jobTitle: "",
					description: "",
					city: "",
					state: "",
					startMonth: "",
					startYear: "",
					endMonth: "",
					endYear: "",
					currentlyWorkHere: false,
				},
			],
		},
	});

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: "employmentHistory",
	});

	const onSubmit = (values: ExperienceFormValues) => {
		console.log(values);
	};

	return (
		<>
			<div className="flex items-center border-b-2 pb-4">
				<h1 className="text-lg font-semibold md:text-2xl">Work Experience</h1>
			</div>

			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="grid w-full gap-x-4 gap-y-8"
				>
					{fields.map((item, index) => (
						<div
							key={item.id}
							className="border-b-2 pb-4 mb-4 grid w-full gap-x-4 gap-y-8"
						>
							<div className="grid grid-cols-12 col-span-full gap-2">
								<div className="col-span-6">
									<FormField
										name={`employmentHistory.${index}.employer`}
										control={form.control}
										render={({ field }) => (
											<FormItem>
												<FormLabel>Employer</FormLabel>
												<FormControl>
													<Input placeholder="Employer" {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								<div className="col-span-6">
									<FormField
										name={`employmentHistory.${index}.jobTitle`}
										control={form.control}
										render={({ field }) => (
											<FormItem>
												<FormLabel>Job Title</FormLabel>
												<FormControl>
													<Input placeholder="Job Title" {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
							</div>
							<div className="grid grid-cols-12 col-span-full gap-2">
								<div className="col-span-6">
									<FormField
										name={`employmentHistory.${index}.city`}
										control={form.control}
										render={({ field }) => (
											<FormItem>
												<FormLabel>City</FormLabel>
												<FormControl>
													<Input placeholder="Enter Your City" {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								<div className="col-span-6">
									<FormField
										name={`employmentHistory.${index}.state`}
										control={form.control}
										render={({ field }) => (
											<FormItem>
												<FormLabel>State</FormLabel>
												<FormControl>
													<Input placeholder="Enter Your State" {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
							</div>

							<div className="grid grid-cols-12 gap-2">
								<div className="col-span-full md:col-span-6">
									<FormLabel>Start Date</FormLabel>
									<div className="flex justify-between gap-2 mt-2">
										<Controller
											name={`employmentHistory.${index}.startMonth`}
											control={form.control}
											render={({ field }) => (
												<Select
													onValueChange={field.onChange}
													value={field.value}
												>
													<SelectTrigger>
														<SelectValue placeholder="Select Month" />
													</SelectTrigger>
													<SelectContent>
														{months.map((month) => (
															<SelectItem key={month} value={month}>
																{month}
															</SelectItem>
														))}
													</SelectContent>
												</Select>
											)}
										/>
										<Controller
											name={`employmentHistory.${index}.startYear`}
											control={form.control}
											render={({ field }) => (
												<Select
													onValueChange={field.onChange}
													value={field.value}
												>
													<SelectTrigger>
														<SelectValue placeholder="Select Year" />
													</SelectTrigger>
													<SelectContent>
														{years.map((year) => (
															<SelectItem key={year} value={year.toString()}>
																{year}
															</SelectItem>
														))}
													</SelectContent>
												</Select>
											)}
										/>
									</div>
								</div>
								<div className="col-span-full md:col-span-6">
									<FormLabel>End Date</FormLabel>
									<div className="flex justify-between gap-2 mt-2">
										<Controller
											name={`employmentHistory.${index}.endMonth`}
											control={form.control}
											render={({ field }) => (
												<Select
													onValueChange={field.onChange}
													value={field.value}
													disabled={form.watch(
														`employmentHistory.${index}.currentlyWorkHere`
													)}
												>
													<SelectTrigger>
														<SelectValue placeholder="Select Month" />
													</SelectTrigger>
													<SelectContent>
														{months.map((month) => (
															<SelectItem key={month} value={month}>
																{month}
															</SelectItem>
														))}
													</SelectContent>
												</Select>
											)}
										/>
										<Controller
											name={`employmentHistory.${index}.endYear`}
											control={form.control}
											render={({ field }) => (
												<Select
													onValueChange={field.onChange}
													value={field.value}
													disabled={form.watch(
														`employmentHistory.${index}.currentlyWorkHere`
													)}
												>
													<SelectTrigger>
														<SelectValue placeholder="Select Year" />
													</SelectTrigger>
													<SelectContent>
														{years.map((year) => (
															<SelectItem key={year} value={year.toString()}>
																{year}
															</SelectItem>
														))}
													</SelectContent>
												</Select>
											)}
										/>
									</div>
								</div>
								<div className="col-span-full flex items-center space-x-2 mt-2">
									<Controller
										name={`employmentHistory.${index}.currentlyWorkHere`}
										control={form.control}
										render={({ field }) => (
											<Checkbox
												id={`currentlyWorkHere-${index}`}
												checked={field.value}
												onCheckedChange={(checked) => {
													field.onChange(checked);
												}}
											/>
										)}
									/>
									<label
										htmlFor={`currentlyWorkHere-${index}`}
										className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
									>
										I currently work here
									</label>
								</div>
							</div>
							<FormField
								name={`employmentHistory.${index}.description`}
								control={form.control}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Description</FormLabel>
										<FormControl>
											<Textarea
												placeholder="Enter Your Description"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button
								variant="destructive"
								type="button"
								onClick={() => remove(index)}
								className="mt-4 w-fit "
							>
								Remove Employment History
							</Button>
						</div>
					))}
					<div className="flex justify-end">
						<Button
							type="button"
							onClick={() =>
								append({
									employer: "",
									jobTitle: "",
									description: "",
									city: "",
									state: "",
									startMonth: "",
									startYear: "",
									endMonth: "",
									endYear: "",
									currentlyWorkHere: false,
								})
							}
							className="mt-4 w-fit"
						>
							Add More Employment History
						</Button>
					</div>

					<div className="mt-8 col-span-full justify-center items-center flex">
						<Button type="submit" className="w-full h-full">
							Update Experience
						</Button>
					</div>
				</form>
			</Form>
		</>
	);
}
