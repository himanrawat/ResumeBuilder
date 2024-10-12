import React, { useMemo } from "react";
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
import { countries } from "../data/countries";
import { CountrySelect } from "./CountrySelect";

interface ContactInfoFormProps {
	form: UseFormReturn<ProfileFormValues>;
}

const MemoizedCountrySelect = React.memo(CountrySelect);

export default function ContactInfoForm({ form }: ContactInfoFormProps) {
	const memoizedCountries = useMemo(() => countries, []);

	return (
		<div className="space-y-4">
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
				<FormField
					name="phone"
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Phone Number</FormLabel>
							<div className="flex space-x-2">
								<FormField
									name="countryCode"
									control={form.control}
									render={({ field: countryField }) => (
										<FormItem className="">
											<FormControl>
												<MemoizedCountrySelect
													countries={memoizedCountries}
													value={countryField.value}
													onChange={countryField.onChange}
												/>
											</FormControl>
										</FormItem>
									)}
								/>
								<FormControl className="flex-grow">
									<Input
										placeholder="Phone Number"
										{...field}
										inputMode="numeric"
										pattern="[0-9]*"
									/>
								</FormControl>
							</div>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					name="email"
					control={form.control}
					render={({ field }) => (
						<FormItem className="col-span-2">
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input type="email" placeholder="Email" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>
			<FormField
				name="address"
				control={form.control}
				render={({ field }) => (
					<FormItem>
						<FormLabel>Address</FormLabel>
						<FormControl>
							<Textarea placeholder="Enter Your Address" {...field} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
		</div>
	);
}
