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
  "/products/audio/redmi-sonic-bass-wireless-earphones-2/productImages/1.jpeg",
  "/products/audio/redmi-sonic-bass-wireless-earphones-2/productImages/2.jpeg",
  "/products/audio/redmi-sonic-bass-wireless-earphones-2/productImages/3.jpeg",
  "/products/audio/redmi-sonic-bass-wireless-earphones-2/productImages/4.jpeg",
  "/products/audio/redmi-sonic-bass-wireless-earphones-2/productImages/5.jpeg",
  "/products/audio/redmi-sonic-bass-wireless-earphones-2/productImages/6.jpeg",
];

var pageImages = [
  "/products/audio/redmi-sonic-bass-wireless-earphones-2/pageImages/1.jpeg",
  "/products/audio/redmi-sonic-bass-wireless-earphones-2/pageImages/2.jpeg",
  "/products/audio/redmi-sonic-bass-wireless-earphones-2/pageImages/3.jpeg",
  "/products/audio/redmi-sonic-bass-wireless-earphones-2/pageImages/4.jpeg",
  "/products/audio/redmi-sonic-bass-wireless-earphones-2/pageImages/5.jpeg",
];

interface SelectedVariant {
  storage: string;
  color: string;
}

const colorNames = ["Graphite Grey"];
const hexCodes = ["#303235"];
const storageOptions = ["8 GB + 128 GB", "6 GB + 128 GB", "4 GB + 128 GB"];

const productId = 34;

const RedmiBuds5C = () => {
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
            Xiaomi Pad 6: Do it better The Xiaomi Pad 6 is a powerful Android
            tablet which aims to let users 'Do it better', whether its
            Entertainment, Productivity or Creativity. It weighs just 490g and
            is one of the thinnest tablet in the segment at 6.51mm. It is IP53
            rated which makes it splash and dust resistant. Entertainment With
            the promise of a better entertainment experience, this device offers
            a great visual experience combined with a top notch audio experience
            as well. It comes with a brilliant 2.8K resolution screen measuring
            11 inches. With this optimum size and resolution, its aspect ratio
            is 16:10 giving it just the right balance to do both productivity
            and content consumption really well. The tablet supports 144Hz
            7-stage AdaptiveSync refresh rate which delivers a smooth user
            experience even while navigating the UI and also some games support
            this refresh rate for a refreshingly smooth game experience. The
            device supports Dolby Vision Atmos, a combination which delivers a
            lifelike experience both on the visual as well as audio departments.
            With a quad speaker setup and Dolby Atmos support, content as well
            as gaming and regular meetings - everything just feels better.
            Productivity Xiaomi Pad 6 comes with MIUI 14 based on the latest
            Android 13, especially made, called 'MIUI for tablets'. MIUI for
            tablets is optimized for the unique combination of resolution,
            aspect ration and orientations it can be viewed at while in use.
            Some apps which benefit are - Notes app, Weather, Calculator and
            Security. Of these the Notes app comes with the most customization.
            Another aspect of productivity is how easily a user can use features
            like split screen windows to work on two tasks side by side, or add
            on to that with a floating window, making this device amazing at
            multi-tasking. The docking solution on this MIUI also enables quick
            access to active applications, and also easy access to other
            frequently used applications. You can now work on your
            presentations, excel sheets easily with Xiaomi Pad 6 Keyboard. With
            Xiaomi Pad 6 Keyboard, you can take your productivity to the next
            level. It has 64 keys with 1.3mm key travel for a satisfying tactile
            feedback. It comes with IPX4 rating making it splash resistant.
            Creativity The Notes app works seamlessly with the Xiaomi Smart Pen
            (2nd Generation), letting a user take notes akin to a pen on paper,
            or even switch to other tools like a pencil, pen, highlighter,
            eraser and more. For students who are in school or college, this app
            would be indispensable to take notes which include text, images,
            doodles and clips. All of these elements can be easily created and
            edited using the strong interaction between the pen and MIUI for
            pad. Xiaomi Smart Pen (2nd Generation) attaches magnetically to
            Xiaomi Pad 6 and has a battery life of 150 hours. Gaming The Xiaomi
            Pad 6 is a well balanced performance Android tablet with an Qualcomm
            Snapdragon 870 Octacore processor based on a 7nm process technology,
            which makes multi-tasking quite effective on this platform. It comes
            with an Adreno GPU which makes rendering of games and graphics
            intensive applications easy. With up to 8GB RAM and up to 256GB UFS
            3.1 storage, installing and playing even heavy games like BGMI or
            COD mobile are simple - and they run without any hitches at high
            graphics settings. With a 144Hz display, some games really deliver a
            very smooth experience, e.g. Altos Adventure. The large display
            helps the user comfortably handle the game on screen controls and
            the quad speaker setup with dynamic mapping as per orientation lets
            the user comfortably swap positions after long hours of play without
            affecting the game sound. Who is the Xiaomi Pad 6 for? If you are
            someone who needs a portable productivity powerhouse for emails,
            taking calls on the go and for taking notes at meetings or classes,
            this device is perfect for you. It can also act as your personal
            theatre or stereo setup giving you long hours of immersive
            entertainment whether at home, on some kind of transportation or
            while travelling. 1. The battery life data comes from the Xiaomi
            laboratory, and the ambient temperature is 25°C. The specific data
            may be slightly deviated due to different test environments. 2.
            Charging data comes from Xiaomi Lab, 1% initial charge, ambient
            temperature 25°C, tested using the 33W charger in the package with
            the screen off. Actual usage may vary slightly due to different
            environments. 3. The battery life data comes from the Xiaomi
            laboratory, and the ambient temperature is 25°C. The specific data
            may be slightly deviated due to different test environments. 4. The
            data is based on the Xiaomi laboratory model test, simulating the
            usage scenario without connecting accessories, the actual data may
            be different due to the difference in the test environment. 5.
            Charging data comes from Xiaomi Lab, 1% initial charge, ambient
            temperature 25°C, tested using the 33W charger in the package with
            the screen off. Actual usage may vary slightly due to different
            environments. *MIUI Smartphone Link feature is available on the
            Xiaomi 13 Pro beta update.
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
      <ProductPageHeader product="Redmi Sonic Bass Wireless Earphones 2" />
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

export default RedmiBuds5C;
