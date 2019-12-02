import React from 'react'
import './CustomSwiper.sass'
import { Button, Typography, Box } from '@material-ui/core'
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons'
import Swiper from 'react-id-swiper'
import 'react-id-swiper/lib/styles/scss/swiper.scss'
import 'react-id-swiper/lib/styles/css/swiper.css'


const Trending = ({
  data,
  title,
}) => {
  const settings = {
    freeMode: true,
    slidesPerView: 3,
    spaceBetween: 10,
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
      dynamicBullets: true,
    },
    navigation: {
      nextEl: '.swiper-arrows--next',
      prevEl: '.swiper-arrows--prev'
    },
    renderPrevButton: () => <Button children={<KeyboardArrowLeft />} className='swiper-arrows--prev' />,
    renderNextButton: () => <Button children={<KeyboardArrowRight />} className='swiper-arrows--next' />,
    breakpoints: {
      1024: {
        centeredSlides: false,
        freeMode: true,
      },
      959.5: {
        slidesPerView: 3,
        centeredSlides: true,
        freeMode: true,
      },
      640: {
        slidesPerView: 2,
        freeMode: true,
        centeredSlides: true,
      },
    }
  }

  const images = data.map(({colors}, i) => <img key={i} src={colors[0].preview} alt='img' />)

  return (
    <div className='customSwiper'>
      <Box mb={5}>
        <Typography variant='h4' component='h2' align='center' children={title} />
      </Box>
      <div className='customSwipe-slider'>
        <Swiper {...settings} children={images} />
      </div>
    </div>
  )
}

export default Trending
