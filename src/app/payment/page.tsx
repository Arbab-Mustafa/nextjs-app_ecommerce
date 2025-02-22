"use client";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { FiCreditCard } from "react-icons/fi";
import Image from "next/image";

const Payment = () => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    address: "",
    landmark: "",
    city: "",
    pincode: "",
    state: "",
    phone: "",
  });

  interface Variant {
    storage: string;
    color: string;
  }

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

  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [isLoading, setIsLoading] = useState(true);
  const [cartItems, setCartItems] = useState<CartItemWithDetails[]>([]);
  const [showDeliveryMethods, setShowDeliveryMethods] = useState(false);
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
    const initializeData = async () => {
      try {
        // Load address data
        const addressData = localStorage.getItem("address");
        if (!addressData) {
          window.location.href = "/checkout";
          return;
        }
        setUserDetails(JSON.parse(addressData));

        // Load cart items
        const storedCartItems = localStorage.getItem("cartItems");
        if (!storedCartItems) {
          window.location.href = "/cart";
          setCartItems([]);
          setIsLoading(false);
          return;
        }

        const parsedCartItems: CartItemWithDetails[] =
          JSON.parse(storedCartItems);

        // Fetch product details for each cart item
        const itemsWithDetails = await Promise.all(
          parsedCartItems.map(async (item) => {
            const productDetails: Product | null = await fetchProductDetails(
              item.productId
            );
            if (productDetails) {
              productDetails.variant = item.variant;
            }
            return {
              ...item,
              product: productDetails || undefined,
            };
          })
        );

        setCartItems(itemsWithDetails);
        setSelectedStorageOption(
          localStorage.getItem("selectedStorageOption") ?? ""
        );
        setSelectedColorOption(
          localStorage.getItem("selectedColourOption") ?? ""
        );
      } catch (error) {
        console.error("Error initializing data:", error);
        // Handle error appropriately
      } finally {
        setIsLoading(false);
      }
    };

    initializeData();
  }, []);

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => {
      return sum + (item.product?.newPrice || 0) * item.quantity;
    }, 0);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <img src="/loading.gif" height={80} width={80} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f6f6]">
      <Header />

      {/* Address Section */}
      <div className="p-4 relative mx-2 bg-white rounded-lg my-2">
        <div className="flex items-center mb-2">
          <span className="font-medium">{userDetails.name}</span>
          <div className="text-[#FF5500] border border-[#FF5500] text-[9px] bg-[#FFECDF] rounded-sm ml-2 p-0.5 px-3 text-center align-middle font-light">
            Default
          </div>
        </div>
        <div className="text-xs font-light mb-1">
          +91{" "}
          {userDetails.phone?.replace(/(\d{3})\d*(\d{3})/, "$1******$2") || ""}
        </div>
        <div className="text-xs font-light">
          {[userDetails.address, userDetails.landmark]
            .filter(Boolean)
            .join(", ")}
        </div>
        <div className="text-xs font-light">
          {[
            userDetails.city,
            userDetails.state?.toUpperCase(),
            userDetails.pincode,
          ]
            .filter(Boolean)
            .join(", ")}
        </div>
        <button
          onClick={() => (window.location.href = "/checkout")}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg"
        >
          <IoIosArrowForward />
        </button>
      </div>

      {/* GST */}

      <div className="p-4 mx-2 bg-white rounded-lg my-2">
        <button className="flex w-full items-center">
          <span className="font-medium text-base">Billing address/ GSTIN</span>
          <IoIosArrowForward className="ml-auto text-gray-400 text-lg" />
        </button>

        <hr className="my-3" />

        <div className="flex items-center mx-2">
          <input type="checkbox" name="" id="" disabled />
          <span className="font-light text-[13px] pl-4">
            Use GSTIN for this order (optional)
          </span>
        </div>
      </div>

      {/* Delivery Method Section */}
      <div className="p-4 mx-2 bg-white rounded-lg my-2">
        <button
          className="flex w-full items-center"
          onClick={() => setShowDeliveryMethods(!showDeliveryMethods)}
        >
          <span className="font-medium">Delivery method</span>
          {showDeliveryMethods ? (
            <IoIosArrowDown className="ml-auto text-gray-400 text-lg" />
          ) : (
            <IoIosArrowForward className="ml-auto text-gray-400 text-lg" />
          )}
        </button>

        <hr className="my-3" />

        <div className="border border-[#FF5500] p-4 flex flex-row rounded-sm">
          <Image
            className=""
            src={"/opt-btn.svg"}
            alt="opt"
            width={12}
            height={12}
          />
          <div className="px-3">
            <div className="text-[13px] mb-1 font-light">Free Delivery</div>
            <div className="text-[13px] mb-1 font-light">
              Estimated Delivery:{" "}
              {new Date(
                Date.now() + 5 * 24 * 60 * 60 * 1000
              ).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </div>
            <div className="text-[13px] text-[#FF5500] font-light">
              Free shipping on all orders
            </div>
          </div>
          <div className="ml-auto my-auto">
            <span className="text-[13px] font-semibold">
              <span className="font-[Arial]">₹</span>0.00
            </span>
          </div>
        </div>
      </div>

      {/* Cart Items Section */}
      <div className="p-4 bg-white mx-2 rounded-lg">
        <div className="py-2">
          <span className="font-medium">
            {cartItems.length} {cartItems.length === 1 ? "Item" : "Items"}
          </span>
        </div>

        <hr className="mb-4" />
        {cartItems.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600">Your cart is empty</p>
          </div>
        ) : (
          <div>
            {cartItems.map((item) => (
              <div key={item.product?.id} className="">
                <div className="flex items-center space-x-4 bg-white">
                  <img
                    src={`/thumb/${item.productId}.webp`}
                    alt={item.product?.name}
                    className="w-24 h-24 object-cover shadow-md"
                  />
                  <div className="flex-1">
                    <div className="text-[15px]">
                      {item.product?.name}{" "}
                      {selectedStorageOption == ""
                        ? item.product?.variant
                        : `${selectedColorOption} ${selectedStorageOption}`}
                    </div>
                    <div className="text-[13px] mt-1 text-gray-400 font-light">
                      Quantity: {item.quantity}
                    </div>
                    <p className="text-[11px] font-light mt-1">
                      Sold by: Xiaomi Technology India Private Limited
                    </p>
                    <div className="text-[15px] mt-2">
                      <span className="font-[Arial]">₹</span>
                      {(
                        (item.product?.newPrice || 0) * item.quantity
                      ).toLocaleString()}
                    </div>
                  </div>
                </div>
                <div className="mt-3 bg-[#EEEEEE] py-1 px-2 rounded-sm text-xs font-light text-[#999898] flex items-center">
                  <div>Estimated delivery 06 Dec 2024</div>
                  <div className="ml-auto">
                    <div className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center font-light">
                      ?
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Payment Method */}
      <div className="p-4 bg-white mx-2 rounded-lg mt-2">
        <button className="flex w-full items-center">
          <span className="font-medium">Payment method</span>
          <IoIosArrowDown className="ml-auto text-gray-400 text-lg" />
        </button>

        <hr className="mt-2 mb-3" />
        <div>
          <div className="border p-4 border-[#FF5500] rounded-sm flex flex-row items-center">
            <Image
              src={"/summary-opt.svg"}
              width={12}
              height={12}
              alt="checkbox"
            />
            <FiCreditCard className="ml-2 h-7 w-7" />
            <div className="ml-4">
              <span className="text-[15px] font-medium mb-0.5">
                Online Payment
              </span>
              <Image
                src={"/pay-methods.png"}
                width={200}
                height={50}
                alt="payment methods"
              />
            </div>
          </div>
          <div className="text-gray-400 text-xs ml-4 pt-2 pb-2 font-light">
            Select for following options:
            <ul className="list-disc ml-4 mt-1 text-[10px]">
              <li>Credit/Debit Card</li>
              <li>Net Banking</li>
              <li>UPI</li>
              <li>Wallets</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Order Summary */}
      <div className="p-4 bg-white mx-2 rounded-lg mt-2">
        <h3 className="font-medium mb-2.5">Order Summary</h3>
        <div className="flex justify-between text-base mb-6">
          <span>Total</span>
          <span className="text-[#FF5500] font-medium">
            <span className="font-[Arial]">₹</span>
            {calculateSubtotal().toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between text-base mb-6">
          <span>Subtotal</span>
          <span className="font-medium text-[#FF5500]">
            <span className="font-[Arial]">₹</span>
            {calculateSubtotal().toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between text-base mb-2">
          <span>Shipping Fee</span>
          <span className="font-medium">FREE</span>
        </div>
      </div>

      <div className="bg-gray-100 text-xs p-2 text-gray-400">
        By placing an order, you have read and agreed to Mi.com's{" "}
        <span className="text-[#FF6900]">Terms of use </span>
        and
        <span className="text-[#FF6900]"> Privacy Policy.</span>
      </div>

      {/* Payment Button */}
      <div className="sticky bottom-0 left-0 right-0 px-3 bg-white shadow-lg flex items-center py-2">
        <div className="text-base">
          Total:{" "}
          <span className="font-semibold text-lg text-[#FF5500]">
            <span className="font-[Arial]">₹</span>
            {calculateSubtotal().toLocaleString()}
          </span>
        </div>
        <div
          className="ml-auto m-1"
          onClick={() => {
            window.location.href = "/payment/process";
          }}
        >
          <div className="px-4 py-2 rounded-lg bg-black text-white text-sm">
            Continue
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
