import React from 'react'
import './FrontPage.sass'
import { Typography } from '@material-ui/core'
import { Button, withStyles } from '@material-ui/core'
import Carousel from './Carousel/Carousel'
import CustomSwiper from './CustomSwiper/CustomSwiper'

const CustomTypography = withStyles(() => ({
  root: {
    marginBottom: 40
  }
}))(Typography)

const carouselData = [
  { url: '/images/cslide_2.jpg', title: 'THE BEST CHOISE' },
  { url: '/images/cslide_4.jpg', title: 'THE BEST BIKE GEAR TO BUY THiS SPRING' },
  { url: '/images/cslide_5.jpg', title: 'GET A SECOND WIND' }
]

const swiperData = [
  { title: 'Pureboost Go Shoes', img: '/images/trending/t_1.jpg' },
  { title: 'Duramo 9 Shoes', img: '/images/trending/t_2.jpg' },
  { title: '3-Stripes Leggings', img: '/images/trending/t_3.jpg' },
  { title: 'Badge Of Sport Classic Tee', img: '/images/trending/t_4.jpg' },
  { title: 'SST Track Pants', img: '/images/trending/t_5.jpg' },
  { title: 'Falcon Shoes', img: '/images/trending/t_6.jpg'}
]

function FrontPage() {

  const News = ({img, text}) => (
    <div>
      <img src={img} alt='img' />
      <div className='news-cont'>
        <p>{text}</p>
        <Button color='inherit' children={'Shop'} />
      </div>
    </div>
  )

  return (
    <>
      <Carousel data={carouselData} />
      <div>
        <div className='brand_container'>
          <Typography variant='h4' component='h2' align='center' children='OUR BRANDS' />
          <div className='brand_wrapper'>
            <img src={'/images/nike_brand.png'} alt='img' className='brand' />
            <img src={'/images/puma_brand.png'} alt='img' className='brand' />
            <img src={'/images/adidas_brand.png'} alt='img' className='brand' />
          </div>
        </div>
      </div>

      <CustomSwiper data={swiperData} title='NEW ARRIVALS' />

      <div className='news'>
        <CustomTypography variant='h4' component='h2' align='center' children='STORE NEWS' />
        <div>
          <News img={'images/cslide_7.jpg'} text={'Shoes made for running high'} />
          <News img={'images/cslide_8.jpg'} text={'Waterproof features'} />
        </div>
      </div>

      <CustomSwiper data={swiperData} title='TRENDING' />
    </>
  )
}

export default FrontPage