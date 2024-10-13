import { NextResponse } from "next/server";
import clientPromise from "../../../lib/mongodb";

export async function GET() {
	try {
		const client = await clientPromise;
		const db = client.db("resumeBuilder");
		const collection = db.collection("experience");

		const experience = await collection.find({}).toArray();
		return NextResponse.json(experience);
	} catch (error) {
		return NextResponse.json(
			{ error: "Failed to fetch experience" },
			{ status: 500 }
		);
	}
}

export async function POST(request: Request) {
	try {
		const client = await clientPromise;
		const db = client.db("resumeBuilder");
		const collection = db.collection("experience");

		const newExperience = await request.json();
		await collection.insertOne(newExperience);
		return NextResponse.json(
			{ message: "Experience added successfully" },
			{ status: 201 }
		);
	} catch (error) {
		return NextResponse.json(
			{ error: "Failed to add experience" },
			{ status: 500 }
		);
	}
}
