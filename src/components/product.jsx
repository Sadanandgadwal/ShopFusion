import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { usecartStore, usewishListStore } from "../store/zustore";
import "react-toastify/dist/ReactToastify.css";
import { notify } from "../utils/notification";

import { AiTwotoneHeart } from "react-icons/ai";
const Product = ({ product }) => {
  const { user, isAuthenticated } = useAuth0();

  const cart = usecartStore((store) => store.cart);
  const list = usewishListStore((store) => store.list);
  const { id } = useParams();
  // console.log(cart);

  const AddtoCart = usecartStore((store) => store.AddtoCart);

  async function AddCart(id) {
    if (!isAuthenticated) {
      return notify.error("Login to add item in the cart");
    }
    const product = { productId: id, quantity: 1 };
    AddtoCart(product);
  }

  const AddtoWishlist = usewishListStore((store) => store.AddtoWishlist);
  async function Wishlist(id) {
    const product = { productId: id, quantity: 1 };
    AddtoWishlist(product);
  }

  return (
    <form>
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80 ">
        <Link to={`/Productdetail/${product.id}`}>
          <img
            src={product.image}
            alt={product.image}
            className="h-full w-full object-center  lg:h-full lg:w-full cursor-pointer"
          />
        </Link>
      </div>
      <div className="py-8 flex flex-col gap-6">
        <div className="mt-4 flex flex-col justify-center max-h-20">
          <div className="text-center align-middle ">
            <h3 className="text-sm text-gray-700">
              <span aria-hidden="true" className="absolute inset-0"></span>
              {product.title}
            </h3>
            <p className="mt-1 text-sm text-gray-500">{product.category}</p>
          </div>
          <p className="text-sm font-medium text-gray-900 flex justify-center">
            ${product.price}
          </p>
        </div>
        <div className="justify-center text-center flex ">
          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              AddCart(product.id);
            }}
            className="text-white cursor-pointer text-center bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm m-2 px-8 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          >
            Add Cart
          </button>
          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              Wishlist(product.id);
            }}
            className="text-white cursor-pointer text-center bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm m-2 px-8 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          >
            WishList
          </button>
        </div>
      </div>
    </form>
  );
};

export default Product;
