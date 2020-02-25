import React from "react";
import "./styles.sass";
import Carousel from "components/Sliders/HomeSlider";
import CustomSwiper from "components/Sliders/HomeSwiper";
import BrandSection from "./BrandSection";
import NewsSection from "./NewsSection";
import { homeSliderSlides, news, brands, slides } from "constants/index";

const HomePage = () => {
  return (
    <div className="HomePage">
      <Carousel slides={homeSliderSlides} />
      <BrandSection brands={brands} />
      <CustomSwiper title="NEW ARRIVALS" slides={slides} />
      <NewsSection news={news} />
      <CustomSwiper title="TRENDING" slides={slides} />
    </div>
  );
};

export default HomePage;
