import React from "react";
import { UseFormReturn, useFieldArray } from "react-hook-form";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { ProfileFormValues } from "./schema";
import {
	Github,
	Linkedin,
	Facebook,
	Twitter,
	Instagram,
	Globe,
} from "lucide-react";

const socialIcons = {
	github: Github,
	linkedin: Linkedin,
	facebook: Facebook,
	twitter: Twitter,
	instagram: Instagram,
	other: Globe,
};

interface SocialMediaFormProps {
	form: UseFormReturn<ProfileFormValues>;
}

export default function SocialMediaForm({ form }: SocialMediaFormProps) {
	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: "socialMedia",
	});

	return (
		<div className="space-y-4">
			<h2 className="text-lg font-semibold">Social Media</h2>
			{fields.map((item, index) => (
				<div
					key={item.id}
					className="gap-2 p-4 border rounded grid grid-cols-4"
				>
					<div className="flex">
						<FormField
							name={`socialMedia.${index}.icon`}
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<Select
										onValueChange={(value) => {
											field.onChange(value);
											if (value === "other") {
												form.setValue(`socialMedia.${index}.customIcon`, null);
												form.setValue(`socialMedia.${index}.customName`, "");
											} else {
												form.setValue(
													`socialMedia.${index}.customName`,
													undefined
												);
											}
										}}
										value={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Select platform" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{Object.keys(socialIcons).map((key) => (
												<SelectItem key={key} value={key}>
													<div className="flex items-center gap-2">
														{React.createElement(
															socialIcons[key as keyof typeof socialIcons],
															{ size: 16 }
														)}
														{key.charAt(0).toUpperCase() + key.slice(1)}
													</div>
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>

						{form.watch(`socialMedia.${index}.icon`) === "other" && (
							<FormField
								name={`socialMedia.${index}.customName`}
								control={form.control}
								render={({ field }) => (
									<FormItem>
										{/* <FormLabel>Custom Platform Name</FormLabel> */}
										<FormControl>
											<Input placeholder="Enter platform name" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						)}
					</div>

					<FormField
						name={`socialMedia.${index}.url`}
						control={form.control}
						render={({ field }) => (
							<FormItem className="">
								<FormControl>
									<Input placeholder="Enter URL" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button
						type="button"
						variant="destructive"
						onClick={() => remove(index)}
						className=""
					>
						Remove
					</Button>
				</div>
			))}

			<Button
				type="button"
				onClick={() =>
					append({ platform: "", icon: "other", url: "", customName: "" })
				}
			>
				Add Social Media
			</Button>
		</div>
	);
}
