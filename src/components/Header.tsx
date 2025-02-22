import { FiSearch, FiMenu } from "react-icons/fi";
import { IoCartOutline } from "react-icons/io5";
import Image from "next/image";
import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";

const Header = () => {
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    // Update cart count on mount and when localStorage changes
    const updateCartCount = () => {
      try {
        const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
        setCartItemsCount(cartItems.length);
      } catch (error) {
        console.error("Error parsing cart items:", error);
        setCartItemsCount(0);
      }
    };

    // Initial cart count
    updateCartCount();
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <header className="top-0 bg-white w-full">
        <div className="flex items-center justify-between px-2 py-2">
          {/* Logo */}
          <div className="flex-shrink-0 pl-4">
            <img
              src="/mi-logo.svg"
              alt="Mi Logo"
              className=""
              height={51}
              width={46}
              onClick={() => {
                window.location.href = "/";
              }}
            />
          </div>

          {/* Icons */}
          <div className="flex text-xl text-gray-600">
            {/* Search Icon */}
            <button
              aria-label="Search"
              className="px-1"
              onClick={() => {
                window.location.href = "/search";
              }}
            >
              <Image src={"/search-icon.svg"} width={37} height={37} alt="search"/>
            </button>

            {/* Cart Icon */}
            <button
              aria-label="Cart"
              className="relative px-1"
              onClick={() => {
                window.location.href = "/cart";
              }}
            >
              <Image src={"/cart-icon.svg"} width={40} height={34} alt="cart" className="pt-1"/>
              {cartItemsCount !== 0 && (
                <span className="absolute top-1 right-2 bg-orange-500 text-white rounded-full text-[10px] w-2 h-2 p-2 flex items-center justify-center transform translate-x-1/2 -translate-y-1/2">
                  {cartItemsCount}
                </span>
              )}
            </button>

            {/* Hamburger Menu */}
            <button aria-label="Menu" className="px-1 pb-1" onClick={toggleSidebar}>
            <Image src={"/menu-icon.svg"} width={37} height={37} alt="menu"/>
            </button>
          </div>
        </div>
      </header>

      {/* Sidebar Component */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </>
  );
};

export default Header;