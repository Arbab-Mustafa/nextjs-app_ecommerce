"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ImageCarousel from "@/components/ImageCarousel";
import PreFooter from "@/components/PreFooter";
import TwoCards from "@/components/TwoCards";
import Image from "next/image";

const images = [
  "banner-1.svg",
  "banner-1.svg",
  "banner-1.svg",
  "banner-1.svg",
  "banner-1.svg",
];

const smartphones = [
  {
    name: "Xiaomi 14",
    price: 2499,
    oldPrice: 54999,
    image: "/thumb/3.webp",
    href: "/products/smartphone/xiaomi-14",
  },
  {
    name: "Xiaomi 14 CIVI Limited Edition",
    price: 2999,
    oldPrice: 59999,
    image: "/xiaomi-14-civi-limited-edition.webp",
    href: "/products/smartphone/xiaomi-14-civi-limited-edition",
  },
  {
    name: "Xiaomi 14 Ultra",
    price: 3499,
    oldPrice: 25999,
    image: "/mi-14-ultra.webp",
    href: "/products/smartphone/xiaomi-14-ultra",
  },
  {
    name: "Redmi A3X",
    price: 1999,
    oldPrice: 12999,
    image: "/thumb/8.webp",
    href: "/products/smartphone/redmi-a3x",
  },
  {
    name: "Redmi Note 13 Pro+",
    price: 1999,
    oldPrice: 33999,
    image: "/redmi-note-13-pro-plus.webp",
    href: "/products/smartphone/redmi-note-13-pro-plus",
  },
  {
    name: "Redmi Note 13 Pro",
    price: 1799,
    oldPrice: 28999,
    image: "/redmi-note-13-pro.webp",
    href: "/products/smartphone/redmi-note-13-pro",
  },
  {
    name: "Redmi Note 13 5G",
    price: 5,
    oldPrice: 100,
    image: "/redmi-note-13.webp",
    href: "/products/smartphone/redmi-note-13-5g",
  },
  {
    name: "Redmi 13 5G",
    price: 1499,
    oldPrice: 20999,
    image: "/redmi-13-5g.webp",
    href: "/products/smartphone/redmi-13-5g",
  },
  {
    name: "Redmi A3",
    price: 1499,
    oldPrice: 20999,
    image: "/redmi-a3.webp",
    href: "/products/smartphone/redmi-a3",
  },
  {
    name: "Redmi 13C 5G",
    price: 1499,
    oldPrice: 20999,
    image: "/thumb/10.webp",
    href: "/products/smartphone/redmi-13-5g",
  },
  {
    name: "Redmi 12 5G",
    price: 1499,
    oldPrice: 20999,
    image: "/thumb/11.webp",
    href: "/products/smartphone/redmi-12-5g",
  },
  {
    name: "Redmi A2+",
    price: 1499,
    oldPrice: 20999,
    image: "/thumb/12.webp",
    href: "/products/smartphone/redmi-a2-plus",
  },
];

const tvs = [
  {
    name: "Redmi Smart Fire TV 32 (80cm) 2024",
    price: 5,
    oldPrice: 100,
    image: "/redmi-smart-tv-32-inch.webp",
    href: "/products/tv/redmi-smart-fire-32-inch-tv",
  },
  {
    name: "Xiaomi Smart TV X 40 (108 cm)",
    price: 5,
    oldPrice: 100,
    image: "/redmi-smart-tv-43-inch.webp",
    href: "/products/tv/xiaomi-40-inch-tv",
  },
  {
    name: "Redmi Smart Fire TV 4K 43",
    price: 1999,
    oldPrice: 12999,
    image: "/redmi-smart-tv-43-inch-4k.webp",
    href: "/products/tv/xiaomi-45-inch-tv",
  },
  {
    name: "Xiaomi Smart TV X Series",
    price: 3499,
    oldPrice: 25999,
    image: "/redmi-smart-tv-x-PRO.webp",
    href: "/products/tv/xiaomi-smart-tv-x-series-55(138cm)-2024-edition",
  },
];

const tablets = [
  {
    name: "Xiaomi Pad 6",
    price: 2599,
    oldPrice: 39999,
    image: "/xiaomi-pad-6.webp",
    href: "/products/tablet/xiaomi-pad-6",
  },
  {
    name: "Redmi Pad SE",
    price: 1999,
    oldPrice: 27999,
    image: "/redmi-pad-pro-5g.webp",
    href: "/products/tablet/redmi-pad-se",
  },
];

const buds = [
  {
    name: "Redmi Buds 5A",
    price: 399,
    oldPrice: 2999,
    image: "/redmi-buds-5a.webp",
    href: "/products/audio/redmi-buds-5a",
  },
  {
    name: "Redmi Buds 5",
    price: 599,
    oldPrice: 4999,
    image: "/redmi-buds-5.webp",
    href: "/products/audio/redmi-buds-5",
  },
];

const watches = [
  {
    name: "Redmi Watch 5 Lite",
    price: 2999,
    oldPrice: 5999,
    image: "/redmi-watch-5-lite.webp",
    href: "/products/smartwatch/redmi-watch-5-lite",
  },
  {
    name: "Redmi Watch 5 Active",
    price: 3999,
    oldPrice: 6999,
    image: "/redmi-watch-5-active.webp",
    href: "/products/smartwatch/redmi-watch-5-active",
  },
];
export default function Home() {
  return (
    <div className="bg-[#f7f6f6]">
      <div className="min-h-[38px] px-[18px] bg-black text-white text-center sm:text-base md:text-lg flex items-center justify-center">
        Sale Is Live | Upto 98% Discount On Phones
      </div>
      <Header />

      <div className="px-[11px] py-2">
        <ImageCarousel images={images} />
      </div>

      <div className="grid grid-cols-4 gap-6 justify-items-center bg-white mx-[11px] pt-4">
        <div className="flex flex-col items-center">
          <div
            className=""
            onClick={() => {
              window.location.href = "/category/smartphone";
            }}
          >
            <Image src="/phone-icon.svg" height={55} width={55} alt="phone" />
          </div>
          {/* <span className="text-sm font-medium">Phone</span> */}
        </div>
        <div
          className="flex flex-col items-center"
          onClick={() => {
            window.location.href = "/category/tv";
          }}
        >
          <div className="">
            <Image src="/tv-icon.svg" height={68} width={70} alt="tv" />
          </div>
          {/* <span className="text-sm font-medium">TV</span> */}
        </div>
        <div
          className="flex flex-col items-center"
          onClick={() => {
            window.location.href = "/category/laptop";
          }}
        >
          <div className="">
            <Image src="/laptop-icon.svg" height={60} width={60} alt="laptop" />
          </div>
          {/* <span className="text-sm font-medium">Laptop</span> */}
        </div>
        <div
          className="flex flex-col items-center"
          onClick={() => {
            window.location.href = "/category/home";
          }}
        >
          <div className="">
            <Image
              src="/lifestyle-icon.svg"
              height={60}
              width={60}
              alt="lifestyle"
            />
          </div>
          {/* <span className="text-sm font-medium">Lifestyle</span> */}
        </div>
      </div>
      <div className="grid grid-cols-4 gap-6 justify-items-center bg-white mx-[11px] pb-2 text-[11px] font-medium">
        <div>Phone</div>
        <div>TV & Smart</div>
        <div>Laptop</div>
        <div>LifeStyle</div>
      </div>

      <div className="min-h-[10px] bg-[#f7f6f6]"></div>

      {/* Banner */}
      <div className="bg-[#f7f6f6] mx-[11px]">
        <img
          src="/banner-2.svg"
          alt="Banner"
          width={1920}
          height={40}
        />
      </div>

      <div className="min-h-[10px] bg-[#f7f6f6]"></div>

      <TwoCards products={smartphones.slice(4, 6)} />

      <div className="min-h-[6px]"></div>

      <TwoCards products={smartphones.slice(6, 8)} />
      <div className="min-h-[6px]"></div>
      <TwoCards products={smartphones.slice(8, 10)} />

      <div className="min-h-[6px]"></div>
      <TwoCards products={smartphones.slice(10, 12)} />

      <div className="min-h-2"></div>

      {/* Banner */}
      <div className="bg-[#f7f6f6]">
        <video preload="auto" autoPlay muted>
          <source src="civi-promo.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="min-h-[10px] bg-[#f7f6f6]"></div>

      <TwoCards products={smartphones.slice(0, 2)} />

      <div className="min-h-[6px] bg-[#f7f6f6]"></div>

      <TwoCards products={smartphones.slice(2, 4)} />

      <div className="min-h-[10px] bg-[#f7f6f6]"></div>

      {/* Banner */}
      <div className="bg-[#f7f6f6] mx-[11px]">
        <Image
          src="/fp-2.webp"
          alt="Banner"
          width={1920}
          height={40}
          objectFit="cover"
        />
      </div>

      <div className="min-h-[10px] bg-[#f7f6f6]"></div>

      <TwoCards products={tvs.slice(0, 2)} />

      <div className="min-h-[6px] bg-[#f7f6f6]"></div>

      <TwoCards products={tvs.slice(2, 4)} />

      <div className="min-h-[10px] bg-[#f7f6f6]"></div>

      {/* Banner */}
      <div className="bg-[#f7f6f6] mx-[11px]">
        <Image
          src="/fp-6.webp"
          alt="Banner"
          width={1920}
          height={40}
          objectFit="cover"
        />
      </div>

      <div className="min-h-[10px] bg-[#f7f6f6]"></div>
      <TwoCards products={tablets.slice(0, 2)} />

      <div className="min-h-[10px] bg-[#f7f6f6]"></div>

      {/* Banner */}
      <div className="bg-[#f7f6f6] mx-[11px]">
        <Image
          src="/fp-7.png"
          alt="Banner"
          width={1920}
          height={40}
          objectFit="cover"
          style={{
            backgroundColor: "#f7f6f6",
          }}
        />
      </div>

      <div className="min-h-[10px] bg-[#f7f6f6]"></div>
      <TwoCards products={watches.slice(0, 2)} />
      <div className="min-h-[6px] bg-[#f7f6f6]"></div>
      <TwoCards products={buds.slice(0, 2)} />
      <PreFooter />
      <div className="min-h-[30px] bg-[#f7f6f6]"></div>
      <Footer />
    </div>
  );
}
