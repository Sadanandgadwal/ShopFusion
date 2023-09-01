import { Link } from "react-router-dom";
import { useProductStore } from "../store/zustore";
import { useEffect } from "react";

export default function Category() {
  const categories = useProductStore((store) => store.Category);
  const getCategory = useProductStore((store) => store.GetCategories);

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <div className="items-center justify-center   md:flex md:w-auto md:order-1 text-center">
      <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        {categories &&
          categories.map((category, index) => (
            <li key={index}>
              <Link
                to={category}
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                {category}
              </Link>
            </li>
          ))}
      </ul>{" "}
    </div>
  );
}
