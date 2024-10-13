import { z } from "zod";

export const profileSchema = z.object({
	firstName: z.string().min(1, { message: "First name is required" }),
	lastName: z.string().min(1, { message: "Last name is required" }),
	address: z
		.string()
		.min(5, { message: "Address should be at least 5 characters" }),
	countryCode: z.string().nonempty({ message: "Country code is required" }),
	phone: z
		.string()
		.nonempty({ message: "Phone number is required" })
		.regex(/^\d+$/, { message: "Phone number must contain only digits" })
		.min(7, { message: "Phone number must be at least 7 digits" })
		.max(15, { message: "Phone number must be at most 15 digits" }),
	email: z.string().email({ message: "Invalid email address" }),
	professionalSummary: z.string().min(100, { message: "Express yourself" }),
	picture: z.string().nullable().optional(),
	socialMedia: z
		.array(
			z.object({
				platform: z.string(),
				icon: z.string(),
				url: z.string().url({ message: "Invalid URL" }),
				customName: z.string().optional(),
				customIcon: z.any().nullable().optional(),
			})
		)
		.optional(),
	skills: z
		.array(z.string())
		.min(1, { message: "At least one skill is required" }),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;
