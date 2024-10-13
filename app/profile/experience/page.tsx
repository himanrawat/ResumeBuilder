"use client";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import GenericResumeSection from "@/components/ui/GenericResumeSection";

const workExperienceSchema = z.object({
	items: z.array(
		z.object({
			_id: z.string().optional(), // MongoDB ID
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
	const [experiences, setExperiences] = useState<WorkExperienceFormValues>({
		items: [],
	});
	const [isLoading, setIsLoading] = useState(true);

	const fetchExperiences = async () => {
		setIsLoading(true);
		try {
			const response = await fetch("/api/experience");
			if (response.ok) {
				const data = await response.json();
				setExperiences({ items: data });
			} else {
				console.error("Failed to fetch experiences");
			}
		} catch (error) {
			console.error("Error fetching experiences:", error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchExperiences();
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
				await fetchExperiences(); // Refresh the data after successful submission
			} else {
				console.error("Failed to add work experience");
			}
		} catch (error) {
			console.error("Error adding work experience:", error);
		}
	};

	const onDelete = async (id: string) => {
		try {
			const response = await fetch(
				`/api/delete?collection=experience&id=${id}`,
				{
					method: "DELETE",
				}
			);

			if (response.ok) {
				console.log("Work experience deleted successfully");
				await fetchExperiences(); // Refresh the data after successful deletion
			} else {
				console.error("Failed to delete work experience");
			}
		} catch (error) {
			console.error("Error deleting work experience:", error);
		}
	};

	return (
		<div>
			{isLoading ? (
				<p>Loading...</p>
			) : (
				<GenericResumeSection
					title="Work Experience"
					schema={workExperienceSchema}
					defaultValues={experiences}
					onSubmit={onSubmit}
					onDelete={onDelete}
				/>
			)}
		</div>
	);
}
