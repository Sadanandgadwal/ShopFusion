import React from "react";
import { usewishListStore } from "../store/zustore";
import axios from "axios";

import useSWR from "swr";
import { Link } from "react-router-dom";
import Wishlistproduct from "./Wishlistproduct";

export default function Wishlist() {
  const Wishlist = usewishListStore((store) => store.Wishlist);

  const getwishlistProducts = async (url) => {
    if (!Wishlist.length === 0) return [];

    try {
      const wishlistProducts = await Promise.all(
        Wishlist.map(async (wishlistitem) => {
          const response = await axios.get(url + `/${wishlistitem.productId}`);
          return {
            id: response.data.id,
            title: response.data.title,
            price: response.data.price,
            category: response.data.category,
            image: response.data.image,
            qty: wishlistitem.quantity,
            subtotal: response.data.price * wishlistitem.quantity,
          };
        })
      );

      return wishlistProducts;
    } catch (error) {
      // Handle errors here, you can log them or set an error state
      console.error("Error fetching cart products:", error);
      throw error; // Rethrow the error to let SWR handle it
    }
  };

  const { data, error, isLoading } = useSWR(
    import.meta.env.VITE_PRODUCTS,
    getwishlistProducts
  );

  const totalPrice = data?.reduce((acc, { price }) => {
    return (acc += price);
  }, 0);

  if (isLoading) {
    return (
      <div>
        <p>Loading</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <p>Error fetching cart products. Please try again later.</p>
      </div>
    );
  }

  console.log(isLoading);
  console.log(data);
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8 ml-96">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl m-4">
          Wishlist
        </h1>
        <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <div aria-labelledby="cart-heading" className="lg:col-span-7">
            <h2 id="cart-heading" className=" text-black">
              {data.length === 0
                ? "No Wishlist Items Found"
                : "Items in your Wishlist"}
            </h2>
            <ul
              role="list"
              className="divide-y divide-gray-200 border-b border-t border-gray-200"
            >
              {data?.map((product, index) => (
                <li key={index} className="flex py-6 sm:py-10 ">
                  <Wishlistproduct product={product} />
                </li>
              ))}
            </ul>
          </div>

          {/* Order summary */}
        </div>
      </div>
    </div>
  );
}
