import { NextResponse } from "next/server";
import clientPromise from "../../../lib/mongodb";

export async function GET() {
	try {
		const client = await clientPromise;
		const db = client.db("resumeBuilder");
		const collection = db.collection("education");

		const education = await collection.find({}).toArray();
		return NextResponse.json(education);
	} catch (error) {
		return NextResponse.json(
			{ error: "Failed to fetch education" },
			{ status: 500 }
		);
	}
}

export async function POST(request: Request) {
	try {
		const client = await clientPromise;
		const db = client.db("resumeBuilder");
		const collection = db.collection("education");

		const newEducation = await request.json();
		await collection.insertOne(newEducation);
		return NextResponse.json(
			{ message: "Education added successfully" },
			{ status: 201 }
		);
	} catch (error) {
		return NextResponse.json(
			{ error: "Failed to add education" },
			{ status: 500 }
		);
	}
}
