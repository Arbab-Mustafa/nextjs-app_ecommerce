"use client";
import Header from "@/components/Header";
import { use, useEffect, useState } from "react";

type Product = {
  id: number;
  name: string;
  oldPrice: number;
  newPrice: number;
  category: string;
};

const CategoryPage = ({
  params,
}: {
  params: Promise<{ categoryName: string }>;
}) => {
  const { categoryName } = use(params);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // fetch products by categoryName
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `/api/products/category?categoryName=${categoryName}`
        );
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, [categoryName]);

  return (
    <>
      <Header />
      <div className="min-h-2-bg-gray-100"></div>
      <div className="py-4 px-4">
        {/* <div className="text-lg font-semibold">{categoryName}</div> */}
        <div className="grid grid-cols-2 gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex flex-col items-center bg-white rounded-lg p-2"
              onClick={() => {
                window.location.href = `/products/${product.category.split(' ')[0]}/${product.name.replace(/\s+/g, '-').replaceAll("+", "-plus").toLowerCase()}`;
              }}
            >
              <img
                src={`/thumb/${product.id}.webp`}
                alt={product.name}
                className="w-32 h-32 object-cover mb-2"
              />
              <div className="text-center text-xs font-semibold">
                {product.name.length > 15
                  ? `${product.name.substring(0, 15)}...`
                  : product.name}
              </div>
              <div className="flex mt-1 items-center">
                <div className="text-center text-sm mr-1">
                  ₹{product.newPrice.toFixed(2)}
                </div>
                <div className="text-center text-gray-500 text-xs line-through">
                  ₹{product.oldPrice.toFixed(2)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default CategoryPage;
