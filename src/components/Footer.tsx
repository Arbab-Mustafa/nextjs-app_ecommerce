import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Facebook, X, Instagram, MoveRightIcon } from "lucide-react";
import Image from 'next/image';

function PlayStoreLogo() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      id="google-play"
    >
      <path
        fill="#2196F3"
        d="M8.32 7.68.58 15.42c-.37-.35-.57-.83-.57-1.35V1.93C.01 1.4.22.92.6.56l7.72 7.12z"
      ></path>
      <path
        fill="#FFC107"
        d="M15.01 8c0 .7-.38 1.32-1.01 1.67l-2.2 1.22-2.73-2.52-.75-.69 2.89-2.89L14 6.33c.63.35 1.01.97 1.01 1.67z"
      ></path>
      <path
        fill="#4CAF50"
        d="M8.32 7.68.6.56C.7.46.83.37.96.29 1.59-.09 2.35-.1 3 .26l8.21 4.53-2.89 2.89z"
      ></path>
      <path
        fill="#F44336"
        d="M11.8 10.89 3 15.74c-.31.18-.66.26-1 .26-.36 0-.72-.09-1.04-.29a1.82 1.82 0 0 1-.38-.29l7.74-7.74.75.69 2.73 2.52z"
      ></path>
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-black text-white p-6 space-y-6">
      <div className="space-y-4">
        <h2 className="font-bold">Follow Mi</h2>
        <div className="flex space-x-4">
          <a href="#" aria-label="Facebook">
            <Facebook className="w-6 h-6" />
          </a>
          <a href="#" aria-label="Twitter">
            <X className="w-6 h-6" />
          </a>
          <a href="#" aria-label="Instagram">
            <Instagram className="w-6 h-6" />
          </a>
        </div>
      </div>

      <div className="space-y-2">
        <p className="font-semibold">Let&apos;s stay in touch</p>
        <div className="flex">
          <Input
            type="email"
            placeholder="Enter email address"
            className="rounded-r-none bg-transparent border-white"
          />
          <Button variant="outline" className="rounded-l-none border-l-0">
            <MoveRightIcon color="black" />
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <p className="font-semibold">Get mi store app</p>
        <div className="">
        <Button variant="outline" className="w-full justify-start space-x-2 text-center">
          <PlayStoreLogo />
          <span className="text-black font-normal">
            Download on Google Play
          </span>
        </Button>
        </div>

      </div>

      <div>
        <h3 className="font-semibold mb-2">Sitemap</h3>
        <a href="#" className="text-sm hover:underline flex items-center space-x-2">
          <Image src="/india-flag.png" alt="flag" width={24} height={24} />
          <span>Xiaomi India</span>
        </a>
      </div>
    <div className="min-h-0.5 bg-gray-400"></div>

      <div className="text-xs text-gray-400 font-bold">
        Copyright © 2010 - 2024 Xiaomi. All Rights Reserved
      </div>
    </footer>
  );
}
