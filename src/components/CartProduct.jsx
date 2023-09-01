import React from "react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { usecartStore } from "../store/zustore";
const CartProduct = ({ product }) => {
  const removeProduct = usecartStore((store) => store.removeCart);

  return (
    <>
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
            <p className="mt-1 text-sm font-medium text-gray-700">
              Category : {product.category}
            </p>
            <p className="mt-1 text-sm font-medium text-gray-900">
              $ {product.price}
            </p>
          </div>

          <div className="mt-4 sm:mt-0 sm:pr-9">
            <div className="absolute right-0 top-0">
              <button
                type="button"
                className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Remove</span>
                <XMarkIcon
                  onClick={(e) => {
                    e.preventDefault();
                    removeProduct(product.id);
                    window.location.reload();
                  }}
                  className="h-5 w-5"
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartProduct;
