// app/api/orders/route.ts

import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

// fetch the user's orders
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const number = searchParams.get("number");
    const oid = searchParams.get("oid");
    const client = await clientPromise;
    const db = client.db("mi-clone");

    console.log(number, oid);

    if (oid && number) {
      const product = await db.collection("orders").findOne({ shortcode: oid });
      return NextResponse.json(product);
    } else if (number) {
      const product = await db.collection("orders").find({}).toArray();
      return NextResponse.json(product);
    } else {
      return NextResponse.json(
        { error: "Failed to fetch orders" },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

// create a new order
export async function POST(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("mi-clone");
    const data = await request.json();

    const response = await db.collection("orders").insertOne(data);
    return NextResponse.json(response.insertedId);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}
