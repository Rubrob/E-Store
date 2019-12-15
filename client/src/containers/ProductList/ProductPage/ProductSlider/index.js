import React, {Component} from "react";
import "./styles.sass";
import {Button} from "@material-ui/core";
import {
  KeyboardArrowLeft,
  KeyboardArrowRight,
  KeyboardArrowDown,
  KeyboardArrowUp
} from "@material-ui/icons";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


class ProductSlider extends Component {
  constructor(props){
    super(props)
    this.state = {
      nav1: null,
      nav2: null,
    };
  }

  componentDidMount() {
    this.setState({
      nav1: this.slider1,
      nav2: this.slider2,
    });
  }

  renderSlides = () => (
    this.props.slides.map((item, index) => (
      <img key={index} src={item} alt="img" />
    ))
  )

  render() {
    const CustomArrow = ({direction, classes, onClick, variant}) => (
      <Button onClick={onClick} className={classes}>
        {direction === "up" ? (
          <KeyboardArrowUp />
        ): direction === "down" ? (
          <KeyboardArrowDown />
        ): direction === "left" ? (
          <KeyboardArrowLeft />
        ) : direction === "right" ? (
          <KeyboardArrowRight />
        ) : null}
      </Button>
    )

    const settings = {
      className: "primarySlider",
      dots: false,
      asNavFor: this.state.nav2,
      ref: slider => (this.slider1 = slider),
      adaptiveHeight: true,
      fade: true,
      prevArrow: <CustomArrow direction="left" classes="productslider_arrow-prev" />,
      nextArrow: <CustomArrow direction="right" classes="productslider_arrow-next" />
    }

    const settings2 = {
      className: "secondarySlider",
      dots: false,
      slidesToShow: 5,
      asNavFor: this.state.nav1,
      ref: slider => (this.slider2 = slider),
      prevArrow: <CustomArrow direction="up" classes="productslider_arrow-prev" />,
      nextArrow: <CustomArrow direction="down" classes="productslider_arrow-next" />,
      vertical: true,
      focusOnSelect: true,
      responsive: [
        {
          breakpoint: 959.5,
          settings: {
            vertical: false,
            swipeToSlide: true
          }
        },
      ]
    }

    return (
      <div className="productslider">
        <Slider {...settings2}>
          {this.renderSlides()}
        </Slider>
        <Slider {...settings}>
          {this.renderSlides()}
        </Slider>
      </div>
    )
  }
}

export default ProductSlider
