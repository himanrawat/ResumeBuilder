// File: app/api/profile/route.ts
import { NextResponse } from "next/server";
import clientPromise from "../../../lib/mongodb";

export async function GET() {
	try {
		const client = await clientPromise;
		const db = client.db("resumeBuilder");
		const collection = db.collection("profile");

		const profile = await collection.findOne({});
		return NextResponse.json(profile);
	} catch (error) {
		return NextResponse.json(
			{ error: "Failed to fetch profile" },
			{ status: 500 }
		);
	}
}

export async function POST(request: Request) {
	try {
		const client = await clientPromise;
		const db = client.db("resumeBuilder");
		const collection = db.collection("profile");

		const updatedProfile = await request.json();

		// You can choose to store countryCode and phone separately or combine them
		// Option 1: Store separately (recommended for flexibility)
		await collection.updateOne({}, { $set: updatedProfile }, { upsert: true });

		// Option 2: Combine countryCode and phone
		// const combinedProfile = {
		//   ...updatedProfile,
		//   fullPhoneNumber: `${updatedProfile.countryCode}${updatedProfile.phone}`,
		// };
		// await collection.updateOne({}, { $set: combinedProfile }, { upsert: true });

		return NextResponse.json({ message: "Profile updated successfully" });
	} catch (error) {
		return NextResponse.json(
			{ error: "Failed to update profile" },
			{ status: 500 }
		);
	}
}
