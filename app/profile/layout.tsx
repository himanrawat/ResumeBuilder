"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ProfileLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const pathname = usePathname();
	return (
		<>
			<div className="mb-4 md:mb-8">
				<h1 className="lg:text-9xl md:text-6xl text-4xl">Profile</h1>
				<p>Mange your Profile</p>
			</div>
			<div className="grid w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
				<div className="hidden md:block">
					<div className="flex h-full max-h-screen flex-col gap-2">
						<div className="flex-1">
							<nav className="grid items-start px-2 text-sm font-medium lg:px-4 ">
								<Link
									href="/profile"
									className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
										pathname === "/profile" ? "text-primary bg-neutral-700" : ""
									}`}
								>
									About You
								</Link>
								<Link
									href="/profile/experience"
									className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
										pathname === "/profile/experience"
											? "text-primary bg-neutral-700"
											: ""
									}`}
								>
									Work Experience
								</Link>

								<Link
									href="/profile/education"
									className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
										pathname === "/profile/education"
											? "text-primary bg-neutral-700"
											: ""
									}`}
								>
									Education
								</Link>
								<Link
									href="/profile/others"
									className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
										pathname === "/profile/others"
											? "text-primary bg-neutral-700"
											: ""
									}`}
								>
									Others
								</Link>
							</nav>
						</div>
					</div>
				</div>
				<main className="flex flex-1 flex-col gap-4 px-4 lg:gap-6 lg:px-6">
					{children}
				</main>
			</div>
		</>
	);
}
