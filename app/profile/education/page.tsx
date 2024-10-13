"use client";

import React, { useEffect, useState } from "react";
import GenericResumeSection from "@/components/ui/GenericResumeSection";
import { z } from "zod";

const educationSchema = z.object({
	items: z.array(
		z.object({
			_id: z.string().optional(), // MongoDB ID
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
	const [educations, setEducations] = useState<EducationFormValues>({
		items: [],
	});
	const [isLoading, setIsLoading] = useState(true);

	const fetchEducations = async () => {
		setIsLoading(true);
		try {
			const response = await fetch("/api/education");
			if (response.ok) {
				const data = await response.json();
				setEducations({ items: data });
			} else {
				console.error("Failed to fetch educations");
			}
		} catch (error) {
			console.error("Error fetching educations:", error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchEducations();
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
				await fetchEducations(); // Refresh the data after successful submission
			} else {
				console.error("Failed to add education");
			}
		} catch (error) {
			console.error("Error adding education:", error);
		}
	};

	const onDelete = async (id: string) => {
		try {
			const response = await fetch(
				`/api/delete?collection=education&id=${id}`,
				{
					method: "DELETE",
				}
			);

			if (response.ok) {
				console.log("Education deleted successfully");
				await fetchEducations(); // Refresh the data after successful deletion
			} else {
				console.error("Failed to delete education");
			}
		} catch (error) {
			console.error("Error deleting education:", error);
		}
	};

	return (
		<div>
			{isLoading ? (
				<p>Loading...</p>
			) : (
				<GenericResumeSection
					title="Education"
					schema={educationSchema}
					defaultValues={educations}
					onSubmit={onSubmit}
					onDelete={onDelete}
					labelOverrides={{
						title: "Degree",
						organization: "Institution",
						current: "I am currently studying here",
					}}
				/>
			)}
		</div>
	);
}
