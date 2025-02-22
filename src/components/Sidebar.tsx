'use client';
import { PiCaretRightLight } from "react-icons/pi";
import { FiX } from "react-icons/fi";
import Image from "next/image";
import { useEffect, useState } from "react";
// components/Sidebar.tsx
interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}



const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

useEffect(() => {
  const phone = localStorage.getItem("phone");
  if (phone) {
    setIsLoggedIn(true);
  }
})

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`fixed top-0 right-0 h-full w-full bg-white text-gray-900 z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="absolute top-2 right-4">
          <button
            className="mt-4 text-sm text-gray-400"
            onClick={toggleSidebar}
          >
            <FiX />
          </button>
        </div>
        
        <div
          className="px-4 mt-16 flex items-center"
          onClick={() => {
            if (!isLoggedIn) {
              window.location.href = "/login";
            }
          }}
        >
          <div className="mr-2">
            <Image
              src={"/mi-logo.png"}
              alt="user-avatar"
              height={48}
              width={48}
              className="rounded-lg"
            />
          </div>
          <div className="ml-auto font-light">
            {/* <PiCaretRightLight /> */}
          </div>
        </div>
        <nav className="mt-8 space-y-4 font-medium">
          <a href="/" className="block px-4 py-1 hover:bg-gray-100">
            Store
          </a>
          <a
            href="/category/smartphone"
            className="block px-4 py-1 hover:bg-gray-100"
          >
            Phones
          </a>
          <a
            href="/category/tablet"
            className="block px-4 py-1 hover:bg-gray-100"
          >
            Tablets
          </a>
          <a href="/category/tv" className="block px-4 py-1 hover:bg-gray-100">
            TV & Smart Home
          </a>
          <a
            href="/category/audio"
            className="block px-4 py-1 hover:bg-gray-100"
          >
            Smart Watch & Audio
          </a>
          <a href="#" className="block px-4 py-1 hover:bg-gray-100">
            Discover
          </a>
          <a href="#" className="block px-4 py-1 hover:bg-gray-100">
            Support
          </a>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
