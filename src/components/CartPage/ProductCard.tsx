import { getProductById } from "@/lib/getProduct";
import { useEffect, useState } from "react";

type Product = {
    _id: number;
    name: string;
    oldPrice: number;
    newPrice: number;
    category: string;
  };

interface ProductCardProps {
  product_id: number;
    quantity: number;
    onRemove: () => void;
    onQuantityChange: () => void;
    }
    

const ProductCard = ({ product_id, quantity, onRemove, onQuantityChange }: ProductCardProps) => {
  const [productDetails, setProductDetails] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      const productDetails = await getProductById(product_id);
      setProductDetails(productDetails);
    };

    fetchProductDetails();
  }, [product_id]);

  if (!productDetails) {
    return     <div className="flex justify-center items-center min-h-screen">
      <img src="/loading.gif" height={80} width={80}/>
    </div>;
  }

  return (


    <div className="flex">
      <div>
        <img src={`/thumb/${product_id}.webp`} alt={productDetails.name} />
      </div>
    </div>
    // <div>
    //   <h1>{productDetails.name}</h1>
    //   <p>Price: {productDetails.newPrice}</p>
    //   <p>Quantity: {quantity}</p>
    //   <button onClick={onRemove}>Remove</button>
    //   <button onClick={onQuantityChange}>Change Quantity</button>
    // </div>
  );
};


export default ProductCard;