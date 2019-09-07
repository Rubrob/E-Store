import React from 'react'
import './Carousel.sass'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { Typography, Button } from '@material-ui/core'

const settings = {
  className: 'Carousel',
  swipe: false,
  pauseOnHover: true,
  arrows: false,
  autoplay: true,
  speed: 2000,
  dots: false,
  slidesToShow: 1,
  adaptiveHeight: true,
  infinite: true,
  centerMode: true,
  centerPadding: '60px',
  responsive: [{
    breakpoint: 959.5,
      settings: {
        centerPadding: '0px'
      }
  }]
}

const carouselData = [
  { url: '../images/slide_1.jpg', title: 'THE BEST CHOICE' },
  { url: '../images/slide_2.jpg', title: 'THE BEST BIKE GEAR TO BUY THIS SPRING' },
  { url: '../images/slide_3.jpg', title: 'GET A SECOND WIND' }
]

export default (props) => (
  <Slider {...settings}>
    {carouselData.map((img, i) => (
      <div key={i} className='Carousel-block'>
        <div>
          <img src={img.url} alt='img' />
          <div className='Carousel-block-text'>
            <Typography variant='h4' className='Carousel-block-title' children={img.title} />
            <Button size='large' variant='contained' color='secondary' children='Shop' />
          </div>
        </div>
      </div>
    ))}
  </Slider>
)