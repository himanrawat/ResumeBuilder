import React, { KeyboardEvent } from "react";
import { UseFormReturn } from "react-hook-form";
import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ProfileFormValues } from "./schema";

interface SkillsProps {
	form: UseFormReturn<ProfileFormValues>;
}

const Skills: React.FC<SkillsProps> = ({ form }) => {
	const addSkill = (skill: string) => {
		const trimmedSkill = skill.trim();
		if (trimmedSkill) {
			const currentSkills = form.getValues().skills;
			if (!currentSkills.includes(trimmedSkill)) {
				form.setValue("skills", [...currentSkills, trimmedSkill]);
			}
		}
	};

	const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter") {
			event.preventDefault();
			const input = event.currentTarget;
			addSkill(input.value);
			input.value = "";
		}
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
						<FormControl>
							<Input
								placeholder="Enter a skill and press Enter"
								onKeyDown={handleKeyDown}
							/>
						</FormControl>
						<FormDescription>
							Press Enter to add each skill. Click on a skill to remove it.
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
