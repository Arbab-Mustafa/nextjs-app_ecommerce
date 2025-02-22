"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

interface Product {
  id: number;
  name: string;
  oldPrice: number;
  newPrice: number;
  category: string;
  variant: string;
}

const fetchProductDetails = async (
  productId: number
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

interface VariantSelectorProps {
  productID: number;
  colorName: string[];
  hexCodes: string[];
  storageOptions: string[];
  selectedVariant: {
    storage: string;
    color: string;
  };
  onVariantChange: (storage: string, color: string) => void;
}

// to be fetched from API
const newPrice = 1999;
const oldPrice = 34999;
const productName = "Xiaomi 14 CIVI Limited Edition";

export default function VariantSelector({
  productID,
  colorName,
  hexCodes,
  storageOptions,
  selectedVariant,
  onVariantChange,
}: VariantSelectorProps) {
  const [product, setProduct] = useState<Product>();
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedStorageOption, setSelectedStorageOption] = useState(
    storageOptions[0] || "12 GB + 512 GB"
  );
  const [selectedColourOption, setSelectedColourOption] = useState(
    colorName[0] || "Hot Pink"
  );
  const [pincode, setPincode] = useState("");
  const [pincodePopup, setPincodePopup] = useState(false);
  const [pincodeInput, setPincodeInput] = useState("");

  const handleStorageChange = (storage: string) => {
    onVariantChange(storage, selectedVariant.color);
  };

  const handleColorChange = (color: string) => {
    onVariantChange(selectedVariant.storage, color);
  };

  const handlePincodeCheck = () => {
    if (checkPincode(pincodeInput)) {
      setPincode(pincodeInput);
      setPincodePopup(true);
    } else {
      console.log("Please enter a valid 6-digit pincode");
    }
  };

  const handlePincodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 6) {
      setPincodeInput(value);
    }
  };

  useEffect(() => {
    // Fetch product details when component mounts or productID changes
    const loadProductDetails = async () => {
      const productDetails = await fetchProductDetails(productID);
      if (productDetails) {
        setProduct(productDetails);
        setSelectedStorageOption(productDetails.variant || "");
        setSelectedColourOption(colorName[0]);
      }
    };

    loadProductDetails();
  }, [productID, colorName]);

  return (
    <div
      className="relative"
      onClick={() => setPopupOpen(true)} // Handles clicks anywhere in the parent
    >
      {/* Clickable overlay */}
      <div className="absolute inset-0 z-10" />
      <div>
        <div className="flex justify-between items-center px-4 py-2 space-x-2 text-[13px]">
          {storageOptions.map((storageOption, index) => (
            <button
              key={index}
              className={`rounded-lg p-2 ${
                selectedStorageOption === storageOption ? "" : ""
              }`}
              onClick={(e) => {
                e.stopPropagation(); // Prevent popup from opening when storage option is clicked
                setSelectedStorageOption(storageOption);
              }}
            >
              {storageOption}
            </button>
          ))}
          <button className="mt-auto text-xl">
            <MdOutlineKeyboardArrowRight className="text-gray-600" />
          </button>
        </div>

        <div className="flex pl-6">
          {colorName.slice(0, 3).map((color, index) => (
            <div
              key={index}
              className="flex mr-4 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation(); // Prevent popup from opening when color is clicked
                setSelectedColourOption(color);
              }}
            >
              <div
                className={`w-4 h-4 rounded-md border ${
                  selectedColourOption === color
                    ? "border-[#F9981B]"
                    : "border-gray-300"
                }`}
                style={{ backgroundColor: hexCodes[index] }}
              ></div>
              <div className="text-sm ml-2.5">{color}</div>
            </div>
          ))}
        </div>

        {popupOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40"
            onClick={() => setPopupOpen(false)}
          >
            <div
              className="bg-white px-4 rounded-lg shadow-lg w-full max-w-md relative mt-auto pb-20"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside popup
            >
              <button
                onClick={() => setPopupOpen(false)}
                className="absolute right-2 top-2 text-white bg-black rounded-lg w-6 h-6 flex items-center justify-center text-sm leading-none"
              >
                <Image
                  src={"/close-btn.svg"}
                  width={20}
                  height={20}
                  alt="Close"
                />
              </button>
              <div className="flex flex-row mt-4">
                <div className="ml-2 mr-4">
                  <img
                    src={`/thumb/${productID}.webp`}
                    alt={product?.name}
                    className="h-28 w-28 object-contain"
                  />
                </div>
                <div className="pt-2">
                  <div className="flex items-center">
                    <div className="text-[27px] font-semibold">
                      <span className="font-[Arial]">₹</span>
                      {product?.newPrice?.toLocaleString()}
                    </div>
                    <div className="ml-2">
                      <span className="text-lg text-gray-400 line-through">
                        <span className="font-[Arial]">₹</span>
                        {product?.oldPrice?.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div className="font-light text-[#999898] mt-1 mr-6">
                    {product?.name} {selectedStorageOption}{" "}
                    {selectedColourOption}
                  </div>
                </div>
              </div>

              <hr className="my-3" />

              <div className="text-[22px] font-light mt-4">Storage</div>
              <div className="flex flex-wrap gap-2 mt-2">
                {storageOptions.map((storageOption, index) => (
                  <button
                    key={index}
                    className={`text-sm rounded-lg px-2.5 py-1.5 border font-light ${
                      storageOption === selectedStorageOption
                        ? "border-[#F9981B]"
                        : "border-gray-500"
                    }`}
                    onClick={() => {
                      setSelectedStorageOption(storageOption);
                      localStorage.setItem(
                        "selectedStorageOption",
                        storageOption
                      );
                    }}
                  >
                    {storageOption}
                  </button>
                ))}
              </div>

              <div className="text-[22px] font-light mt-4">Colour</div>
              <div className="grid grid-cols-3 gap-4 mt-2 justify-between">
                {colorName.map((color, index) => (
                  <button
                    key={index}
                    className={`flex items-center justify-center w-28 h-14 border px-4 py-2.5 font-light ${
                      color === selectedColourOption
                        ? "border-[#F9981B]"
                        : "border-gray-500"
                    } rounded-lg`}
                    onClick={() => {
                      setSelectedColourOption(color);
                      localStorage.setItem("selectedColourOption", color);
                    }}
                  >
                    <div
                      className="min-w-4 min-h-4 rounded-sm border border-gray-300"
                      style={{ backgroundColor: hexCodes[index] }}
                    ></div>
                    <div className="text-sm font-light text-left ml-2">
                      {color}
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex mt-9">
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={6}
                  value={pincodeInput}
                  onChange={handlePincodeChange}
                  placeholder="Enter your pincode to check"
                  className="border rounded-l-md p-2 w-full border-gray-500 focus:outline-none"
                />
                <button
                  className="bg-black text-white rounded-r-md p-2 px-3"
                  onClick={handlePincodeCheck}
                >
                  CHECK
                </button>
              </div>

              {pincodePopup && pincode && (
                <div className="w-full mt-2 p-4 border border-[#F9981B] rounded-md">
                  <div className="flex flex-row items-center">
                    <div className="text-sm font-bold">
                      Delivery options for {pincode}
                    </div>
                    <button
                      className="ml-auto text-xs text-gray-400"
                      onClick={() => {
                        setPincodePopup(false);
                        setPincodeInput("");
                        setPincode("");
                      }}
                    >
                      Change Pincode
                    </button>
                  </div>
                  <hr className="my-2 border-t border-gray-400" />

                  <div className="flex">
                    <div className="text-xs text-gray-400">
                      Estimated delivery{" "}
                      {new Date(
                        Date.now() + 5 * 24 * 60 * 60 * 1000
                      ).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </div>

                    <div className="ml-auto text-sm text-orange-400">Free</div>
                  </div>
                </div>
              )}

              <div className="text-sm font-light mt-10 text-[#B4B0B0]">
                Sold by: Xiaomi Technology India Private Limited
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  function checkPincode(pincode: string) {
    if (!pincode || pincode.length !== 6 || !/^\d+$/.test(pincode)) {
      return false;
    }
    return true;
  }
}
