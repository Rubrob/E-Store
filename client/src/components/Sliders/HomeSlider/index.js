import React from "react";
import "./styles.sass";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {Typography, Button} from "@material-ui/core";


const HomeSlider = ({slides, settings}) => {
  const renderSlides = () => (
    slides.map((item, index) => (
      <div key={index} className="Carousel-block">
        <div>
          <img src={item.url} alt="img" />
          <div className="Carousel-block-text">
            <Typography variant="h4" className="Carousel-block-title">
              {item.title}
            </Typography>
            <Button size="large" variant="contained" color="secondary">
              Shop
            </Button>
          </div>
        </div>
      </div>
    ))
  )

  return (
    <Slider {...settings}>
      {renderSlides()}
    </Slider>
  )
}

export default HomeSlider
