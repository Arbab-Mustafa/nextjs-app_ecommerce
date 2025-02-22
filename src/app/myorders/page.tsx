  "use client";
  import Header from "@/components/Header";
  import { getOrderStatus } from "@/lib/orderStatus";
  import Image from "next/image";
import { useRouter } from "next/navigation";
  import { useEffect, useState } from "react";

  interface Order {
    _id: {
      $oid: string;
    };
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

  const MyOrders = () => {

    const router = useRouter();



    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
      // fetch orders from /api/orders using phone number if available
      const fetchOrders = async () => {
        if (localStorage.getItem("phone")) {
          const phone = localStorage.getItem("phone");
          const res = await fetch(`api/orders?number=${phone}`);
          const data = await res.json();
          setOrders(data);
        } else {
          // redirect to login page
         router.push("/login");
        }
      };
      fetchOrders();
    }, []);

    return (
      <div>
        <Header />
        <div className="container mx-auto py-4">
          {orders.map((order) => (
            <div
              key={order._id.$oid}  // Moved the key prop here
              className="border border-gray-200 p-2 rounded-md bg-white mx-2 my-2"
              onClick={() => {
                window.location.href = `/myorders/${order.shortcode}`;
              }}
            >
              <div className="flex mx-4 my-2">
                <div className="text-xs text-gray-400">
                  {new Date(order.created_at).toLocaleString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: true,
                  })}
                </div>
                <div className="ml-auto text-xs text-orange-400">
                  {getOrderStatus(order.created_at)}
                </div>
              </div>
              <hr className="my-2" />
              <div className="py-2 px-4 flex">
                <div>
                  <Image
                    src={`/thumb/${order.items[0].product.id}.webp`}
                    alt={order.items[0].product.name}
                    width={100}
                    height={100}
                  />
                </div>
                <div className="ml-4 text-sm">
                  {order.items[0].product.name}{" "}
                  <span className="text-gray-400">+{order.items.length}</span>
                </div>
              </div>
              <div className="text-xs mx-4 font-light mt-2">
                Total ₹{order.amount}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  export default MyOrders;
