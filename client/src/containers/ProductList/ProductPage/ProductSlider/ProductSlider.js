import React, { Component } from 'react'
import './ProductSlider.sass'
import { Button } from '@material-ui/core'
import {
  KeyboardArrowLeft,
  KeyboardArrowRight,
  KeyboardArrowDown,
  KeyboardArrowUp
} from '@material-ui/icons'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

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

  render() {
    const CustomArrow = ({ icon, onClick, classess }) => <Button className={classess} onClick={onClick} children={icon} />

    const settings = {
      className: 'primarySlider',
      dots: false,
      asNavFor: this.state.nav2,
      ref: slider => (this.slider1 = slider),
      adaptiveHeight: true,
      fade: true,
      prevArrow: <CustomArrow icon={<KeyboardArrowLeft />} classess='productslider_arrow-prev' />,
      nextArrow: <CustomArrow icon={<KeyboardArrowRight />} classess='productslider_arrow-next' />
    }

    const settings2 = {
      className: 'secondarySlider',
      dots: false,
      slidesToShow: 5,
      asNavFor: this.state.nav1,
      ref: slider => (this.slider2 = slider),
      prevArrow: <CustomArrow classess='productslider_arrow-prev' icon={<KeyboardArrowUp />}/>,
      nextArrow: <CustomArrow classess='productslider_arrow-next' icon={<KeyboardArrowDown />}/>,
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
      <div className='productslider'>
        <Slider {...settings2} children={this.props.images.map(img => <img src={img} alt='img' />)}/>
        <Slider {...settings} children={this.props.images.map(img => <img src={img} alt='img' />)}/>
      </div>
    )
  }
}

export default ProductSlider