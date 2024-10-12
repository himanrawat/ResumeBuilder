"use client"; // Add this line
import React from "react";
import { z } from "zod";
import GenericResumeSection from "@/components/ui/GenericResumeSection";

const workExperienceSchema = z.object({
	items: z.array(
		z.object({
			title: z.string().min(2, { message: "Job Title is required" }),
			organization: z.string().min(2, { message: "Employer is required" }),
			location: z.object({
				city: z.string().optional(),
				state: z.string().optional(),
			}),
			description: z.string().min(100, { message: "Express yourself" }),
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

type WorkExperienceFormValues = z.infer<typeof workExperienceSchema>;

export default function WorkExperience() {
	const defaultValues: WorkExperienceFormValues = {
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

	const onSubmit = (values: WorkExperienceFormValues) => {
		console.log(values);
		// Handle form submission
	};

	return (
		<GenericResumeSection
			title="Work Experience"
			schema={workExperienceSchema}
			defaultValues={defaultValues}
			onSubmit={onSubmit}
		/>
	);
}
