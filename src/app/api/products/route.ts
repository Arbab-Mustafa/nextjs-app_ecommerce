// /api/products/route.ts
import { NextResponse } from 'next/server';
import clientPromise from "@/lib/mongodb";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  
  try {
    const client = await clientPromise;
    const db = client.db("mi-clone");
    
    if (id) {
      const product = await db.collection("products").findOne({ id: parseInt(id) });
      return NextResponse.json(product);
    }
    
    const products = await db.collection("products").find({}).toArray();
    return NextResponse.json(products);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch products'}, { status: 500 });
  }
}