import clientPromise from "./mongodb";

interface Product {
  _id: number;
  name: string;
  oldPrice: number;
  newPrice: number;
  category: string;
}

export async function getAllProducts() {
  const client = await clientPromise;
  const db = client.db("mi-clone"); // Replace with your database name
  const products = await db.collection<Product>("products").find({}).toArray();
  return products;
}

export async function getProductById(id: number) {
  const client = await clientPromise;
  const db = client.db("mi-clone");
  const product = await db.collection<Product>("products").findOne({ id: id });
  return product;
}

export async function getProductByName(name: string) {
  const client = await clientPromise;
  const db = client.db("mi-clone");
  const product = await db.collection<Product>("products").findOne({ name });
  return product;
}

export async function getProductsByCategory(category: string) {
  const client = await clientPromise;
  const db = client.db("mi-clone");
  const products = await db.collection<Product>("products").find({ category }).toArray();
  return products;
}