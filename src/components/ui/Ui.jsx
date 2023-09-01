import React from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";

const Ui = ({ children }) => {
  return (
    <>
      <Navbar />

      {children}
      <Footer />
    </>
  );
};

export default Ui;
