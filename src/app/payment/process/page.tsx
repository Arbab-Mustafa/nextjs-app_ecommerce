"use client";
import Header from "@/components/Header";
import { useEffect, useState } from "react";
import Image from "next/image";

const PaymentProcess = () => {
  // Interfaces for type safety
  interface Variant {
    storage: string;
    color: string;
  }

  interface CartItem {
    productId: string;
    quantity: number;
    variant: Variant;
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

  interface UserDetails {
    name: string;
    address: string;
    landmark: string;
    city: string;
    pincode: string;
    state: string;
    phone: string;
  }

  // State Management
  const [selectedUPI, setSelectedUPI] = useState<string>("");
  const [upiId, setUpiId] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("upi");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<CartItemWithDetails[]>([]);
  const [userDetails, setUserDetails] = useState<UserDetails>({
    name: "",
    address: "",
    landmark: "",
    city: "",
    pincode: "",
    state: "",
    phone: "",
  });

  // Fetch Product Details
  const fetchProductDetails = async (
    productId: string
  ): Promise<Product | null> => {
    try {
      const response = await fetch(`/api/products?id=${productId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch product");
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching product ${productId}:`, error);
      return null;
    }
  };

  // Calculate Subtotal
  const calculateSubtotal = (): number => {
    return cartItems.reduce((sum, item) => {
      return sum + (item.product?.newPrice || 0) * item.quantity;
    }, 0);
  };

  const generateOrderId = (): string => {
    return Math.floor(Math.random() * 9000000000 + 1000000000).toString();
  };

  // Form Validation
  const isFormValid = (): boolean => {
    return (
      cartItems.length > 0 &&
      userDetails.address.trim() !== "" &&
      userDetails.phone.trim() !== ""
    );
  };

  // Payment Method Handler
  const handlePaymentMethodChange = (method: string): void => {
    setPaymentMethod(method);
  };

  useEffect(() => {
    const fetchUpiId = async () => {
      try {
        const response = await fetch("/upi.txt");
        const upiId = await response.text();
        setUpiId(upiId.trim());
      } catch (error) {
        console.error("Error fetching UPI ID:", error);
        setError("Failed to load UPI details");
      }
    };
    fetchUpiId();
  }, []);


  // Handle Payment
  const handlePayment = async (): Promise<void> => {

    const amount = calculateSubtotal();
    const orderId = generateOrderId();
    const encodedName = encodeURIComponent("Online Store");
    const encodedOrderId = encodeURIComponent(`Order_Id_${orderId}`);

    let intentUrl = "";
    switch (selectedUPI) {
      case "gpay":
        intentUrl = `tez://upi/pay?pa=${upiId}&pn=${encodedName}&tn=${encodedOrderId}&am=${amount}`;
        break;
      case "phonepe":
        intentUrl = `phonepe://pay?pa=${upiId}&pn=${encodedName}&tn=${encodedOrderId}&am=${amount}&tr=H2MkMGf5olejI&mc=8931&cu=INR`;
        break;
      case "paytm":
        intentUrl = `paytmmp://cash_wallet?pa=${upiId}&pn=${encodedName}&am=${amount}&cu=INR&tn=${orderId}&featuretype=money_transfer`;
        break;
      default:
        intentUrl = `upi://pay?pa=${upiId}&pn=${encodedName}&tn=${encodedOrderId}&am=${amount}`;
    }

    window.location.href = intentUrl;

    try {
      // Reset previous errors
      setError(null);

      // Validate form
      if (!isFormValid()) {
        setError("Please complete all required fields");
        return;
      }

      // Set loading state
      setIsLoading(true);

      // Calculate total amount
      const totalAmount = calculateSubtotal();

      // Process order
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: cartItems,
          address: userDetails,
          amount: totalAmount,
          paymentMethod,
          created_at: new Date(),
          shortcode: Math.random().toString(36).substring(7),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to process order");
      }

      // Clear cart after successful order
      localStorage.removeItem("cartItems");

      // Optionally redirect or show success message
      // window.location.href = "/order-confirmation";
    } catch (error) {
      console.error("Payment error:", error);
      setError(
        error instanceof Error ? error.message : "Payment processing failed"
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Initialize Data on Component Mount
  useEffect(() => {
    const initializeData = async () => {
      try {
        // Reset states
        setError(null);
        setIsLoading(true);

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
          return;
        }

        const parsedCartItems: CartItemWithDetails[] =
          JSON.parse(storedCartItems);

        // Fetch product details for each cart item
        const itemsWithDetails = await Promise.all(
          parsedCartItems.map(async (item) => {
            const productDetails = await fetchProductDetails(item.productId);
            return {
              ...item,
              product: productDetails || undefined,
            };
          })
        );

        setCartItems(itemsWithDetails);
      } catch (error) {
        console.error("Error initializing data:", error);
        setError(
          error instanceof Error ? error.message : "Initialization failed"
        );
      } finally {
        setIsLoading(false);
      }
    };

    initializeData();
  }, []);

  // Render Loading State
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <img src="/loading.gif" height={80} width={80} />
      </div>
    );
  }

  // Render Error State
  if (error) {
    return (
      <div className="text-red-500 p-4">
        <p>{error}</p>
        <button
          onClick={() => setError(null)}
          className="mt-2 px-4 py-2 bg-red-100 rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  // Main Render
  return (
    <div className="">
      {/* <Header /> */}

      <div className="bg-black py-3 px-5 text-white">Payment Methods</div>

      <div className="bg-white px-3 py-5 flex items-center">
        <Image src={"/mi-logo.svg"} alt="logo" width={45} height={45} />
        <div className="pl-3">
          <div>
            Reference:{" "}
            <span className="font-light pr-auto">5241421062900002301</span>
          </div>
          <div>
            {" "}
            Amount:{" "}
            <span className="font-light">
              &nbsp;&nbsp;&nbsp;&nbsp;₹{calculateSubtotal().toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Card Section */}
      <div className="mx-5 my-2.5 text-xl">Cards</div>

      <div className="py-2.5 px-5 mx-2 rounded-lg flex items-center bg-white border border-[#DFDEDE]">
        <div className="p-2.5 rounded-md border border-[#DFDEDE]">
          <Image
            src={"/card-pp.svg"}
            width={20}
            height={20}
            alt="card"
            className=""
          />
        </div>
        <div className="font-light pl-3">Pay by Debit/Credit cards</div>
        <div className="ml-auto">
          <input type="radio" name="payment" id="" />
        </div>
      </div>
      {/* Card Section End */}

      {/* Netbanking Section */}
      <div className="mx-5 my-2.5 text-xl">Netbanking</div>

      <div className="py-2.5 px-5 mx-2 rounded-lg flex items-center bg-white border border-[#DFDEDE]">
        <div className="p-2.5 rounded-md border border-[#DFDEDE]">
          <Image
            src={"/bank-pp.svg"}
            width={20}
            height={20}
            alt="card"
            className=""
          />
        </div>
        <div className="font-light pl-3">Pay with Netbanking</div>
        <div className="ml-auto">
          <input type="radio" name="payment" id="" />
        </div>
      </div>
      {/* Netbanking Section End */}

      {/* UPI Section */}
      <div className="mx-5 my-2.5 text-xl">UPI Apps</div>

      <div className="py-2.5 px-5 mx-2 rounded-t-lg flex items-center bg-white border-t border-x border-[#DFDEDE]">
        <div className="p-2.5 rounded-md border border-[#DFDEDE]">
          <Image
            src={"/upi-pp.svg"}
            width={20}
            height={20}
            alt="upi"
            className=""
          />
        </div>
        <div className="font-light pl-3 ">
          Pay by Any UPI app{" "}
          <div className="font-light text-xs text-[#999898]">
            Use any UPI app on your phone to pay
          </div>
        </div>
        <div className="ml-auto">
          <input 
            type="radio" 
            name="payment" 
            checked={selectedUPI === "other"}
            onChange={() => setSelectedUPI("other")}
          />
        </div>
      </div>
      <div className="bg-white mx-2 border-[#DFDEDE] border rounded-b-lg pb-4">
        <div className="min-h-1 my-1 px-0.5"></div>

        <div className="flex items-center mx-7 space-x-11 ">
        <div 
            className="text-center cursor-pointer"
            onClick={() => setSelectedUPI("gpay")}
          >
            <div className={`p-1 rounded-lg ${selectedUPI === "gpay" ? "border-2 border-orange-400" : ""}`}>
              <Image src={"/gpay.svg"} width={50} alt="gpay" height={50} />
            </div>
            <div className="font-light text-sm pt-2">GPay</div>
          </div>

          <div 
            className="text-center cursor-pointer"
            onClick={() => setSelectedUPI("phonepe")}
          >
            <div className={`p-1 rounded-lg ${selectedUPI === "phonepe" ? "border-2 border-orange-400" : ""}`}>
              <Image
                src={"/phonepe.svg"}
                width={50}
                height={50}
                alt="phonepe"
                className="border-[#DFDEDE] border rounded-lg object-contain h-[50px] w-[50px]"
              />
            </div>
            <div className="font-light text-sm pt-2">PhonePe</div>
          </div>

          <div 
            className="text-center cursor-pointer"
            onClick={() => setSelectedUPI("paytm")}
          >
            <div className={`p-1 rounded-lg ${selectedUPI === "paytm" ? "border-2 border-orange-400" : ""}`}>
              <Image
                src={"/paytm.svg"}
                width={50}
                alt="pp"
                height={50}
                className="border-[#DFDEDE] border rounded-lg"
              />
            </div>
            <div className="font-light text-sm pt-2">Paytm</div>
          </div>
        </div>
      </div>
      {/* Netbanking Section End */}
      {/* Payment Button */}
      <div className="fixed bottom-0 left-0 right-0 px-3 bg-white shadow-lg flex items-center py-2 z-50">
        <div className="text-base">
          Total:{" "}
          <span className="font-semibold text-lg text-orange-500">
            ₹{calculateSubtotal().toLocaleString()}
          </span>
        </div>
        <div
          className="ml-auto m-1"
        >
         <button 
            className="px-4 py-2 rounded-lg bg-black text-white text-sm"
            onClick={handlePayment}
            disabled={!selectedUPI}
          >
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentProcess;
