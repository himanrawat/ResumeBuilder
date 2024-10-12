"use client";
import React from "react";
import { useForm, useFieldArray, FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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

interface GenericResumeSectionProps {
	title: string;
	schema: z.ZodType<any, any>;
	defaultValues: any;
	onSubmit: (values: any) => void;
	labelOverrides?: {
		title?: string;
		organization?: string;
		current?: string;
	};
}

export default function GenericResumeSection({
	title,
	schema,
	defaultValues,
	onSubmit,
	labelOverrides = {},
}: GenericResumeSectionProps) {
	const form = useForm<FieldValues>({
		resolver: zodResolver(schema),
		defaultValues,
	});

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: "items",
	});

	return (
		<>
			<div className="flex items-center border-b-2 pb-4">
				<h1 className="text-lg font-semibold md:text-2xl">{title}</h1>
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
										name={`items.${index}.organization`}
										control={form.control}
										render={({ field }) => (
											<FormItem>
												<FormLabel>
													{labelOverrides.organization || "Organization"}
												</FormLabel>
												<FormControl>
													<Input
														placeholder={
															labelOverrides.organization || "Organization"
														}
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								<div className="col-span-6">
									<FormField
										name={`items.${index}.title`}
										control={form.control}
										render={({ field }) => (
											<FormItem>
												<FormLabel>{labelOverrides.title || "Title"}</FormLabel>
												<FormControl>
													<Input
														placeholder={labelOverrides.title || "Title"}
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
							</div>

							{/* Location fields */}
							<div className="grid grid-cols-12 col-span-full gap-2">
								<div className="col-span-6">
									<FormField
										name={`items.${index}.location.city`}
										control={form.control}
										render={({ field }) => (
											<FormItem>
												<FormLabel>City (Optional)</FormLabel>
												<FormControl>
													<Input placeholder="Enter City" {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								<div className="col-span-6">
									<FormField
										name={`items.${index}.location.state`}
										control={form.control}
										render={({ field }) => (
											<FormItem>
												<FormLabel>State (Optional)</FormLabel>
												<FormControl>
													<Input placeholder="Enter State" {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
							</div>

							{/* Date fields */}
							<div className="grid grid-cols-12 gap-2">
								<div className="col-span-full md:col-span-6">
									<FormLabel>Start Date</FormLabel>
									<div className="flex justify-between gap-2 mt-2">
										<FormField
											name={`items.${index}.startDate.month`}
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
										<FormField
											name={`items.${index}.startDate.year`}
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
										<FormField
											name={`items.${index}.endDate.month`}
											control={form.control}
											render={({ field }) => (
												<Select
													onValueChange={field.onChange}
													value={field.value}
													disabled={form.watch(`items.${index}.current`)}
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
										<FormField
											name={`items.${index}.endDate.year`}
											control={form.control}
											render={({ field }) => (
												<Select
													onValueChange={field.onChange}
													value={field.value}
													disabled={form.watch(`items.${index}.current`)}
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
									<FormField
										name={`items.${index}.current`}
										control={form.control}
										render={({ field }) => (
											<FormItem className="flex flex-row items-start space-x-3 space-y-0">
												<FormControl>
													<Checkbox
														checked={field.value}
														onCheckedChange={field.onChange}
													/>
												</FormControl>
												<div className="space-y-1 leading-none">
													<FormLabel>
														{labelOverrides.current || "I am currently here"}
													</FormLabel>
												</div>
											</FormItem>
										)}
									/>
								</div>
							</div>
							<FormField
								name={`items.${index}.description`}
								control={form.control}
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											Description {title === "Education" ? "(Optional)" : ""}
										</FormLabel>
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
								className="mt-4 w-fit"
							>
								Remove Item
							</Button>
						</div>
					))}
					<div className="flex justify-end">
						<Button
							type="button"
							onClick={() =>
								append({
									title: "",
									organization: "",
									location: { city: "", state: "" },
									description: "",
									startDate: { month: "", year: "" },
									endDate: { month: "", year: "" },
									current: false,
								})
							}
							className="mt-4 w-fit"
						>
							Add More
						</Button>
					</div>

					<div className="mt-8 col-span-full justify-center items-center flex">
						<Button type="submit" className="w-full h-full">
							Update {title}
						</Button>
					</div>
				</form>
			</Form>
		</>
	);
}
