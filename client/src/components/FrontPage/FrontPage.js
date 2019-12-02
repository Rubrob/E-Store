import React from 'react'
import './FrontPage.sass'
import { connect } from 'react-redux'
import Carousel from './Carousel/Carousel'
import CustomSwiper from './CustomSwiper/CustomSwiper'
import BrandSection from './BrandSection/BrandSection'
import NewsSection from './NewsSection/NewsSection'

const FrontPage = ({products}) => {
  const slides = products.filter((_, index) => (index <= 6))
  return (
    <>
      <Carousel />
      <BrandSection />
      <CustomSwiper data={slides} title='NEW ARRIVALS' />
      <NewsSection />
      <CustomSwiper data={slides} title='TRENDING' />
    </>
  )
}

export default connect(state => ({products: state.products.products}), null)(FrontPage)