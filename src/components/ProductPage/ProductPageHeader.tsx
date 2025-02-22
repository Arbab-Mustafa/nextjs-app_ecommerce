"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { IoCartOutline, IoChatbubbleEllipsesOutline } from "react-icons/io5";

interface ProductPageHeaderProps {
  product: string;
}

const ProductPageHeader = ({ product }: ProductPageHeaderProps) => {
  const [cartItemsCount, setCartItemsCount] = useState(0);

  useEffect(() => {
    // Update cart count on mount and when localStorage changes
    const updateCartCount = () => {
      try {
        const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
        setCartItemsCount(cartItems.length);
      } catch (error) {
        console.error("Error parsing cart items:", error);
        setCartItemsCount(0);
      }
    };

    // Initial cart count
    updateCartCount();
  }, []);

  return (
    <header className="top-0 bg-gray-100 shadow-md w-full">
      <div className="flex items-center px-5 py-3">
        <div className="flex items-center">
          {/* Back Button */}
            <div className="font-semibold flex items-center">
            <button
              onClick={() => {
                window.history.back();
              }}
            >
              <Image
                src={"/arrow-back.svg"}
                height={21.12}
                width={13.04}
                alt="back"
              />
            </button>
          </div>

          <div className="pl-4 text-[15px] font-semibold">{product}</div>
        </div>

        {/* Icons */}
        <div className="flex space-x-2 text-xl px-1 text-gray-600 ml-auto">
          {/* ChatIcon */}
          <button aria-label="Search" className="">
          <Image src={"/msg-icon.svg"} height={30} width={30} alt="cart" />
          </button>

          {/* Cart Icon */}
          <button
            aria-label="Cart"
            className="relative"
            onClick={() => {
              window.location.href = "/cart";
            }}
          >
            <Image src={"/cart-icon.svg"} height={30} width={25} alt="cart" />
            {cartItemsCount !== 0 ? (
              <span className="absolute top-1 right-0 bg-orange-500 text-white rounded-full text-[10px] w-2 h-2 p-2 flex items-center justify-center transform translate-x-1/2 -translate-y-1/2">
                {cartItemsCount}
              </span>
            ) : (
              <span className="absolute top-1 right-0 bg-orange-500 text-white rounded-full text-[10px] w-2 h-2 p-2 flex items-center justify-center transform translate-x-1/2 -translate-y-1/2">
                {0}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default ProductPageHeader;
