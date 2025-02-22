'use client';
import Image from "next/image";

const Success = () => {
  return (
    <div className="mt-40 flex flex-col h-screen overflow-hidden">
      <div className="flex justify-center">
        <Image
          src={"/payment-success.svg"}
          width={100}
          height={100}
          alt="success"
        />
      </div>
      <div className="text-3xl text-center mt-8">Order Confirmed</div>
      <div className="text-lg text-center mt-8 text-gray-400">
        Your order has been placed successfully
      </div>
      <div className="text-lg text-center mt-8 text-gray-400">
        Get your delivery by{" "}
        <span className="font-medium text-[#4F4E4E]">
          {" "}
          {new Date().toLocaleDateString("en-US", {
            weekday: "short",
            day: "2-digit",
            month: "short",
          })}{" "}
          -{" "}
          {new Date(
            new Date().setDate(new Date().getDate() + 5)
          ).toLocaleDateString("en-US", {
            weekday: "short",
            day: "2-digit",
            month: "short",
          })}
        </span>
      </div>
      <div className="mt-12 text-[#FF5500] text-center text-lg" onClick={() => {window.location.href = "/"}}>
        Return to home
      </div>

      <div className="mt-12 mx-16 bg-[#FF5500] px-10.5 py-4 rounded-md text-center text-white text-lg" onClick={() => {window.location.href = "/"}}>
        Continue Shopping
      </div>
      <div className="text-center mt-52 mb-8 text-gray-400 mx-2 text-sm">
        Have any question? Reach our{" "}
        <span className="text-[#FF5500]">Customer Support</span>
      </div>
    </div>
  );
};

export default Success;
