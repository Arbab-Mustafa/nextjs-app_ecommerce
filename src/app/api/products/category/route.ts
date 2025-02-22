// /api/products/route.ts
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const categoryName = searchParams.get("categoryName");

  try {
    const client = await clientPromise;
    const db = client.db("mi-clone");

    if (categoryName) {
      if (categoryName == "tv") {
        const product = await db
          .collection("products")
          .find({ category: { $in: ["tv", "home"] } })
          .toArray();
        return NextResponse.json(product);
      } else if (categoryName == "audio") {
        const product = await db
          .collection("products")
          .find({ category: { $in: ["smartwatch", "audio"] } })
          .toArray();
        return NextResponse.json(product);
      } else {
        const product = await db
          .collection("products")
          .find({ category: categoryName })
          .toArray();
        return NextResponse.json(product);
      }
    }

    const products = await db.collection("products").find({}).toArray();
    return NextResponse.json(products);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
