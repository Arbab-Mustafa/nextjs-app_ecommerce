"use client";
import InHouseServices from "@/components/ProductPage/InHouseServices";
import ProductPageCarousel from "@/components/ProductPage/ProductPageCarousel";
import ProductPageHeader from "@/components/ProductPage/ProductPageHeader";
import ReviewSection from "@/components/ProductPage/ReviewSection";
import VariantSelector from "@/components/ProductPage/VariantSelector";
import { useEffect, useState } from "react";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { IoBagHandleOutline } from "react-icons/io5";
import { RWebShare } from "react-web-share";
import Image from "next/image";
import AddToCart from "@/components/ProductPage/AddToCart";
import RelatedProducts from "@/components/ProductPage/RelatedProducts";
import Countdown from "@/components/ProductPage/Countdown";

var productImages = [
  "/products/smartphone/redmi-12-5g/productImages/1.jpeg",
  "/products/smartphone/redmi-12-5g/productImages/2.jpeg",
  "/products/smartphone/redmi-12-5g/productImages/3.jpeg",
  "/products/smartphone/redmi-12-5g/productImages/4.jpeg",
  "/products/smartphone/redmi-12-5g/productImages/5.jpeg",
  "/products/smartphone/redmi-12-5g/productImages/6.jpeg",
];

var pageImages = [
  "/products/smartphone/redmi-12-5g/pageImages/1.jpeg",
  "/products/smartphone/redmi-12-5g/pageImages/2.jpeg",
  "/products/smartphone/redmi-12-5g/pageImages/3.jpeg",
  "/products/smartphone/redmi-12-5g/pageImages/4.jpeg",
  "/products/smartphone/redmi-12-5g/pageImages/5.jpeg",
];

interface SelectedVariant {
  storage: string;
  color: string;
}

const colorNames = ["Moonstone Silver", "Jade Black", "Pastel Blue"];
const hexCodes = ["#ddd5da", "#0d0d11", "#aecded"];
const storageOptions = ["8 GB + 256 GB", "6 GB + 128 GB", "4 GB + 128 GB"];

const productId = 11;

const Redmi125GPage = () => {
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
            Great performance and multimedia experience at the best value is
            what makes a Note. With Xiaomi 14 enjoy a captivating
            multimedia experience with its 16.94cm(6.67) AMOLED display with the
            thinnest bezels ever on a Redmi Note and support for 1 billion
            colours.It’s not just movies and TV shows that look great, games run
            smoother thanks to the 120Hz refresh rate making sure that you ace
            every level. With its 108MP Triple Camera, create unforgettable
            memories with you and yours. Widen your horizons with the 8MP
            Ultrawide camera and capture the unseen with the 2MP macro camera.
            With the 16MP front camera, every selfie is Instagram-ready. Make
            those throwback Thursdays #tbt aesthetic by using new film filters
            on the front and rear cameras that will enhance your feed
            multi-fold.That’s not all, taking a photo is as easy as saying
            “cheese”. With voice shutter on Xiaomi 14 , all you need to do
            is say “cheese” to take a pictureSupporting this setup is the latest
            and powerful 5G Dimensity 6080 clocked at 2.4GHz coupled with up to
            12GB RAM and 256GB UFS 2.2 storage ensuring that you can multitask,
            game, consume media without lag. With support for multiple 5G bands,
            your internet speeds will be blazing fast. Built on the 6nm process
            technology it ensures effective power management allowing for longer
            battery life. Based on Android 13 and MIUI 14, Xiaomi 14 
            ensures an intuitive UI experience optimised for your daily
            needs.With IP54 rating your Xiaomi 14  will always be
            protected against dust and splashes of water. Not just that, Gorilla
            Glass 5 on the display makes it highly resistant to scratches.
            Powering Xiaomi 14  is an all-day 5000mAh battery with support
            for 33W fast charging and the 33W charger in the box.
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
          <div className="text-lg font-semibold mt-4">Processor</div>
          <div className="text-sm font-light mt-2">
            Snapdragon® 8s Gen 3 Mobile Platform
            <br />
            4nm power-efficient manufacturing process
            <br />
            CPU: 1x Prime core (Cortex X4), Up to 3.0GHz
            <br />
            4x Performance cores (Cortex A720), Up to 2.8GHz
            <br />
            3x Efficiency cores (Cortex A520), Up to 2.0GHz
            <br />
            GPU: Qualcomm® Adreno™ GPU
          </div>

          <div className="text-lg font-semibold mt-4">Storage & RAM</div>
          <div className="text-sm font-light mt-2">
            12GB + 512GB
            <br />
            LPDDR5X 8533Mbps RAM + UFS 4.0 storage
          </div>

          <div className="text-lg font-semibold mt-4">Dimensions</div>
          <div className="text-sm font-light mt-2">
            Height: 157.20mm
            <br />
            Width: 72.77mm
            <br />
            Thickness: 7.75mm
            <br />
            Weight: 180.9g
            <br />
            *Data tested in Xiaomi Internal Labs, actual results may vary.
          </div>

          <div className="text-lg font-semibold mt-4">Display</div>
          <div className="text-sm font-light mt-2">
            1.5K 6.55 Quad Curved AMOLED display
            <br />
            Refresh rate: 120Hz
            <br />
            Touch sampling rate: up to 240Hz
            <br />
            Brightness: 3000 nits peak brightness
            <br />
            Dolby Vision®
            <br />
            HDR10+
            <br />
            68 billion colors
            <br />
            Color gamut: DCI-P3
            <br />
            Adaptive colors
            <br />
            Original color PRO
            <br />
            Reading mode
            <br />
            TÜV Rheinland Low Blue Light (Hardware Solution) Certified
            <br />
            TÜV Rheinland Flicker Free Certified
            <br />
            TÜV Rheinland Circadian Friendly Certified
            <br />
            Corning Gorilla Glass Victus 2 Protection
            <br />
            Quad curve display
          </div>

          <div className="text-lg font-semibold mt-4">Rear Camera</div>
          <div className="text-sm font-light mt-2">
            Leica professional optical lens
            <br />
            LEICA VARIO-SUMMILUX 1:1.63/15-50 ASPH.
            <br />
            Leica main camera Light Hunter 800 image sensor
            <br />
            50MP, f/1.63 large aperture, 2.0μm 4-in-1 Super Pixel
            <br />
            25mm equivalent focal length, Optical Image Stabilisation (OIS)
            <br />
            Leica 50mm telephoto camera, 50MP, f/1.98, 50mm Classic portrait
            focal length, 2x zoom
            <br />
            Leica ultra-wide camera, 12MP, 120° wide FOV, 15mm equivalent focal
            length, f/2.2
          </div>

          <div className="text-lg font-semibold mt-4">Front Camera</div>
          <div className="text-sm font-light mt-2">
            32MP Primary selfie camera, f/2.0, Autofocus, 26mm equivalent focal
            length, 1.6μm pixel size, 78° FOV
            <br />
            32MP Ultrawide selfie camera, f/2.4, 18mm equivalent focal length,
            100° FOV
          </div>

          <div className="text-lg font-semibold mt-4">Battery & Charging</div>
          <div className="text-sm font-light mt-2">
            4700mAh (typ) battery
            <br />
            67W Fast charging support
          </div>

          <div className="text-lg font-semibold mt-4">Cooling System</div>
          <div className="text-sm font-light mt-2">Xiaomi IceLoop system</div>

          <div className="text-lg font-semibold mt-4">Security</div>
          <div className="text-sm font-light mt-2">
            In-screen fingerprint sensor
            <br />
            AI face unlock
          </div>

          <div className="text-lg font-semibold mt-4">
            Network & Connectivity
          </div>
          <div className="text-sm font-light mt-2">
            Dual SIM (nano SIM + nano SIM)
            <br />
            GSM:3/5/8
            <br />
            WCDMA:B1/5/8
            <br />
            LTE FDD:1/3/5/8/28
            <br />
            LTE TDD: 40/41
            <br />
            SA:n1/3/5/8/28/40/41/78
            <br />
            NSA:n1/3/5/8/28/40/41/78
            <br />
            Bluetooth: 5.4
            <br />
            Wi-Fi 6<br />
            NFC support
          </div>

          <div className="text-lg font-semibold mt-4">
            Navigation & Positioning
          </div>
          <div className="text-sm font-light mt-2">
            GPS, Galileo, GLONASS, Beidou, NAVIC
          </div>

          <div className="text-lg font-semibold mt-4">Audio</div>
          <div className="text-sm font-light mt-2">
            Stereo speakers
            <br />
            Dolby Atmos®
          </div>

          <div className="text-lg font-semibold mt-4">Sensors</div>
          <div className="text-sm font-light mt-2">
            Proximity sensor | Ambient light sensor | Accelerometer | Gyroscope
            | Electronic compass | IR blaster
          </div>

          <div className="text-lg font-semibold mt-4">Operating System</div>
          <div className="text-sm font-light mt-2">
            Xiaomi HyperOS, based on Android 14
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
          optimized for the Xiaomi 14  Limited Edition.
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
      <ProductPageHeader product="Redmi 12 5G" />
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

      <div className="min-h-2 bg-gray-100"></div>
      <VariantSelector
        colorName={colorNames}
        hexCodes={hexCodes}
        storageOptions={storageOptions}
        onVariantChange={handleVariantChange}
        selectedVariant={selectedVariant}
        productID={productId}
      />
      <div className="min-h-2"></div>
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

export default Redmi125GPage;
