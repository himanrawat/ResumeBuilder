import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function DELETE(request: NextRequest) {
	const { searchParams } = new URL(request.url);
	const collection = searchParams.get("collection");
	const id = searchParams.get("id");

	if (!collection || !id) {
		return NextResponse.json(
			{ error: "Missing collection or id" },
			{ status: 400 }
		);
	}

	try {
		const client = await clientPromise;
		const db = client.db("resumeBuilder");
		const dbCollection = db.collection(collection);

		const result = await dbCollection.deleteOne({ _id: new ObjectId(id) });

		if (result.deletedCount === 1) {
			return NextResponse.json({
				message: `${collection} item deleted successfully`,
			});
		} else {
			return NextResponse.json(
				{ error: `${collection} item not found` },
				{ status: 404 }
			);
		}
	} catch (error) {
		return NextResponse.json(
			{ error: `Failed to delete ${collection} item` },
			{ status: 500 }
		);
	}
}
