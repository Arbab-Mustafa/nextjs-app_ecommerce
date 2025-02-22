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
  "/products/home/xiaomi-360-home-security-camera-2k/productImages/1.jpeg",
  "/products/home/xiaomi-360-home-security-camera-2k/productImages/2.jpeg",
  "/products/home/xiaomi-360-home-security-camera-2k/productImages/3.jpeg",
  "/products/home/xiaomi-360-home-security-camera-2k/productImages/4.jpeg",
];

var pageImages = [
  "/products/home/xiaomi-360-home-security-camera-2k/pageImages/1.jpeg",
  "/products/home/xiaomi-360-home-security-camera-2k/pageImages/2.jpeg",
  "/products/home/xiaomi-360-home-security-camera-2k/pageImages/3.jpeg",
  "/products/home/xiaomi-360-home-security-camera-2k/pageImages/4.jpeg",
  "/products/home/xiaomi-360-home-security-camera-2k/pageImages/5.jpeg",
];

interface SelectedVariant {
  storage: string;
  color: string;
}

const colorNames = ["", "Black", "Jade Green"];
const hexCodes = ["#FFFFFF", "#000000", "#82988a"];
const storageOptions = ['', '50"', '55"'];

const productId = 20;

const Xiaomi360SecurityCamera = () => {
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
            Full Home Protection This smart security camera comes with a
            dual-motor head that enables it to rotate and capture a full 360
            degrees horizontal view and a 96 degrees vertical view.... Read
            MoreHD Picture Quality Thanks to this security camera's 20
            megapixels, HD (1080p) resolution, and wide dynamic range, even
            distant backgrounds come out clear and detailed in the recorded
            footage.Stunning Colour Even in Low Light With the all-new low-light
            true colour technology, this security camera lets you see a
            full-colour palette even during the darker hours of the day -
            without the... Clearer Night Vision This security camera
            offers f2.1 aperture that allows more light intake. And, the
            infrared illuminator helps increase visibility. This ensures that
            you get a go... Advanced Video Encoding Technology This new
            video encoding technology facilitates smoother streaming and reduces
            bandwidth without compromising on detail. This way, you get the same
            pixel count a... AI Motion Detection Alert With the
            integration of the deep learning technology and focused optimisation
            of the algorithms and network software, this security camera can
            accurately determ... Talkback Feature (2-way Audio) Thanks
            to this feature, you can easily talk to your family using this
            device.Conveniently Store Videos This security camera supports
            Network Attached Storage (NAS), which means that you can store files
            that are backed up from SD cards to NAS storage devices.View
            Recorded Videos On Smartphone/Tablet with Playback You can check on
            your family back home from anywhere and also fast forward through
            the recorded video at 2x/4x/16x speed. You can also store videos
            using microS... Install Upright or Inverted As this
            security camera is pre-installed with a rotation base, it can be
            placed on a table, window, ceiling, or wall. And, with a minor
            camera setting change, i... 
          </div>
        </div>
        {/* {pageImages.map((image, index) => (
          <img src={image} alt="" className="w-full" key={index} />
        ))} */}
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
      <img src="/loading.gif" height={80} width={80} />
    </div>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <div className="bg-white">
      <ProductPageHeader product="Xiaomi Home Security Camera 2K" />
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

export default Xiaomi360SecurityCamera;
