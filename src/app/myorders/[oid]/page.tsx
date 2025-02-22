"use client";
import Header from "@/components/Header";
import { getOrderStatus } from "@/lib/orderStatus";
import { use } from "react";
import { useEffect, useState } from "react";
import { SlLocationPin } from "react-icons/sl";
import Image from "next/image";
import Footer from "@/components/Footer";

const MyordersOid = ({ params }: { params: Promise<{ oid: string }> }) => {
  interface Order {
    _id: string;
    items: {
      productId: number;
      quantity: number;
      variant: {
        storage: string;
        color: string;
      };
      product: {
        _id: string;
        id: number;
        name: string;
        oldPrice: number;
        newPrice: number;
        category: string;
      };
    }[];
    address: {
      name: string;
      address: string;
      landmark: string;
      city: string;
      pincode: string;
      state: string;
      phone: string;
    };
    amount: number;
    created_at: string;
    shortcode: string;
  }

  const { oid } = use(params);

  const [order, setOrder] = useState<Order>();

  useEffect(() => {
    const fetchOrders = async () => {
      // fetch order by oid

      const number = localStorage.getItem("phone");

      if (number) {
        const res = await fetch(`/api/orders?number=${number}&oid=${oid}`);
        const data = await res.json();
        console.log(data);
        setOrder(data);
      } else {
        window.location.href = "/login";
      }
    };

    fetchOrders();
  }, []);

  const statusSteps = ["Placed", "Paid", "Processed", "Shipped", "Delivered"];

  return (
    <div>
      <Header />
      {order && (
        <div>
          <div className="min-h-2 bg-gray-100"></div>

          <div className="flex flex-row p-4 bg-white items-center">
            <div>
              <div>
                <span className="text-sm">
                  Order ID {order._id.replace(/\D/g, "") ?? ""}
                </span>
              </div>
              <div className="text-xs text-gray-400">
                {new Date(order.created_at).toLocaleString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  hour12: true,
                })}{" "}
              </div>
            </div>
            <div className="ml-auto text-sm text-gray-600">
              {getOrderStatus(order.created_at)} ✅
            </div>
          </div>

          <div className="min-h-2 bg-gray-100"></div>

          <div className="bg-white p-4 flex flex-row items-center">
            <div className="text-gray-600 text-2xl">
              <SlLocationPin />
            </div>
            <div className="ml-4">
              <div className="flex justify-between">
                <div className="text-sm">{order.address.name}</div>
                <div className="w-6"></div>
                <div className="text-sm">
                  {order.address.phone.replace(
                    /(\d{3})\d*(\d{3})/,
                    "$1******$2"
                  )}
                </div>
              </div>
              <div className="text-gray-400 text-xs tracking-widest">
                <div>
                  {order.address.address} {order.address.landmark}
                </div>
                <div>{order.address.city}</div>
                <div>
                  {order.address.pincode}{" "}
                  {order.address.state.replace("-", " ").toUpperCase()}
                </div>
              </div>
            </div>
          </div>

          <div className="min-h-2 bg-gray-100"></div>

          <div className="bg-white p-4 py-8">
            {/* a thin progress bar showing order status Order Placed, Paid, Processed, Shipped Delivered */}
            <div className="flex flex-row justify-between">
              <div
                className={`text-sm ${
                  [
                    "Placed",
                    "Paid",
                    "Processed",
                    "Shipped",
                    "Delivered",
                  ].indexOf(getOrderStatus(order.created_at)) >= 0
                    ? "text-green-400"
                    : "text-gray-400"
                }`}
              >
                Placed
              </div>
              <div
                className={`text-sm ${
                  ["Paid", "Processed", "Shipped", "Delivered"].indexOf(
                    getOrderStatus(order.created_at)
                  ) >= 0
                    ? "text-green-400"
                    : "text-gray-400"
                }`}
              >
                Paid
              </div>
              <div
                className={`text-sm ${
                  ["Processed", "Shipped", "Delivered"].indexOf(
                    getOrderStatus(order.created_at)
                  ) >= 0
                    ? "text-green-400"
                    : "text-gray-400"
                }`}
              >
                Processed
              </div>
              <div
                className={`text-sm ${
                  ["Shipped", "Delivered"].indexOf(
                    getOrderStatus(order.created_at)
                  ) >= 0
                    ? "text-green-400"
                    : "text-gray-400"
                }`}
              >
                Shipped
              </div>
              <div
                className={`text-sm ${
                  ["Delivered"].indexOf(getOrderStatus(order.created_at)) >= 0
                    ? "text-green-400"
                    : "text-gray-400"
                }`}
              >
                Delivered
              </div>
            </div>
            <div>
              {/* dots and line to show the progress */}
              <div className="relative mt-2 flex items-center">
                {statusSteps.map((status, index) => (
                  <div className="flex items-center" key={status}>
                    <div
                      className={`w-2.5 h-2.5 rounded-full ${
                        index <=
                        statusSteps.indexOf(getOrderStatus(order.created_at))
                          ? "bg-green-400"
                          : "bg-gray-300"
                      }`}
                    ></div>
                    {index < statusSteps.length - 1 && (
                      <div
                        className={`w-[70px] h-0.5 ${
                          index <
                          statusSteps.indexOf(getOrderStatus(order.created_at))
                            ? "bg-green-400"
                            : "bg-gray-300"
                        }`}
                      ></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="min-h-2 bg-gray-100"></div>

          <div className="p-4 bg-white">
            <div className="text-gray-400">Order Items</div>
            <hr className="my-2" />
            {order.items.map((item) => (
              <div className="py-2 flex flex-row" key={item.product._id}>
                <div>
                  <img
                    src={`/thumb/${item.productId}.webp`}
                    alt="product image"
                    className="w-20 h-20 object-cover mr-2"
                  />
                </div>
                <div>
                  <div className="text-xs ml-4 mr-6">
                    {item.product.name} {item.variant.storage}
                  </div>
                  <div className="text-xs ml-4 text-gray-300">
                    Sold by Xiaomi Technology India Private Limited
                  </div>
                </div>
                <div className="ml-auto">
                  <div className="text-orange-600 text-sm">
                    ₹{item.product.newPrice * item.quantity}
                  </div>
                  <div className="text-xs text-gray-600">x{item.quantity}</div>
                </div>
                <div className="min-h-1 bg-gray-100"></div>
              </div>
            ))}
          </div>

          <div className="min-h-2 bg-gray-100"></div>

          <div className="bg-white mt-4 rounded-sm  p-4">
            <div className="flex justify-between text-base mb-3">
              <span className="">Subtotal:</span>
              <span className="text-gray-600">
                ₹{order.amount.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between text-base mb-3">
              <span>Shipping:</span>
              <span className="text-gray-600">Free Delivery</span>
            </div>
            <div className="flex justify-between text-base mb-3">
              <span>Total:</span>
              <span className="text-orange-400">
                ₹{order.amount.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="min-h-2 bg-gray-100"></div>

          <div className="bg-white p-4">
            <div className="text-">
              Total:{" "}
              <span className="text-orange-500">
                ₹{order.amount.toLocaleString()}
              </span>
            </div>
          </div>
          <div className="min-h-2 bg-gray-100"></div>

          <Footer />
        </div>
      )}
    </div>
  );
};

export default MyordersOid;
