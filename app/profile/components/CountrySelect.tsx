// File: app/profile/components/CountrySelect.tsx

import React, { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Country } from "../data/countries"; // Make sure this path is correct

interface CountrySelectProps {
	countries: Country[];
	value: string;
	onChange: (value: string) => void;
}

export const CountrySelect: React.FC<CountrySelectProps> = ({
	countries,
	value,
	onChange,
}) => {
	const [searchTerm, setSearchTerm] = useState("");

	const filteredCountries = useMemo(
		() =>
			countries.filter(
				(country) =>
					country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
					country.code.includes(searchTerm)
			),
		[countries, searchTerm]
	);

	const getUniqueValue = (country: Country) =>
		`${country.code}|${country.name}`;
	const getDisplayValue = (value: string) => value.split("|")[0];

	return (
		<Select
			value={
				value
					? getUniqueValue(
							countries.find((c) => c.code === value) || countries[0]
					  )
					: ""
			}
			onValueChange={(newValue) => onChange(getDisplayValue(newValue))}
		>
			<SelectTrigger className="w-full">
				<SelectValue placeholder="Country Code">
					{value && countries.find((c) => c.code === value)?.flag} {value}
				</SelectValue>
			</SelectTrigger>
			<SelectContent className="p-0">
				<div className="sticky top-0 bg-neutral-800 p-2 z-10">
					<Input
						type="text"
						placeholder="Search..."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className="w-full"
					/>
				</div>
				{filteredCountries.length > 0 ? (
					filteredCountries.map((country) => (
						<SelectItem
							key={getUniqueValue(country)}
							value={getUniqueValue(country)}
							className="flex items-center px-4 py-2 cursor-pointer hover:bg-black whitespace-nowrap"
						>
							<span className="mr-2">{country.flag}</span>
							<span>{country.name}</span>
							<span className="ml-auto">{country.code}</span>
						</SelectItem>
					))
				) : (
					<div className="p-2 text-center text-gray-500">
						No countries found
					</div>
				)}
			</SelectContent>
		</Select>
	);
};
