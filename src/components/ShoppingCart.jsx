// import axios from "axios";
import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
import { usecartStore } from "../store/zustore";
import axios from "axios";

const ShoppingCart = () => {
  const [cartProducts, setcartProducts] = useState([]);
  const loading = usecartStore((store) => store.loading);
  const cart = usecartStore((store) => store.cart);

  const getcartProducts = async () => {
    if (!cart.length === 0) return;

    for (const cartItem of cart) {
      const response = await axios.get(
        import.meta.env.VITE_PRODUCTS + `/${cartItem.productId}`
      );
      const cartProduct = {
        id: response.data.id,
        title: response.data.title,
        price: response.data.price,
        category: response.data.category,
        image: response.data.image,
        qty: cartItem.quantity,
        subtotal: response.data.price * cartItem.quantity,
      };

      setcartProducts((prev) => {
        return [...prev, cartProduct];
      });
    }
  };
  console.log(cartProducts);
  useEffect(() => {
    let subscribe = true;
    if (subscribe) {
      (async () => await getcartProducts())();
    }
    return () => {
      subscribe = false;
    };
  }, [0]);

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
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
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
              {cartProducts.map((product) => (
                <li key={product.id} className="flex py-6 sm:py-10">
                  <div className="flex-shrink-0">
                    <img
                      src={product.image}
                      alt={product.image}
                      className="h-24 w-24 rounded-md object-fill object-center sm:h-48 sm:w-48"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                    <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                      <div>
                        <div className="flex justify-between">
                          <h3 className="text-sm">
                            <a
                              href={""}
                              className="font-medium text-gray-700 hover:text-gray-800"
                            >
                              {product.title}
                            </a>
                          </h3>
                        </div>

                        <p className="mt-1 text-sm font-medium text-gray-900">
                          $ {product.price}
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>
          <section
            aria-labelledby="summary-heading"
            className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
          >
            <h2
              id="summary-heading"
              className="text-lg font-medium text-gray-900"
            >
              Order Summary
            </h2>

            <dl className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <dt className="text-sm text-gray-600">Subtotal</dt>
                <dd className="text-sm font-medium text-gray-900">
                  {/* {product.subtotal} */}
                </dd>
              </div>

              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="text-base font-medium text-gray-900">
                  Order total
                </dt>
                <dd className="text-base font-medium text-gray-900">
                  {/* {product} */}
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
};
export default ShoppingCart;
