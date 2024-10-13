// File: app/profile/experience/page.tsx
"use client";

import React, { useEffect, useState } from "react";
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
	const [defaultValues, setDefaultValues] = useState<WorkExperienceFormValues>({
		items: [],
	});

	useEffect(() => {
		fetch("/api/experience")
			.then((response) => response.json())
			.then((data) => {
				setDefaultValues({ items: data });
			})
			.catch((error) =>
				console.error("Error fetching work experience:", error)
			);
	}, []);

	const onSubmit = async (values: WorkExperienceFormValues) => {
		try {
			const response = await fetch("/api/experience", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(values.items[values.items.length - 1]),
			});

			if (response.ok) {
				console.log("Work experience added successfully");
				// You can add a success message or refresh the data here
			} else {
				console.error("Failed to add work experience");
				// You can add an error message here
			}
		} catch (error) {
			console.error("Error adding work experience:", error);
			// You can add an error message here
		}
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
