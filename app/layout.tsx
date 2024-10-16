"use client";

import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import React, { useEffect, useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
	IconArrowLeft,
	IconBrandTabler,
	IconSettings,
	IconUserBolt,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";

const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});
const geistMono = localFont({
	src: "./fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
});

const links = [
	{
		label: "Dashboard",
		href: "/",
		icon: (
			<IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
		),
	},
	{
		label: "Profile",
		href: "/profile",
		icon: (
			<IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
		),
	},
	{
		label: "Settings",
		href: "/settings",
		icon: (
			<IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
		),
	},
	{
		label: "Logout",
		href: "/logout",
		icon: (
			<IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
		),
	},
];

const Logo = () => {
	return (
		<Link
			href="/"
			className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
		>
			<div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
			<motion.span
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				className="font-medium text-black dark:text-white whitespace-pre"
			>
				LOGO
			</motion.span>
		</Link>
	);
};

const LogoIcon = () => {
	return (
		<Link
			href="/"
			className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
		>
			<div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
		</Link>
	);
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const [open, setOpen] = React.useState(false);
	const [userImage, setUserImage] = useState<string | null>(null);
	const [userName, setUserName] = useState<string>("User");

	useEffect(() => {
		// Fetch user profile data when the component mounts
		fetch("/api/profile")
			.then((response) => response.json())
			.then((data) => {
				if (data.picture) {
					setUserImage(data.picture);
				}
				if (data.firstName && data.lastName) {
					setUserName(`${data.firstName} ${data.lastName}`);
				}
			})
			.catch((error) => console.error("Error fetching profile:", error));
	}, []);

	return (
		<html lang="en">
			<body
				suppressHydrationWarning={true}
				className={cn(
					geistSans.variable,
					geistMono.variable,
					"antialiased dark min-h-screen flex"
				)}
			>
				<div className="flex-shrink-0 h-screen sticky top-0">
					<Sidebar open={open} setOpen={setOpen}>
						<SidebarBody className="flex flex-col h-full">
							<div className="flex-grow overflow-hidden">
								{open ? <Logo /> : <LogoIcon />}
								<div className="mt-8 flex flex-col gap-2">
									{links.map((link, idx) => (
										<SidebarLink key={idx} link={link} />
									))}
								</div>
							</div>
							<div>
								<SidebarLink
									link={{
										label: userName,
										href: "/profile",
										icon: userImage ? (
											<Image
												src={userImage}
												className="h-7 w-7 flex-shrink-0 rounded-full object-cover"
												width={50}
												height={50}
												alt="Avatar"
											/>
										) : (
											<div className="h-7 w-7 flex-shrink-0 rounded-full bg-gray-300" />
										),
									}}
								/>
							</div>
						</SidebarBody>
					</Sidebar>
				</div>
				<main className="flex-1 overflow-auto bg-gray-100 dark:bg-neutral-800">
					<div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 min-h-full">
						{children}
					</div>
				</main>
				<Toaster />
			</body>
		</html>
	);
}
