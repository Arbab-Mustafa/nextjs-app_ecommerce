"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Building2, Home, MapPin, User } from "lucide-react";
import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";

const Checkout = () => {
  useEffect(() => {
    if (localStorage.getItem("phone") === null) {
      window.location.href = "/login";
    }
  }, []);

  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [pincodeError, setPincodeError] = useState<string>("");
  const [phoneError, setPhoneError] = useState<string>("");

  function validatePincode(pincode: string): boolean {
    const pincodeRegex = /^\d{6}$/;
    return pincodeRegex.test(pincode);
  }

  function validatePhone(phone: string): boolean {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); // Prevent form submission

    // Get input values
    const nameInput = document.getElementById("name") as HTMLInputElement;
    const addressInput = document.getElementById("address") as HTMLInputElement;
    const landmarkInput = document.getElementById(
      "landmark"
    ) as HTMLInputElement;
    const cityInput = document.getElementById("city") as HTMLInputElement;
    const pincodeInput = document.getElementById("pincode") as HTMLInputElement;
    const phoneInput = document.getElementById("phone") as HTMLInputElement;

    const name = nameInput?.value ?? "";
    const address = addressInput?.value ?? "";
    const landmark = landmarkInput?.value ?? "";
    const city = cityInput?.value ?? "";
    const pincode = pincodeInput?.value ?? "";
    const phone = phoneInput?.value ?? "";
    const state = selectedState ?? "";

    // Reset previous errors
    setPincodeError("");
    setPhoneError("");

    // Validate other required fields
    if (!name || !address || !city || !state || !phone) {
      alert("Please complete all required details");
      return;
    }

    // Validate pincode
    if (!validatePincode(pincode)) {
      alert("Invalid pincode. Please enter a 6-digit number.");
      return;
    }

    // Validate phone number
    if (!validatePhone(phone)) {
      alert("Invalid phone number. Please enter a 10-digit number.");
      return;
    }

    const fullAddress = {
      name,
      address,
      landmark,
      city,
      pincode,
      state,
      phone,
    };

    localStorage.setItem("address", JSON.stringify(fullAddress));
    window.location.href = "/payment";
  }

  return (
    <Card className="w-full max-w-lg mx-auto h-screen">
      <div className="py-4 bg-black text-white text-center font-light text-lg">
        Sale Is Live | Upto 98% Discount On Phones
      </div>
      <div className="min-h-2 bg-gray-100"></div>
      <div className="flex items-center gap-2 p-2">
        <IoIosArrowBack
          className="w-5 h-5"
          onClick={() => {
            window.location.href = "/cart";
          }}
        />
        <h2 className="text-lg font-semibold">Add delivery address</h2>
      </div>
      <div className="min-h-2.5 bg-gray-100"></div>
      <CardContent className="py-4">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <Label htmlFor="name" className="text-lg">
              Name*
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              <Input
                id="name"
                placeholder="Enter Your Full Name"
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-4">
            <Label htmlFor="phone" className="text-lg">
              Phone Number*
            </Label>
            <div className="relative flex">
              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground">
                +91
              </span>
              <Input
                id="phone"
                placeholder="Enter Phone Number"
                className="rounded-l-none"
                type="tel"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={10}
              />
            </div>
            {phoneError && (
              <p className="text-red-500 text-sm mt-1">{phoneError}</p>
            )}
          </div>

          <div className="space-y-4">
            <Label htmlFor="address" className="text-lg">
              Address*
            </Label>
            <div className="relative">
              <Home className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              <Input
                id="address"
                placeholder="Enter House No. / Street Address"
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-4">
            <Label htmlFor="landmark" className="text-lg">
              Landmark
            </Label>
            <div className="relative">
              <Building2 className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              <Input
                id="landmark"
                placeholder="Enter Landmark Near Your Home"
                className="pl-10"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <Label htmlFor="city" className="text-lg">
                City*
              </Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input id="city" placeholder="Enter City" className="pl-10" />
              </div>
            </div>
            <div className="space-y-4">
              <Label htmlFor="pincode" className="text-lg">
                Pincode*
              </Label>
              <Input
                id="pincode"
                placeholder="Enter Pincode"
                type="tel"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={6}
              />
              {pincodeError && (
                <p className="text-red-500 text-sm mt-1">{pincodeError}</p>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <Label htmlFor="state" className="text-lg">
              Select State*
            </Label>
            <Select onValueChange={(value) => setSelectedState(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select Your State" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="andaman-nicobar">
                  Andaman and Nicobar Islands
                </SelectItem>
                <SelectItem value="andhra-pradesh">Andhra Pradesh</SelectItem>
                <SelectItem value="arunachal-pradesh">
                  Arunachal Pradesh
                </SelectItem>
                <SelectItem value="assam">Assam</SelectItem>
                <SelectItem value="bihar">Bihar</SelectItem>
                <SelectItem value="chandigarh">Chandigarh</SelectItem>
                <SelectItem value="chhattisgarh">Chhattisgarh</SelectItem>
                <SelectItem value="dadra-nagar-haveli-daman-diu">
                  Dadra and Nagar Haveli and Daman and Diu
                </SelectItem>
                <SelectItem value="delhi">Delhi</SelectItem>
                <SelectItem value="goa">Goa</SelectItem>
                <SelectItem value="gujarat">Gujarat</SelectItem>
                <SelectItem value="haryana">Haryana</SelectItem>
                <SelectItem value="himachal-pradesh">
                  Himachal Pradesh
                </SelectItem>
                <SelectItem value="jammu-kashmir">Jammu and Kashmir</SelectItem>
                <SelectItem value="jharkhand">Jharkhand</SelectItem>
                <SelectItem value="karnataka">Karnataka</SelectItem>
                <SelectItem value="kerala">Kerala</SelectItem>
                <SelectItem value="ladakh">Ladakh</SelectItem>
                <SelectItem value="lakshadweep">Lakshadweep</SelectItem>
                <SelectItem value="madhya-pradesh">Madhya Pradesh</SelectItem>
                <SelectItem value="maharashtra">Maharashtra</SelectItem>
                <SelectItem value="manipur">Manipur</SelectItem>
                <SelectItem value="meghalaya">Meghalaya</SelectItem>
                <SelectItem value="mizoram">Mizoram</SelectItem>
                <SelectItem value="nagaland">Nagaland</SelectItem>
                <SelectItem value="odisha">Odisha</SelectItem>
                <SelectItem value="puducherry">Puducherry</SelectItem>
                <SelectItem value="punjab">Punjab</SelectItem>
                <SelectItem value="rajasthan">Rajasthan</SelectItem>
                <SelectItem value="sikkim">Sikkim</SelectItem>
                <SelectItem value="tamil-nadu">Tamil Nadu</SelectItem>
                <SelectItem value="telangana">Telangana</SelectItem>
                <SelectItem value="tripura">Tripura</SelectItem>
                <SelectItem value="uttar-pradesh">Uttar Pradesh</SelectItem>
                <SelectItem value="uttarakhand">Uttarakhand</SelectItem>
                <SelectItem value="west-bengal">West Bengal</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-4">
            <div className="flex items-center py-4 border-orange-500 border rounded-lg px-3 space-x-14 my-4">
              <Image src={"opt-btn.svg"} alt="opt" width={21} height={21} />
              <label
                htmlFor="shipping"
                className="text-lg font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Free Shipping
              </label>
            </div>
          </div>
          <div className="min-h-10"></div>
          <div className="bg-white fixed bottom-0 w-full pr-12">
            <Button
              className=" bg-orange-500 hover:bg-orange-600 my-3 w-full text-lg px-12 py-6"
              type="submit"
            >
              Save Address & Continue
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default Checkout;
