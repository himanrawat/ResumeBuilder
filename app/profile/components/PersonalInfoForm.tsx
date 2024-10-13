import React, { useState, useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ProfileFormValues } from "./schema";

interface PersonalInfoFormProps {
	form: UseFormReturn<ProfileFormValues>;
}

export default function PersonalInfoForm({ form }: PersonalInfoFormProps) {
	const [imagePreview, setImagePreview] = useState<string | null>(null);

	useEffect(() => {
		const picture = form.getValues("picture");
		if (picture && typeof picture === "string") {
			setImagePreview(picture);
		}
	}, [form]);

	const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				const base64String = reader.result as string;
				setImagePreview(base64String);
				form.setValue("picture", base64String);
			};
			reader.readAsDataURL(file);
		}
	};

	return (
		<div className="space-y-4">
			<FormField
				name="picture"
				control={form.control}
				render={({ field }) => (
					<FormItem>
						<FormLabel>Upload Profile Picture (Optional)</FormLabel>
						<div className="flex justify-center items-center gap-4 md:flex-row flex-col">
							{imagePreview && (
								<img
									src={imagePreview}
									alt="Profile Preview"
									className="mt-2 w-24 h-24 rounded-full object-cover"
								/>
							)}
							<FormControl>
								<Input
									type="file"
									accept="image/*"
									onChange={(e) => {
										field.onChange(e);
										handleImageChange(e);
									}}
								/>
							</FormControl>
						</div>
						<FormMessage />
					</FormItem>
				)}
			/>
			<div className="grid grid-cols-2 gap-2">
				<FormField
					name="firstName"
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>First Name</FormLabel>
							<FormControl>
								<Input placeholder="First Name" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					name="lastName"
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Last Name</FormLabel>
							<FormControl>
								<Input placeholder="Last Name" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>

			<FormField
				name="professionalSummary"
				control={form.control}
				render={({ field }) => (
					<FormItem>
						<FormLabel>Professional Summary</FormLabel>
						<FormControl>
							<Textarea
								placeholder="Enter Your Professional Summary"
								{...field}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
		</div>
	);
}
