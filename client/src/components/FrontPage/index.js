import React from "react";
import "./styles.sass";
import {connect} from "react-redux";
import Carousel from "../Sliders/HomeSlider";
import CustomSwiper from "../Sliders/HomeSwiper";
import BrandSection from "./BrandSection";
import NewsSection from "./NewsSection";
import {homeSlider, homeSwiper, news, brands} from "constants/index";


const HomePage = ({products}) => {
  const slides = products.filter((_, index) => (index <= 6))
  return (
    <>
      <Carousel
        slides={homeSlider.slides}
        settings={homeSlider.settings}
      />
      <BrandSection brands={brands} />
      <CustomSwiper
        title="NEW ARRIVALS"
        slides={slides}
        settings={homeSwiper.settings}
      />
      <NewsSection news={news} />
      <CustomSwiper
        title="TRENDING"
        slides={slides}
        settings={homeSwiper.settings}
      />
    </>
  )
}

export default connect(
  ({products}) => ({products: products.products}),
  null
)(HomePage)
