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
import VariantSelector from "@/components/ProductPage/VariantSelector";

var productImages = [
  "/products/laptop/redmibook-15-pro/productImages/1.jpeg",
  "/products/laptop/redmibook-15-pro/productImages/2.jpeg",
  "/products/laptop/redmibook-15-pro/productImages/3.jpeg",
  "/products/laptop/redmibook-15-pro/productImages/4.jpeg",
  "/products/laptop/redmibook-15-pro/productImages/5.jpeg",
  "/products/laptop/redmibook-15-pro/productImages/6.jpeg",
];

var pageImages = [
  "/products/laptop/redmibook-15-pro/pageImages/1.jpeg",
  "/products/laptop/redmibook-15-pro/pageImages/2.jpeg",
  "/products/laptop/redmibook-15-pro/pageImages/3.jpeg",
  "/products/laptop/redmibook-15-pro/pageImages/4.jpeg",
  "/products/laptop/redmibook-15-pro/pageImages/5.jpeg",
];

interface SelectedVariant {
  storage: string;
  color: string;
}

const colorNames = ["", "Black", "Jade Green"];
const hexCodes = ["#FFFFFF", "#000000", "#82988a"];
const storageOptions = ['', '50"', '55"'];

const productId = 23;

const Redmibook15Pro = () => {
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
            RedmiBook 15 Pro Super Start Work Who is it meant for? As the name
            indicates, the RedmiBook Pro is the perfect laptop for the
            uncompromising working professionals, whether they have embraced the
            work-from-home life, or have started returning to their workplaces.
            It's also great for more demanding students who require to
            multi-task their online classes, complete assignments on Microsoft
            Office, or join their friends for a round of casual gaming after
            classes. Design With a charcoal grey polycarbonate body, sleek
            brushed metallic finish and most importantly great balance, the
            RedmiBook Pro allows for an easy single-finger open allowing you to
            multi-task without hassles. Inputs With a deep 1.5 mm travel on the
            scissor mechanism keyboard, this laptop is a pleasure to type on
            with satisfying tactile feedback – You are going to enjoy writing
            your emails or reports on this! A large 100 cm squared trackpad with
            Windows precision driver support complements this great keyboard and
            allows for multi-touch gesture control for easy swipe and touch
            based shortcuts. Keeping in mind how important collaboration is for
            the intended audience, we’ve placed a 720p HD webcam at the top of
            the screen to enable seamless video calls with your colleagues,
            friends or family, while staying safe at home. Connectivity With a
            wide and inclusive selection of ports on this notebook, you will
            have zero trouble in getting work done everyday, whether its several
            USB ports for accessories and external storage, HDMI 1.4 port for an
            external display, combo audio jack for sound, an ethernet LAN port
            for heavy duty data usage and more. Wi-Fi 5 and Bluetooth 5.0 ensure
            fast and reliable wireless connectivity while you focus on work.
            Performance With the latest 11th Gen Intel® Core™ i5-11300H
            processor, combined with 8 GB of 3200 MHz RAM and fast 512 GB NVMe
            SSD storage, this is a no-compromise notebook for productivity
            usage, whether crunching data on Excel or making reports and
            presentations on Word or PowerPoint. Iris Xe graphics with 80
            Execution Units enables creative use cases such as image editing,
            video editing and also casual gaming. Features: - Large Full HD
            Anti-glare Display 39.62 cm (15) . - Premium brushed metallic finish
            with Charcoal grey. - Powerful 11th Generation Intel® Core™
            i5-11300H. - Iris Xe Graphics with 80 Execution Units which trades
            blows with discrete mobile GPUs. - Quick transfer speeds, boot-up
            and wake-up times with 512 GB NVMe SSD storage - 8GB 3200 MHz DDR4
            RAM for effortless multi-tasking and smooth performance. - Tactile
            Scissor-switch keyboard for an enjoyable and stress-free typing
            experience. - Multi-touch Trackpad lets you swipe, scroll and select
            easily. - 10 Hour all day battery, which charges up to 50% in 33
            minutes and 80% in 53 minutes - Windows 10 Home, Office 2019 Home &
            Student 2019 comes pre-installed to help you Super Start work from
            the get go! So if you’ve been looking for a reliable, powerful and
            stylish work notebook to super start your dreams – Look no further!
            Super Start Life! *Please note that all functions, features, specs
            and any other product information provided on any Xiaomi and
            subsidiary platform, including but not limited to, benefits, design,
            pricing, components, performance, availability and capabilities
            describing the product are subject to change and changed by the
            company when deemed necessary without any notice or obligation.
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
      <ProductPageHeader product="RedmiBook 15 Pro" />
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

export default Redmibook15Pro;
