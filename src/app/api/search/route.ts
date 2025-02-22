// app/api/search/route.ts
import { NextResponse } from 'next/server';
import clientPromise from "@/lib/mongodb";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');
  
  try {
    const client = await clientPromise;
    const db = client.db("mi-clone");
    
    if (query) {
      // Create a case-insensitive regex search
      const products = await db.collection("products")
        .find({
          name: { $regex: query, $options: 'i' }
        })
        .project({ name: 1, newPrice: 1, category: 1 })
        .toArray();
      
      return NextResponse.json(products);
    }
    
    // If no query, return empty array
    return NextResponse.json([]);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to search products' }, { status: 500 });
  }
}