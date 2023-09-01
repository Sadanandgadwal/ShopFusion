import { useState } from "react";
import axios from "axios";
import { authStore } from "../store/zustore";

const login = () => {
  const TokenAction = authStore((store) => store.Action);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignin = async (event) => {
    event.preventDefault();
    const response = await axios.post(import.meta.env.VITE_ADMIN_LOGIN, {
      username,
      password,
    });

    // console.log(response.data.token);
    TokenAction(response.data.token);
  };
  return (
    <form className="mt-48 ">
      <div className="text-5xl font-extrabold mb-4">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
          Admin Login
        </span>
      </div>
      <div className="mb-6 ">
        <label
          for="username"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Username
        </label>
        <input
          type="text"
          id="username"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          required
        />
      </div>

      <div className="mb-6">
        <label
          for="password"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          password
        </label>
        <input
          type="password"
          id="password"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={password}
          placeholder="**************"
          onChange={(event) => setPassword(event.target.value)}
          required
        />
      </div>

      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        onClick={handleSignin}
      >
        Submit
      </button>
    </form>
  );
};

export default login;
