import React from "react";
import "./styles.sass";
import { Button, Typography, Box } from "@material-ui/core";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@material-ui/icons";
import Swiper from "react-id-swiper";
// import 'swiper/css/swiper.css'

const swiperSettings = {
  freeMode: true,
  slidesPerView: 2,
  spaceBetween: 10,
  centeredSlides: false,
  pagination: {
    el: ".swiper-pagination",
    type: "bullets",
    clickable: true,
    dynamicBullets: true
  },
  // scrollbar: {
  //   el: ".swiper-scrollbar",
  //   hide: false
  // },
  navigation: {
    nextEl: ".swiper-arrows--next",
    prevEl: ".swiper-arrows--prev"
  },
  breakpoints: {
    1024: {
      freeMode: true,
      slidesPerView: 3,
      centeredSlides: false
    },
    960: {
      freeMode: true,
      slidesPerView: 2,
      centeredSlides: false
    }
  }
};

const HomeSwiper = props => {
  const settings = {
    renderPrevButton: () => (
      <Button
        children={<KeyboardArrowLeft />}
        className="swiper-arrows--prev"
      />
    ),
    renderNextButton: () => (
      <Button
        children={<KeyboardArrowRight />}
        className="swiper-arrows--next"
      />
    ),
    ...swiperSettings
  };

  const renderSlides = () =>
    props.slides.map((slide, idx) => <img key={idx} src={slide} alt="img" />);

  return (
    <div className="customSwiper">
      <Box mb={5}>
        <Typography variant="h4" align="center">
          {props.title}
        </Typography>
      </Box>
      <div className="customSwipe-slider">
        <Swiper {...settings}>{renderSlides()}</Swiper>
      </div>
    </div>
  );
};

export default HomeSwiper;
