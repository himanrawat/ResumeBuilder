// File: app/profile/education/page.tsx
"use client";

import React, { useEffect, useState } from "react";
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
	const [defaultValues, setDefaultValues] = useState<EducationFormValues>({
		items: [],
	});

	useEffect(() => {
		fetch("/api/education")
			.then((response) => response.json())
			.then((data) => {
				setDefaultValues({ items: data });
			})
			.catch((error) => console.error("Error fetching education:", error));
	}, []);

	const onSubmit = async (values: EducationFormValues) => {
		try {
			const response = await fetch("/api/education", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(values.items[values.items.length - 1]),
			});

			if (response.ok) {
				console.log("Education added successfully");
				// You can add a success message or refresh the data here
			} else {
				console.error("Failed to add education");
				// You can add an error message here
			}
		} catch (error) {
			console.error("Error adding education:", error);
			// You can add an error message here
		}
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
