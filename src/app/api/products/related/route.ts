// /api/products/related/route.ts
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  console.log("Received ID:", id); // Add this line to log the received ID

  try {
    const client = await clientPromise;
    const db = client.db("mi-clone");

    // fetch product by id
    if (id) {
      const product = await db
        .collection("products")
        .findOne({ id: parseInt(id) });

      if (!product) {
        return NextResponse.json(
          { error: "Product not found" },
          { status: 404 }
        );
      }

      // fetch 3 random products of the same category
      const relatedProducts = await db
        .collection("products")
        .aggregate([
          { $match: { category: product.category } },
          { $sample: { size: 3 } },
        ])
        .toArray();
      return NextResponse.json(relatedProducts);
    } else {
      // any 3 random products
      const relatedProducts = await db
        .collection("products")
        .aggregate([{ $sample: { size: 3 } }])
        .toArray();
      return NextResponse.json(relatedProducts);
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
