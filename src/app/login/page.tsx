"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useRouter } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const router = useRouter();

  const handlePhoneSubmit = () => {
    if (!phoneNumber || phoneNumber.length !== 10 || !isChecked) {
      return;
    }

    // Store phone number in localStorage
    localStorage.setItem("phone", phoneNumber);

    // Redirect to cart
    router.push("/cart");
  };

  useEffect(() => {
    // If phone is already in localStorage, redirect to cart
    if (localStorage.getItem("phone") !== null) {
      router.push("/cart");
    }
  }, [router]);

  return (
    <div className="bg-white min-h-screen">
      <div className="flex text-gray-400 py-2 px-4 items-center">
        <div
          className="flex items-center text-xs"
          onClick={() => {
            window.location.href = "/";
          }}
        >
          <IoIosArrowBack className="h-6 w-6" />
        </div>
        <div className="ml-auto flex items-center text-sm">Help</div>
      </div>

      <div className="flex flex-col justify-center items-center py-4 mt-28">
        <div className="text-lg mb-6">Enter Your Phone Number To Continue</div>
        <img src="/mi-logo.png" alt="logo" className="h-24 mb-2" />
        <div className="text-[#999898] mx-12 text-[15px] text-center mb-8">
          Always believe that something wonderful is about to happen
        </div>

        {error && (
          <Alert variant="destructive" className="mb-4 mx-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="flex bg-[#E1E1E1] w-[346px] rounded-2xl">
          <Input
            type="tel"
            placeholder="Enter phone number"
            className="bg-[#E1E1E1] h-14 rounded-3xl placeholder:font-light placeholder:text-lg placeholder:pl-3 text-lg"
            value={phoneNumber}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "");
              if (value.length <= 10) {
                setPhoneNumber(value);
              }
            }}
            maxLength={10}
          />
        </div>
        <div className="flex flex-row items-center justify-start mx-8 ml-16 mt-5">
          {!isChecked ? (
            <input
              type="checkbox"
              id="agreement-checkbox"
              className="appearance-none w-6 h-6 rounded-full border bg-[#DFDEDE] checked:bg-[#218BF5] checked:border-[#218BF5] focus:outline-none px-2"
              checked={isChecked}
              onChange={() => setIsChecked(!isChecked)}
            />
          ) : (
            <Image
              src={"/login-check.svg"}
              width={24}
              height={24}
              alt="check"
              onClick={() => setIsChecked(!isChecked)}
            />
          )}

          <label
            htmlFor="agreement-checkbox"
            className="text-gray-400 text-start ml-4 text-sm font-light"
          >
            I've read and agreed to Xiaomi's{" "}
            <span className="underline text-[#218BF5]">User Agreement</span> and{" "}
            <span className="underline text-[#218BF5]">Privacy Policy</span>.
          </label>
        </div>
      </div>
      <div className="flex justify-center fixed bottom-5 w-full">
        <Button
          className="bg-[#218BF5] text-white py-4 w-10/12 rounded-xl h-14 text-[17px]"
          onClick={handlePhoneSubmit}
          disabled={phoneNumber.length !== 10 || !isChecked}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Login;
