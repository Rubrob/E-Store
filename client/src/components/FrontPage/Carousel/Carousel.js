import React from 'react'
import './Carousel.sass'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { Typography, makeStyles, Button } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';

const CarouselTitle = withStyles(() => ({
  root: {
    marginBottom: 10,
    '@media (max-width: 959.5px)': {
       fontSize: 34,
       marginBottom: 5
    }
  }
}))(Typography)

export default function({data}) {

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

  return (
    <Slider {...settings}>
      {data.map((img, i) => <div key={i} className='Carousel-block'>
        <div>
          <img src={img.url} alt='img' />
          <div className='Carousel-block-text'>
            <CarouselTitle variant='h4' component='h2' children={img.title} />
            <Button children={'Shop'} size="large" color="inherit" fullWidth={false}/>
          </div>
        </div>
      </div>)}
    </Slider>
  )
}