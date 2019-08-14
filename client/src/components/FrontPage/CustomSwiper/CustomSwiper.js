import React from 'react'
import './CustomSwiper.sass'
import { Button, Typography, withStyles } from '@material-ui/core'
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons'
import Swiper from 'react-id-swiper'
import 'react-id-swiper/lib/styles/scss/swiper.scss'
import 'react-id-swiper/lib/styles/css/swiper.css'

const CustomTypography = withStyles(() => ({
  root: {
    marginBottom: 40
  }
}))(Typography)

function Trending({ data, title }) {

  const CustomArrow = ({ icon, onClick, classes }) => <Button className={classes} onClick={onClick} children={icon} />

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
    renderPrevButton: () => <CustomArrow icon={<KeyboardArrowLeft />} classes='swiper-arrows--prev' />,
    renderNextButton: () => <CustomArrow icon={<KeyboardArrowRight />} classes='swiper-arrows--next' />,
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

  const images = data.map((item, i) => <img key={i} src={item.img} alt='img' />)

  return (
    <div className='customSwiper'>
      <CustomTypography variant='h4' component='h2' align='center' children={title} />
      <div className='customSwipe-slider'>
        <Swiper {...settings} children={images} />
      </div>
    </div>
  )
}

export default Trending