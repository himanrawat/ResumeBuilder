"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { profileSchema, ProfileFormValues } from "./components/schema";
import PersonalInfoForm from "./components/PersonalInfoForm";
import ContactInfoForm from "./components/ContactInfoForm";
import SocialMediaForm from "./components/SocialMediaForm";
import Skills from "./components/Skills";
import { useToast } from "@/components/hooks/use-toast";

export default function Profile() {
	const { toast } = useToast();
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

	useEffect(() => {
		fetch("/api/profile")
			.then((response) => response.json())
			.then((data) => {
				if (data) {
					form.reset(data);
				}
			})
			.catch((error) => console.error("Error fetching profile:", error));
	}, [form]);

	const onSubmit = async (values: ProfileFormValues) => {
		try {
			const response = await fetch("/api/profile", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(values),
			});

			if (response.ok) {
				toast({
					title: "Profile updated",
					description: "Your profile has been updated successfully.",
				});
			} else {
				toast({
					title: "Error",
					description: "Failed to update profile. Please try again.",
					variant: "destructive",
				});
			}
		} catch (error) {
			console.error("Error updating profile:", error);
			toast({
				title: "Error",
				description: "An unexpected error occurred. Please try again.",
				variant: "destructive",
			});
		}
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
