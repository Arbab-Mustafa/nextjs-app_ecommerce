"use client";
import InHouseServices from "@/components/ProductPage/InHouseServices";
import ProductPageCarousel from "@/components/ProductPage/ProductPageCarousel";
import ProductPageHeader from "@/components/ProductPage/ProductPageHeader";
import ReviewSection from "@/components/ProductPage/ReviewSection";
import { useEffect, useState } from "react";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { IoBagHandleOutline } from "react-icons/io5";
import { RWebShare } from "react-web-share";
import Image from "next/image";
import AddToCart from "@/components/ProductPage/AddToCart";
import RelatedProducts from "@/components/ProductPage/RelatedProducts";
import Countdown from "@/components/ProductPage/Countdown";

var productImages = [
  "/products/home/smart-led-bulb/productImages/1.jpeg"
  // "/products/home/smart-led-bulb/productImages/2.jpeg",
  // "/products/home/smart-led-bulb/productImages/3.jpeg",
  // "/products/home/smart-led-bulb/productImages/4.jpeg",
  // "/products/home/smart-led-bulb/productImages/5.jpeg",
  // "/products/home/smart-led-bulb/productImages/6.jpeg",
];

var pageImages = [
  "/products/home/smart-led-bulb/pageImages/1.jpeg",
  "/products/home/smart-led-bulb/pageImages/2.jpeg",
  "/products/home/smart-led-bulb/pageImages/3.jpeg",
  "/products/home/smart-led-bulb/pageImages/4.jpeg",
  "/products/home/smart-led-bulb/pageImages/5.jpeg",
];

interface SelectedVariant {
  storage: string;
  color: string;
}

const colorNames = ["", "Black", "Jade Green"];
const hexCodes = ["#FFFFFF", "#000000", "#82988a"];
const storageOptions = ['', '50"', '55"'];

const productId = 22;

const SmartLEDBulb = () => {
  type Tab = "Overview" | "Specifications" | "MIUI 14";
  const [selectedTab, setSelectedTab] = useState<Tab>("Overview");
  const [productDetails, setProductDetails] = useState<any>(null);
  const [selectedVariant, setSelectedVariant] = useState<SelectedVariant>({
    storage: storageOptions[0],
    color: colorNames[0],
  });

  const [isLoading, setIsLoading] = useState(true);
  // Error state to handle fetch failures
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/products?id=${productId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product data");
        }
        const data = await response.json();
        setProductDetails(data);
        setError(null);
      } catch (error) {
        setError(error instanceof Error ? error.message : "An error occurred");
        console.error("Failed to fetch product details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, []);

  const handleVariantChange = (storage: string, color: string) => {
    setSelectedVariant({
      storage,
      color,
    });
  };

  const currentPrice = productDetails?.newPrice ?? 0;
  const previousPrice = productDetails?.oldPrice ?? 0;
  const productName = productDetails?.name;

  const tabData: Record<Tab, JSX.Element> = {
    Overview: (
      <div className="my-2">
        <div className="mx-4">
          <div className="text-lg font-semibold mt-4">Overview</div>
          <div className="text-sm font-light mt-2">
            Flawless 4K Display Xiaomi's X series 4K resolution transforms your
            vision with HDR 10 and Dolby Vision display, delivering crystal
            clear quality with detailed visuals. Now everyth... Read MorePremium
            Metal Bezel-less Design This TV offers the premium metal Bezel less
            design with an impressive 97% screen to body ratio. This near edge
            to edge display not only elevate your experience ... Read
            MoreCinematic Audio Experience Dolby Audio Bring Cinema at your home
            with our powerful 30W speakers supported by Dolby Audio and DTS X
            technologies and experience the thrill of cinema without leaving
            you... Read MoreReality Flow - MEMC Experience each and every frame
            clear and smoother with MEMC engine in reality flow. Say goodbye to
            blurry visuals and enjoy every action-packed moment with min... Read
            MorePicture Perfect Colours Immerse yourself in stunning visuals
            with our wide color gamuts. Up to 94% DCI-P3 color accuracy and 1.07
            billion colors bring your content to lifeTop Notch Performance
            Xiaomi X Series offers exceptional performance with the powerful
            Quad Core Processor and Mali G52 MC1 GPU , allowing multitasking and
            running apps with ease.
          </div>
        </div>
        {pageImages.map((image, index) => (
          <img src={image} alt="" className="w-full" key={index} />
        ))}
      </div>
    ),
    Specifications: (
      <div className="mx-4">
        <div className="text-lg font-semibold mt-4">Specifications</div>
        <div className="text-sm font-light mt-2">
          <div className="text-lg font-semibold mt-4">Display</div>
          <div className="text-sm font-light mt-2">
            LED 102 cm (40 inch)
            <br />
            Refresh Rate: 60 Hz
          </div>

          <div className="text-lg font-semibold mt-4">Audio</div>
          <div className="text-sm font-light mt-2">
            Number of Speakers: 2
            <br />
            Speaker Output RMS: 30 W
          </div>

          <div className="text-lg font-semibold mt-4">Smart TV</div>
          <div className="text-sm font-light mt-2">
            Operating System: Google TV
            <br />
            RAM Capacity: 2 GB
            <br />
            Storage Memory: 8 GB
          </div>

          <div className="text-lg font-semibold mt-4">Connectivity</div>
          <div className="text-sm font-light mt-2">
            HDMI Ports: 3
            <br />
            USB Ports: 2
            <br />
            Built-in WiFi
            <br />
            With Bluetooth Feature
          </div>

          <div className="text-lg font-semibold mt-4">Convenience</div>
          <div className="text-sm font-light mt-2">
            Voice Search with Remote
          </div>
        </div>
      </div>
    ),
    "MIUI 14": (
      <div className="mx-4">
        <div className="text-lg font-semibold mt-4">MIUI 14</div>
        <div className="text-sm font-light mt-2">
          MIUI 14 is the latest version of Xiaomi's custom Android skin. It is
          based on Android 12 and comes with a number of new features and
          improvements. Some of the key features of MIUI 14 include a new
          design, improved performance, better privacy controls, and enhanced
          security. MIUI 14 also comes with a number of new customization
          options, including new themes, wallpapers, and icon packs. MIUI 14 is
          designed to offer a smooth and intuitive user experience and is
          optimized for the Xiaomi 14 Limited Edition.
        </div>
      </div>
    ),
  };

  return isLoading ? (
        <div className="flex justify-center items-center min-h-screen">
      <img src="/loading.gif" height={80} width={80}/>
    </div>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <div className="bg-white">
      <ProductPageHeader product="Smart LED Bulb" />
      <div className="min-h-2"></div>
      <div className="">
        <ProductPageCarousel images={productImages} />
      </div>
      <div className="min-h-4"></div>
      <Countdown />
      {/* Product Price */}
      <div className="mt-4 mx-4 flex items-center">
        <div className="text-2xl">
          From <span className="font-semibold font-[Arial]">₹</span>
          <span className="font-semibold">{currentPrice.toLocaleString()}</span>
        </div>
        <div className="text-gray-400 ml-2 text-base line-through">
          <span className="font-[Arial] text-sm">₹</span>
          {previousPrice.toLocaleString()}
        </div>
        <div className="ml-auto text-xl">
          <RWebShare
            data={{
              text: "Mi Diwali Sale - Upto 90% Off",
              url: process.env.DOMAIN_NAME,
              title: "Mi",
            }}
            onClick={() => console.log("shared successfully!")}
          >
            <Image src={"/share-icon.svg"} width={30} height={30} alt="share" />
          </RWebShare>
        </div>
      </div>

      {/* Product Name */}

      <div className="mt-2 font-medium text-xl mx-4">{productName} {selectedVariant.color} {selectedVariant.storage}</div>

      <div className="min-h-4"></div>

      {/* Variant Selector */}

      {/* <div className="min-h-2 bg-gray-100"></div>
      <VariantSelector
        colorName={colorNames}
        hexCodes={hexCodes}
        storageOptions={storageOptions}
        onVariantChange={handleVariantChange}
        selectedVariant={selectedVariant}
        productID={productId}
      />
      <div className="min-h-2"></div> */}
      <div className="min-h-2 bg-gray-100"></div>
      <div className="min-h-2"></div>

      {/* InHouseServices */}
      <div className="mx-5">
        <InHouseServices />
      </div>

      <div className="min-h-2 bg-gray-100"></div>
      <div className="min-h-2"></div>

      <ReviewSection />

      <div className="min-h-2 bg-gray-100"></div>
      <div className="min-h-2"></div>

      {/* Recommended Products Section */}

      <RelatedProducts productId={productId} />

      <div className="min-h-2 bg-gray-100"></div>
      <div className="min-h-2"></div>

      <div className="min-h-2 bg-gray-100"></div>
      <div className="min-h-2"></div>

      <div className="flex flex-row items-center space-x-4 justify-between mx-4 py-2">
        <div
          className={`${
            selectedTab == "Overview" ? "font-semibold" : "text-gray-400"
          }`}
          onClick={() => setSelectedTab("Overview")}
        >
          Overview
        </div>
        <div
          className={`${
            selectedTab == "Specifications" ? "font-semibold" : "text-gray-400"
          }`}
          onClick={() => setSelectedTab("Specifications")}
        >
          Specifications
        </div>
        <div
          className={`${
            selectedTab == "MIUI 14" ? "font-semibold" : "text-gray-400"
          }`}
          onClick={() => setSelectedTab("MIUI 14")}
        >
          MIUI 14
        </div>
      </div>

      <div>{tabData[selectedTab]}</div>

      {/* make a sticky div with buy now button */}
      <div className="fixed bottom-0 w-full bg-white border-t border-gray-200 z-50">
        <div className="flex justify-center py-2 mx-4 items-center">
          <TfiHeadphoneAlt className="text-2xl ml-4 font-light" />
          <IoBagHandleOutline className="text-3xl ml-4" />
          <button
            className="bg-black text-white px-24 py-2 rounded-md ml-auto"
            onClick={() => AddToCart(productId, 1, selectedVariant)}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default SmartLEDBulb;
