"use client";

import Header from "@/components/Header";
import { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import Image from "next/image";
import CartPageHeader from "@/components/CartPage/CartPageHeader";

interface CartItem {
  productId: string;
  quantity: number;
  variant: string;
}

interface Product {
  id: number;
  name: string;
  oldPrice: number;
  newPrice: number;
  category: string;
  variant: string;
}

interface CartItemWithDetails extends CartItem {
  product?: Product;
}

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItemWithDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedStorageOption, setSelectedStorageOption] = useState<string>();
  const [selectedColorOption, setSelectedColorOption] = useState<string>();

  const fetchProductDetails = async (
    productId: string
  ): Promise<Product | null> => {
    try {
      const response = await fetch(`/api/products?id=${productId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch product");
      }
      const product = await response.json();
      return product;
    } catch (error) {
      console.error(`Error fetching product ${productId}:`, error);
      return null;
    }
  };

  useEffect(() => {
    const loadCartItems = async () => {
      try {
        setError(null);
        const storedCartItems = JSON.parse(
          localStorage.getItem("cartItems") ?? "[]"
        );

        // Fetch product details for each cart item
        const itemsWithDetails = await Promise.all(
          storedCartItems.map(async (item: CartItem) => {
            const product = await fetchProductDetails(item.productId);
            if (product) {
              product.variant = item.variant;
            }
            return {
              ...item,
              product: product ?? undefined,
            };
          })
        );

        // Filter out items where product details couldn't be fetched
        const validItems = itemsWithDetails.filter((item) => item.product);
        setCartItems(validItems);
        setSelectedStorageOption(localStorage.getItem("selectedStorageOption") ?? "");
        setSelectedColorOption(localStorage.getItem("selectedColourOption") ?? "");
      } catch (error) {
        console.error("Error loading cart items:", error);
        setError("Failed to load cart items. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    loadCartItems();
  }, []);

  const updateQuantity = (productId: string, newQuantity: number) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems
        .map((item) =>
          item.productId === productId
            ? { ...item, quantity: Math.max(0, newQuantity) }
            : item
        )
        .filter((item) => item.quantity > 0); // Remove items with quantity 0

      localStorage.setItem("cartItems", JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  const removeItem = (productId: string) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.filter(
        (item) => item.productId !== productId
      );
      localStorage.setItem("cartItems", JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.product?.newPrice ?? 0) * item.quantity;
    }, 0);
  };

  const calculateTotalDiscount = () => {
    return cartItems.reduce((total, item) => {
      return (
        total +
        ((item.product?.oldPrice ?? 0) - (item.product?.newPrice ?? 0)) *
          item.quantity
      );
    }, 0);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <img src="/loading.gif" height={80} width={80} />
      </div>
    );
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  return (
    <div>
      <CartPageHeader />
      <div className="p-4 max-w-4xl mx-auto">
        {cartItems.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600">Your cart is empty</p>
          </div>
        ) : (
          <div className="">
            {cartItems.map((item) => (
              <div key={item.productId}>
                <div className="flex items-center space-x-4 bg-white p-4 rounded-md">
                  <img
                    src={`/thumb/${item.productId}.webp`}
                    alt={item.product?.name}
                    className="w-24 h-24 object-cover shadow-md"
                  />
                  <div>
                    <div className="text-sm">
                      {item.product?.name} {selectedStorageOption == "" ? item.product?.variant: `${selectedColorOption} ${selectedStorageOption}`}
                    </div>
                    <p className="text-xs font-light text-gray-400">
                      Xiaomi Technology India Private Limited
                    </p>
                  </div>
                </div>
                <div className="bg-white px-4 pt-4 rounded-md pb-6">
                  <div className="flex items-center">
                    <div className="flex flex-col">
                      <div className="flex items-center space-x-1">
                        <span className="text-[#FF6900] text-[15px]">
                          <span className="font-[Arial]">₹</span>
                          {item.product?.newPrice.toLocaleString()}
                        </span>
                        <span className="text-gray-400 line-through text-[15px] font-light">
                          <span className="font-[Arial]">₹</span>
                          {item.product?.oldPrice.toLocaleString()}
                        </span>
                      </div>
                      <span className="bg-orange-600 text-white text-[8px] w-12 p-1 rounded-sm mt-1 text-center mb-1 align-top">
                        {Math.round(
                          (((item.product?.oldPrice ?? 0) -
                            (item.product?.newPrice ?? 0)) /
                            (item.product?.oldPrice ?? 1)) *
                            100
                        )}
                        % Off
                      </span>
                    </div>
                    <div className="ml-auto">
                      <button
                        onClick={() => removeItem(item.productId)}
                        className="text-gray-500 text-xl align-middle mr-2"
                      >
                        <RiDeleteBin6Line />
                      </button>
                      <button
                        // onClick={() =>
                        //   updateQuantity(item.productId, item.quantity - 1)
                        // }
                        className={`text-sm border border-gray-300 px-2 ${
                          item.quantity === 1
                            ? "text-gray-300 cursor-not-allowed"
                            : "text-gray-500"
                        }`}
                        disabled={item.quantity === 1}
                      >
                        -
                      </button>
                      <span className="mx-2">{item.quantity}</span>
                      <button
                        // onClick={() =>
                        //   updateQuantity(item.productId, item.quantity + 1)
                        // }
                        className="text-sm text-gray-500 border border-gray-300 px-2"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <div className="min-h-1"></div>
              </div>
            ))}
            <div className="mt-5 rounded-md p-4 text-[13px] bg-white">
              Free shipping applies if the order price reaches 499. Special
              products are not included.
            </div>

            <div className="mt-5 rounded-md p-4 text-[13px] bg-white">
              Free 1 Year warranty on all prodcuts worth 999.
            </div>

            <div className="bg-white mt-4 p-4 flex items-center rounded-md">
              <div>
                <Image
                  src={"/discount-icon.svg"}
                  width={40}
                  alt="discount"
                  height={40}
                />
              </div>
              <div className="ml-3">Exclusive discount</div>
              <div className="text-[#FF6900] font-medium ml-auto">
                -<span className="font-[Arial]">₹</span>
                {calculateTotalDiscount().toFixed(2)}
              </div>
            </div>

            <div className="bg-white mt-4 px-4 rounded-md">
              <div className="flex items-center py-5">
                <div className="text-[#676767]">Subtotal:</div>
                <div className="ml-auto font-semibold text-[#676767]">
                  <span className="font-[Arial]">₹</span>
                  {calculateTotal().toFixed(2)}
                  {}
                </div>
              </div>
              <hr className="pt-5 h-1" />

              <div className="text-[#676767] pb-6 mb-4">
                This order saves you{" "}
                <span className="font-semibold">
                  <span className="font-[Arial]">₹</span>
                  {calculateTotalDiscount().toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="fixed bottom-0 w-full bg-white border-t border-gray-200">
        <div className="flex justify-center ml-4 items-center">
          <span className="text-orange-500 font-semibold">
            {" "}
            Total: <span className="font-[Arial]">₹</span>
            {calculateTotal().toFixed(2)}
          </span>
          <button
            className="bg-orange-500 disabled:bg-gray-400 text-white ml-auto py-4 px-6 font-semibold"
            onClick={() => (window.location.href = "/checkout")}
            disabled={cartItems.length === 0}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
