import React from 'react'
import './Carousel.sass'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

export default function({data}) {
  const settings = {
    swipe: false,
    pauseOnHover: false,
    arrows: false,
    autoplay: true,
    speed: 2000,
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  }

  return (
    <Slider {...settings} className='Carousel'>
      {data.map((img, i) => <div key={i} className='Carousel-block'>
        <img src={img.url} alt='img'/>
        <div className='Carousel-block-text'>
          <h1>{img.title}</h1>
          <div>{img.substitle}</div>
        </div>
      </div>)}
    </Slider>
  )
}