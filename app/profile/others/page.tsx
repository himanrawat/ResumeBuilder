// File: app/profile/others/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { PlusCircle, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
	Card,
	CardHeader,
	CardContent,
	CardFooter,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/hooks/use-toast";

type FieldType = "text" | "textarea" | "date" | "radio" | "checkbox";

interface Field {
	id: string;
	type: FieldType;
	label: string;
	value: string;
	options?: string[];
	showLabel: boolean;
}

interface Section {
	id: string;
	heading: string;
	fields: Field[];
}

const Others: React.FC = () => {
	const [sections, setSections] = useState<Section[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const { toast } = useToast();

	useEffect(() => {
		fetchSections();
	}, []);

	const fetchSections = async () => {
		setIsLoading(true);
		try {
			const response = await fetch("/api/others");
			if (response.ok) {
				const data = await response.json();
				if (Array.isArray(data)) {
					setSections(data);
				}
			} else {
				throw new Error("Failed to fetch sections");
			}
		} catch (error) {
			console.error("Error fetching other sections:", error);
			toast({
				title: "Error",
				description: "Failed to load sections. Please try again.",
				variant: "destructive",
			});
		} finally {
			setIsLoading(false);
		}
	};

	const addSection = async () => {
		const newSection: Omit<Section, "id"> = {
			heading: "",
			fields: [],
		};
		try {
			const response = await fetch("/api/others", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newSection),
			});
			if (response.ok) {
				const result = await response.json();
				setSections([...sections, { ...newSection, id: result.id }]);
				toast({
					title: "Success",
					description: "New section added successfully",
				});
			} else {
				throw new Error("Failed to add new section");
			}
		} catch (error) {
			console.error("Error adding new section:", error);
			toast({
				title: "Error",
				description: "Failed to add new section. Please try again.",
				variant: "destructive",
			});
		}
	};

	const updateSection = async (
		sectionId: string,
		updates: Partial<Section>
	) => {
		try {
			const response = await fetch("/api/others", {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ id: sectionId, ...updates }),
			});
			if (response.ok) {
				setSections(
					sections.map((section) =>
						section.id === sectionId ? { ...section, ...updates } : section
					)
				);
				toast({
					title: "Success",
					description: "Section updated successfully",
				});
			} else {
				throw new Error("Failed to update section");
			}
		} catch (error) {
			console.error("Error updating section:", error);
			toast({
				title: "Error",
				description: "Failed to update section. Please try again.",
				variant: "destructive",
			});
		}
	};

	const removeSection = async (sectionId: string) => {
		try {
			const response = await fetch(`/api/others?id=${sectionId}`, {
				method: "DELETE",
			});
			if (response.ok) {
				setSections(sections.filter((section) => section.id !== sectionId));
				toast({
					title: "Success",
					description: "Section removed successfully",
				});
			} else {
				throw new Error("Failed to remove section");
			}
		} catch (error) {
			console.error("Error removing section:", error);
			toast({
				title: "Error",
				description: "Failed to remove section. Please try again.",
				variant: "destructive",
			});
		}
	};

	const updateSectionHeading = (sectionId: string, heading: string) => {
		updateSection(sectionId, { heading });
	};

	const addField = (sectionId: string, type: FieldType) => {
		const sectionToUpdate = sections.find(
			(section) => section.id === sectionId
		);
		if (!sectionToUpdate) return;

		const newField: Field = {
			id: Date.now().toString(),
			type,
			label: "",
			value: "",
			options:
				type === "radio" || type === "checkbox" ? ["Option 1"] : undefined,
			showLabel: true,
		};

		const updatedFields = [...sectionToUpdate.fields, newField];
		updateSection(sectionId, { fields: updatedFields });
	};

	const updateField = (
		sectionId: string,
		fieldId: string,
		updates: Partial<Field>
	) => {
		const sectionToUpdate = sections.find(
			(section) => section.id === sectionId
		);
		if (!sectionToUpdate) return;

		const updatedFields = sectionToUpdate.fields.map((field) =>
			field.id === fieldId ? { ...field, ...updates } : field
		);

		updateSection(sectionId, { fields: updatedFields });
	};

	const removeField = (sectionId: string, fieldId: string) => {
		const sectionToUpdate = sections.find(
			(section) => section.id === sectionId
		);
		if (!sectionToUpdate) return;

		const updatedFields = sectionToUpdate.fields.filter(
			(field) => field.id !== fieldId
		);
		updateSection(sectionId, { fields: updatedFields });
	};

	const addOption = (sectionId: string, fieldId: string) => {
		const sectionToUpdate = sections.find(
			(section) => section.id === sectionId
		);
		if (!sectionToUpdate) return;

		const updatedFields = sectionToUpdate.fields.map((field) => {
			if (field.id === fieldId && field.options) {
				return {
					...field,
					options: [...field.options, `Option ${field.options.length + 1}`],
				};
			}
			return field;
		});

		updateSection(sectionId, { fields: updatedFields });
	};

	const updateOption = (
		sectionId: string,
		fieldId: string,
		optionIndex: number,
		value: string
	) => {
		const sectionToUpdate = sections.find(
			(section) => section.id === sectionId
		);
		if (!sectionToUpdate) return;

		const updatedFields = sectionToUpdate.fields.map((field) => {
			if (field.id === fieldId && field.options) {
				const newOptions = [...field.options];
				newOptions[optionIndex] = value;
				return { ...field, options: newOptions };
			}
			return field;
		});

		updateSection(sectionId, { fields: updatedFields });
	};

	const renderField = (section: Section, field: Field) => {
		const fieldInput = () => {
			switch (field.type) {
				case "text":
					return (
						<Input
							value={field.value}
							onChange={(e) =>
								updateField(section.id, field.id, { value: e.target.value })
							}
							placeholder="Value"
							className="w-full"
						/>
					);
				case "textarea":
					return (
						<Textarea
							value={field.value}
							onChange={(e) =>
								updateField(section.id, field.id, { value: e.target.value })
							}
							placeholder="Description"
							className="w-full"
						/>
					);
				case "date":
					return (
						<Input
							type="date"
							value={field.value}
							onChange={(e) =>
								updateField(section.id, field.id, { value: e.target.value })
							}
							className="w-full"
						/>
					);
				case "radio":
					return (
						<RadioGroup
							value={field.value}
							onValueChange={(value) =>
								updateField(section.id, field.id, { value })
							}
						>
							{field.options?.map((option, index) => (
								<div key={index} className="flex items-center space-x-2">
									<RadioGroupItem value={option} id={`${field.id}-${index}`} />
									<Label htmlFor={`${field.id}-${index}`}>{option}</Label>
								</div>
							))}
						</RadioGroup>
					);
				case "checkbox":
					return (
						<div className="space-y-2">
							{field.options?.map((option, index) => (
								<div key={index} className="flex items-center space-x-2">
									<Checkbox
										id={`${field.id}-${index}`}
										checked={field.value.split(",").includes(option)}
										onCheckedChange={(checked) => {
											const newValue = checked
												? [
														...field.value.split(",").filter(Boolean),
														option,
												  ].join(",")
												: field.value
														.split(",")
														.filter((v) => v !== option)
														.join(",");
											updateField(section.id, field.id, { value: newValue });
										}}
									/>
									<Label htmlFor={`${field.id}-${index}`}>{option}</Label>
								</div>
							))}
						</div>
					);
				default:
					return null;
			}
		};

		return (
			<div className="space-y-2">
				<div className="flex items-center justify-between">
					<div className="flex items-center space-x-2">
						<Switch
							checked={field.showLabel}
							onCheckedChange={(checked) =>
								updateField(section.id, field.id, { showLabel: checked })
							}
						/>
						<Label>Show Label</Label>
					</div>
					<Button
						variant="destructive"
						size="icon"
						onClick={() => removeField(section.id, field.id)}
					>
						<Trash2 className="h-4 w-4" />
					</Button>
				</div>
				{field.showLabel && (
					<Input
						value={field.label}
						onChange={(e) =>
							updateField(section.id, field.id, { label: e.target.value })
						}
						placeholder="Field Label"
						className="w-full"
					/>
				)}
				{fieldInput()}
				{(field.type === "radio" || field.type === "checkbox") && (
					<div className="pl-4 space-y-2">
						{field.options?.map((option, index) => (
							<div key={index} className="flex items-center space-x-2">
								<Input
									value={option}
									onChange={(e) =>
										updateOption(section.id, field.id, index, e.target.value)
									}
									placeholder={`Option ${index + 1}`}
									className="w-full"
								/>
							</div>
						))}
						<Button onClick={() => addOption(section.id, field.id)}>
							Add Option
						</Button>
					</div>
				)}
			</div>
		);
	};

	if (isLoading) {
		return (
			<div className="flex justify-center items-center h-screen">
				<Loader2 className="h-8 w-8 animate-spin" />
			</div>
		);
	}

	return (
		<>
			<div className="flex items-center justify-between border-b-2 pb-4">
				<h1 className="text-lg font-semibold md:text-2xl">Other Sections</h1>
				<Button onClick={addSection}>
					<PlusCircle className="mr-2 h-4 w-4" /> Add New Section
				</Button>
			</div>
			<div className="mt-4 space-y-4">
				{sections.map((section) => (
					<Card key={section.id} className="p-4">
						<CardHeader className="flex flex-row items-center justify-between p-0 mb-4">
							<Input
								value={section.heading}
								onChange={(e) =>
									updateSectionHeading(section.id, e.target.value)
								}
								placeholder="Section Heading"
								className="text-lg font-semibold"
							/>
							<Button
								variant="destructive"
								size="icon"
								onClick={() => removeSection(section.id)}
							>
								<Trash2 className="h-4 w-4" />
							</Button>
						</CardHeader>
						<CardContent className="p-0 space-y-4">
							{section.fields.map((field) => (
								<div key={field.id} className="space-y-2">
									{renderField(section, field)}
								</div>
							))}
							<div className="flex flex-wrap gap-2">
								<Button onClick={() => addField(section.id, "text")}>
									Add Text
								</Button>
								<Button onClick={() => addField(section.id, "textarea")}>
									Add Description
								</Button>
								<Button onClick={() => addField(section.id, "date")}>
									Add Date
								</Button>
								<Button onClick={() => addField(section.id, "radio")}>
									Add Radio
								</Button>
								<Button onClick={() => addField(section.id, "checkbox")}>
									Add Checkbox
								</Button>
							</div>
						</CardContent>
					</Card>
				))}
			</div>
		</>
	);
};

export default Others;
