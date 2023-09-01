import React from "react";
import { usecartStore } from "../store/zustore";
import axios from "axios";
import CartProduct from "./CartProduct";
import useSWR from "swr";

export default function ShoppingCart1() {
  const loading = usecartStore((store) => store.loading);
  const cart = usecartStore((store) => store.cart);

  const getcartProducts = (url) => {
    if (!cart.length === 0) return;

    let cartProducts = [];

    for (const cartItem of cart) {
      axios.get(url + `/${cartItem.productId}`).then((response) => {
        const cartProduct = {
          id: response.data.id,
          title: response.data.title,
          price: response.data.price,
          category: response.data.category,
          image: response.data.image,
          qty: cartItem.quantity,
          subtotal: response.data.price * cartItem.quantity,
        };
        cartProducts.push(cartProduct);
      });
    }
    return cartProducts;
  };

  const { data, error, isLoading } = useSWR(
    import.meta.env.VITE_PRODUCTS,
    getcartProducts
  );

  const totalPrice = data?.reduce((acc, { price }) => {
    return (acc += price);
  }, 0);

  if (loading) {
    return (
      <div>
        <p>Loading</p>
      </div>
    );
  }
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl m-4">
          Shopping Cart
        </h1>
        <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <section aria-labelledby="cart-heading" className="lg:col-span-7">
            <h2 id="cart-heading" className="sr-only">
              Items in your shopping cart
            </h2>

            <ul
              role="list"
              className="divide-y divide-gray-200 border-b border-t border-gray-200"
            >
              {data &&
                data.map((product, index) => (
                  <li key={index} className="flex py-6 sm:py-10">
                    <CartProduct product={product} />
                  </li>
                ))}
            </ul>
          </section>

          {/* Order summary */}
          <section
            aria-labelledby="summary-heading"
            className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
          >
            <h2
              id="summary-heading"
              className="text-lg font-medium text-gray-900"
            >
              Order summary
            </h2>

            <dl className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <ol className="text-sm text-gray-600">
                  {data &&
                    data.map((product, index) => (
                      <li
                        key={index}
                        className="text-sm list-decimal font-medium text-gray-900"
                      >
                        <span>{product.title}</span>
                        &nbsp;
                        <span> ${product.subtotal}</span>
                      </li>
                    ))}
                </ol>
              </div>

              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="text-base font-medium text-gray-900">
                  Order total
                </dt>
                <dd className="text-base font-medium text-gray-900">
                  ${totalPrice}
                </dd>
              </div>
            </dl>

            <div className="mt-6">
              <button
                type="submit"
                className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
              >
                Checkout
              </button>
            </div>
          </section>
        </form>
      </div>
    </div>
  );
}
