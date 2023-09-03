import axios from "axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { produce } from "immer";
import { notify } from "../utils/notification";
export const userStore = create(
  persist(
    (set) => ({
      user: "",
      setUserData: (val) => set((state) => ({ user: val })),
    }),
    { name: "user" }
  )
);

export const usecartStore = create(
  persist(
    (set, get) => ({
      cart: [],
      loading: false,

      AddtoCart: (val) => {
        const cart = get().cart;

        const isPresent = cart.some((item) => {
          return item.productId === val.productId;
        });

        if (isPresent) {
          return notify.error("product already in cart");
        }

        set(
          produce((store) => {
            store.cart.push(val);
          })
        );
        return notify.sucess("Product Added Successfully to Cart");
      },
      removeCart: (id) => {
        set((state) => ({
          cart: state.cart.filter((item) => id !== item.productId),
        }));
      },
    }),

    { name: "cart" }
  )
);

export const usewishListStore = create(
  persist(
    (set, get) => ({
      Wishlist: [],
      loading: false,

      AddtoWishlist: (val) => {
        const Wishlist = get().Wishlist;

        const isPresent = Wishlist.some((item) => {
          return item.productId === val.productId;
        });

        if (isPresent) {
          return notify.error("product already in Wishlist");
        }

        set(
          produce((store) => {
            store.Wishlist.push(val);
          })
        );
        notify.sucess("Product Added Successfully to WishList");
      },
      removeWishlist: (id) => {
        set((state) => ({
          Wishlist: state.Wishlist.filter((item) => id !== item.productId),
        }));
      },
    }),

    { name: "Wishlist" }
  )
);

export const authStore = create(
  persist(
    (set) => ({
      token: "",
      TokenAction: (val) => set((state) => ({ token: val })),
    }),
    { name: "token" }
  )
);

const productStore = (set) => ({
  Category: [],
  products: [],
  product: {},
  loading: false,
  GetCategories: async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_GET_CATEGORIES);

      if (response.status === 200) {
        set((store) => (store.Category = response.data));
      }
    } catch (error) {
      console.log(err.message);
    }
  },
  getProducts: async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_PRODUCTS);
      if (response.status === 200) {
        set((store) => (store.products = response.data));
      }
    } catch (error) {
      console.log(err.message);
    }
  },
  getProduct: async (id) => {
    set((state) => ({ loading: !state.loading }));
    try {
      const response = await axios.get(
        import.meta.env.VITE_PRODUCTS + `/${id}`
      );
      if (response.status === 200) {
        set((store) => (store.product = response.data));
      }
      set((state) => ({ loading: !state.loading }));
    } catch (error) {
      console.log(err.message);
    }
  },
});

export const useProductStore = create(productStore);

// usecartStore , cart variable with Array,sum of subtotal
