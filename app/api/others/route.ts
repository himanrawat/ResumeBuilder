// File: app/api/others/route.ts
import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET() {
	try {
		const client = await clientPromise;
		const db = client.db("resumeBuilder");
		const collection = db.collection("others");

		const others = await collection.find({}).toArray();
		return NextResponse.json(others);
	} catch (error) {
		console.error("Failed to fetch other sections:", error);
		return NextResponse.json(
			{ error: "Failed to fetch other sections" },
			{ status: 500 }
		);
	}
}

export async function POST(request: NextRequest) {
	try {
		const client = await clientPromise;
		const db = client.db("resumeBuilder");
		const collection = db.collection("others");

		const newSection = await request.json();
		const result = await collection.insertOne(newSection);

		return NextResponse.json(
			{
				message: "Section added successfully",
				id: result.insertedId,
			},
			{ status: 201 }
		);
	} catch (error) {
		console.error("Failed to add section:", error);
		return NextResponse.json(
			{ error: "Failed to add section" },
			{ status: 500 }
		);
	}
}

export async function PUT(request: NextRequest) {
	try {
		const client = await clientPromise;
		const db = client.db("resumeBuilder");
		const collection = db.collection("others");

		const { id, ...updateData } = await request.json();

		if (!id) {
			return NextResponse.json(
				{ error: "Section ID is required" },
				{ status: 400 }
			);
		}

		const result = await collection.updateOne(
			{ _id: new ObjectId(id) },
			{ $set: updateData }
		);

		if (result.matchedCount === 0) {
			return NextResponse.json({ error: "Section not found" }, { status: 404 });
		}

		return NextResponse.json({ message: "Section updated successfully" });
	} catch (error) {
		console.error("Failed to update section:", error);
		return NextResponse.json(
			{ error: "Failed to update section" },
			{ status: 500 }
		);
	}
}

export async function DELETE(request: NextRequest) {
	try {
		const client = await clientPromise;
		const db = client.db("resumeBuilder");
		const collection = db.collection("others");

		const { searchParams } = new URL(request.url);
		const id = searchParams.get("id");

		if (!id) {
			return NextResponse.json(
				{ error: "Section ID is required" },
				{ status: 400 }
			);
		}

		const result = await collection.deleteOne({ _id: new ObjectId(id) });

		if (result.deletedCount === 0) {
			return NextResponse.json({ error: "Section not found" }, { status: 404 });
		}

		return NextResponse.json({ message: "Section deleted successfully" });
	} catch (error) {
		console.error("Failed to delete section:", error);
		return NextResponse.json(
			{ error: "Failed to delete section" },
			{ status: 500 }
		);
	}
}
