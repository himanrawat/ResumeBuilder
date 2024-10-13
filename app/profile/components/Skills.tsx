import React, { KeyboardEvent, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ProfileFormValues } from "./schema";

interface SkillsProps {
	form: UseFormReturn<ProfileFormValues>;
}

const Skills: React.FC<SkillsProps> = ({ form }) => {
	const [inputValue, setInputValue] = useState("");

	const normalizeSkill = (skill: string): string => {
		return skill.trim().toLowerCase();
	};

	const addSkills = (skillsString: string) => {
		const skillsArray = skillsString
			.split(",")
			.map((skill) => skill.trim())
			.filter(Boolean);
		const currentSkills = form.getValues().skills;
		const normalizedCurrentSkills = currentSkills.map(normalizeSkill);

		const newUniqueSkills = skillsArray.filter(
			(skill) => !normalizedCurrentSkills.includes(normalizeSkill(skill))
		);

		if (newUniqueSkills.length > 0) {
			form.setValue("skills", [...currentSkills, ...newUniqueSkills]);
		}
		setInputValue("");
	};

	const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter") {
			event.preventDefault();
			addSkills(inputValue);
		}
	};

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(event.target.value);
	};

	const handleAddClick = () => {
		addSkills(inputValue);
	};

	const deleteSkill = (indexToRemove: number) => {
		const currentSkills = form.getValues().skills;
		form.setValue(
			"skills",
			currentSkills.filter((_, index) => index !== indexToRemove)
		);
	};

	return (
		<div>
			<h2 className="text-lg font-semibold mb-2">Skills</h2>
			<FormField
				control={form.control}
				name="skills"
				render={() => (
					<FormItem>
						<div className="flex space-x-2">
							<FormControl>
								<Input
									placeholder="Enter skills (comma-separated)"
									onKeyDown={handleKeyDown}
									onChange={handleInputChange}
									value={inputValue}
								/>
							</FormControl>
							<Button type="button" onClick={handleAddClick}>
								Add
							</Button>
						</div>
						<FormDescription>
							Enter skills separated by commas, then press Enter or click Add.
							Skills are case-insensitive (e.g., "JavaScript" and "javascript"
							are treated as the same). Duplicate skills will be ignored. Click
							on a skill to remove it.
						</FormDescription>
						<FormMessage />
					</FormItem>
				)}
			/>
			<div className="mt-2 flex flex-wrap gap-2">
				{form.watch("skills").map((skill, index) => (
					<span
						key={index}
						onClick={() => deleteSkill(index)}
						className="inline-flex items-center justify-center rounded-full bg-primary px-2.5 py-0.5 text-primary-foreground cursor-pointer"
					>
						<p className="whitespace-nowrap text-sm">{skill}</p>
						<button
							type="button"
							className="-me-1 ms-1.5 inline-block rounded-full bg-stone-300 p-0.5 text-primary-foreground transition hover:bg-stone-700 hover:text-primary"
						>
							<span className="sr-only">Remove skill</span>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth="1.5"
								stroke="currentColor"
								className="w-3 h-3"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						</button>
					</span>
				))}
			</div>
		</div>
	);
};

export default Skills;
