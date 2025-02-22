"use client";
import Image from "next/image";


const CartPageHeader = () => {
  return (
    <header className="top-0 bg-gray-100 shadow-md w-full">
      <div className="flex items-center px-5 py-3">
        <div className="flex items-center">
            <div className="font-semibold flex items-center">
            <button
              onClick={() => {
                window.history.back();
              }}
            >
              <Image
                src={"/arrow-back.svg"}
                height={23.62}
                width={13.5}
                alt="back"
              />
            </button>
          </div>

          <div className="pl-7 text-lg">Shopping Cart</div>
        </div>
      </div>
    </header>
  );
};

export default CartPageHeader;
