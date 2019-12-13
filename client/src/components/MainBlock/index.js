import React from "react";
import Toaster from "../Toaster";
import ScrollToTop from "../ScrollToTop";
import Header from "../Header";
import Footer from "../Footer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MainBlock = (props) => {
  return (
    <div>
      <Toaster />
      <ScrollToTop />
      <Header />
      <div>
        {props.children}
      </div>
      <Footer isCartLocation={props.isCartLocation} />
    </div>
  )
}

export default MainBlock
