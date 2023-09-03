import React from "react";
import { useEffect } from "react";
import Homepage from "../pages/Homepage";
import Product from "./product";
import { useProductStore } from "../store/zustore";
const ViewProducts = () => {
  const products = useProductStore((store) => store.products);
  const getproducts = useProductStore((store) => store.getProducts);

  useEffect(() => {
    getproducts();
  }, []);

  return (
    <>
      <Homepage />
      <div>
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 ">
            {products &&
              products.map((product, index) => {
                return (
                  <div key={index}>
                    <Product product={product} />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewProducts;
