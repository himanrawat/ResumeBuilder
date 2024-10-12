"use client"; // Add this line
import React from "react";
import GenericResumeSection from "@/components/ui/GenericResumeSection";
import { z } from "zod";

const educationSchema = z.object({
	items: z.array(
		z.object({
			title: z.string().min(2, { message: "Degree is required" }),
			organization: z.string().min(2, { message: "Institution is required" }),
			location: z.object({
				city: z.string().optional(),
				state: z.string().optional(),
			}),
			description: z.string().optional(),
			startDate: z.object({
				month: z.string().min(1, { message: "Start month is required" }),
				year: z.string().min(1, { message: "Start year is required" }),
			}),
			endDate: z.object({
				month: z.string().optional(),
				year: z.string().optional(),
			}),
			current: z.boolean().optional(),
		})
	),
});

type EducationFormValues = z.infer<typeof educationSchema>;

export default function Education() {
	const defaultValues: EducationFormValues = {
		items: [
			{
				title: "",
				organization: "",
				location: { city: "", state: "" },
				description: "",
				startDate: { month: "", year: "" },
				endDate: { month: "", year: "" },
				current: false,
			},
		],
	};

	const onSubmit = (values: EducationFormValues) => {
		console.log(values);
		// Handle form submission
	};

	return (
		<GenericResumeSection
			title="Education"
			schema={educationSchema}
			defaultValues={defaultValues}
			onSubmit={onSubmit}
			labelOverrides={{
				title: "Degree",
				organization: "Institution",
				current: "I am currently studying here",
			}}
		/>
	);
}
