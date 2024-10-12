"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { profileSchema, ProfileFormValues } from "./components/schema";
import PersonalInfoForm from "./components/PersonalInfoForm";
import ContactInfoForm from "./components/ContactInfoForm";
import SocialMediaForm from "./components/SocialMediaForm";
import Skills from "./components/Skills";

export default function Profile() {
	const form = useForm<ProfileFormValues>({
		resolver: zodResolver(profileSchema),
		defaultValues: {
			firstName: "",
			lastName: "",
			professionalSummary: "",
			address: "",
			countryCode: "",
			phone: "",
			email: "",
			picture: null,
			socialMedia: [],
			skills: [],
		},
	});

	const onSubmit = (values: ProfileFormValues) => {
		const fullPhoneNumber = `${values.countryCode}${values.phone}`;
		console.log({ ...values, fullPhoneNumber });
	};

	return (
		<>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
					<PersonalInfoForm form={form} />
					<ContactInfoForm form={form} />
					<SocialMediaForm form={form} />
					<Skills form={form} />
					<Button type="submit" className="w-full">
						Update Profile
					</Button>
				</form>
			</Form>
		</>
	);
}
