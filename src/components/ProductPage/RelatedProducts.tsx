import { useEffect, useState } from "react";
import { LiaRupeeSignSolid } from "react-icons/lia";

type Product = {
  id: number;
  name: string;
  oldPrice: number;
  newPrice: number;
  category: string;
};

interface RelatedProductsProps {
  productId: number;
}

const RelatedProducts = ({ productId }: RelatedProductsProps) => {
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Fetch related products
    const fetchRelatedProducts = async () => {
      try {
        const response = await fetch(`/api/products/related?id=${productId}`);
        const products = await response.json();

        // Set related products and log the products fetched
        setRelatedProducts(products);
        console.log(products);
      } catch (error) {
        console.error("Failed to fetch related products:", error);
      }
    };

    fetchRelatedProducts();
  }, [productId]);

  return (
    <div className="py-2 px-4">
      <div className="text-sm pb-2">Related Recommended Products</div>
      <div className="grid grid-cols-3 gap-4">
        {Array.isArray(relatedProducts) &&
          relatedProducts.slice(0, 3).map((product) => (
            <div
              key={product.id}
              className="flex flex-col items-center"
              onClick={() => {
                window.location.href = `../${
                  product.category.split(" ")[0]
                }/${product.name
                  .replace(/\s+/g, "-")
                  .replaceAll("+", "-plus")
                  .toLowerCase()}`;
              }}
            >
              <img
                src={`/thumb/${product.id}.webp`}
                alt={product.name}
                className="w-24 h-24 object-cover mb-2"
              />
              <div className="text-left text-xs">
                {product.name.length > 15
                  ? `${product.name.substring(0, 15)}...`
                  : product.name}
              </div>
              <div className="text-left text-gray-500 text-xs flex space-x-1">
                <div className="text-orange-400 font-medium flex items-center">
                  ₹{product.newPrice.toFixed(2)}{" "}
                </div>
                <div className="text-gray-400 font-medium flex items-center line-through">
                  ₹{product.oldPrice.toFixed(2)}{" "}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
