import React from "react";
import "./styles.sass";
import ReactIdSwiper from "react-id-swiper";
import { Typography, Button } from "@material-ui/core";

const settings = {
  loop: true,
  spaceBetween: 30,
  centeredSlides: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: true
  },
  containerClass: "HomeSlider"
};

const HomeSlider = ({ slides }) => {
  const renderSlides = () =>
    slides.map((item, idx) => (
      <div key={idx} className="HomeSlider-block">
        <div>
          <img src={item.url} alt="img" />
          <div className="HomeSlider-block-text">
            <div>
              <Typography variant="h2" className="HomeSlider-block-title">
                {item.title}
              </Typography>
              <Button size="large" variant="contained" color="default">
                Shop
              </Button>
            </div>
          </div>
        </div>
      </div>
    ));

  return <ReactIdSwiper {...settings}>{renderSlides()}</ReactIdSwiper>;
};

export default HomeSlider;
