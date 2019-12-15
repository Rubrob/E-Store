import React from "react";
import "./styles.sass";
import {Button, Typography, Box} from "@material-ui/core";
import {KeyboardArrowLeft, KeyboardArrowRight} from "@material-ui/icons";
import Swiper from "react-id-swiper";
import 'swiper/css/swiper.css'


const HomeSwiper = (props) => {
  const settings = {
    renderPrevButton: () => <Button children={<KeyboardArrowLeft />} className="swiper-arrows--prev" />,
    renderNextButton: () => <Button children={<KeyboardArrowRight />} className="swiper-arrows--next" />,
    ...props.settings
  }

  const renderSlides = () => (
    props.slides.map(({colors}, index) => (
      <img
        key={index}
        src={colors[0].preview}
        alt="img"
      />
    ))
  )

  return (
    <div className="customSwiper">
      <Box mb={5}>
        <Typography
          variant="h4"
          align="center"
          >
          {props.title}
        </Typography>
      </Box>
      <div className="customSwipe-slider">
        <Swiper {...settings}>
          {renderSlides()}
        </Swiper>
      </div>
    </div>
  )
}

export default HomeSwiper
