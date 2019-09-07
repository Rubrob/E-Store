import React from 'react'
import './FrontPage.sass'
import { connect } from 'react-redux'
import Carousel from './Carousel/Carousel'
import CustomSwiper from './CustomSwiper/CustomSwiper'
import BrandSection from './BrandSection/BrandSection'
import NewsSection from './NewsSection/NewsSection'

const FrontPage = ({products}) => {
  const swiperData = products.filter((item, index) => (index <= 6))
  return (
    <>
      <Carousel />
      <BrandSection />
      <CustomSwiper data={swiperData} title='NEW ARRIVALS' />
      <NewsSection />
      <CustomSwiper data={swiperData} title='TRENDING' />
    </>
  )
}

export default connect(state => ({products: state.products.products}), null)(FrontPage)