import React from "react";
import { Routes, Route } from "react-router-dom";
import Ui from "../components/ui/Ui";
import ViewProducts from "../components/ViewProducts";
import PostProducts from "../admin/PostProducts";
// import Adminlogin from "../admin/login";
import { useAuth0 } from "@auth0/auth0-react";
import Homepage from "../pages/Homepage";
import Productdetail from "../components/Productdetail";

import Thankyou from "../components/Thankyou";
import ShoppingCart1 from "../components/ShoppingCart1";
import Contact from "../components/Contact";
import Wishlist from "../components/Wishlist";
// import Stripe from "../stripepayment/Stripe";

const AppRoutes = () => {
  const { user, getIdTokenClaims } = useAuth0();
  // console.log(user);
  (async () => {
    // console.log(await getIdTokenClaims());
  })();

  return (
    <Ui>
      <Routes>
        <Route path="/" element={<ViewProducts />} />
        <Route path="/add" element={<PostProducts />} />
        <Route path="/Home" element={<Homepage />} />
        <Route path="/Productdetail/:id" element={<Productdetail />} />
        <Route path="/Wishlist" element={<Wishlist />} />
        <Route path="/ShoppingCart1" element={<ShoppingCart1 />} />
        <Route path="/Thankyou" element={<Thankyou />} />
        <Route path="/Contact" element={<Contact />} />
      </Routes>
    </Ui>
  );
};

export default AppRoutes;
