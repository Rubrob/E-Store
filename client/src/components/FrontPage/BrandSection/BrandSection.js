import React from 'react'
import './BrandSection.sass'
import { Typography } from '@material-ui/core';

const BrandSection = (props) => (
  <div className='brand_container'>
    <Typography variant='h4' component='h2' align='center' children='OUR BRANDS' />
    <div className='brand_wrapper'>
      <img src={'../images/nike_brand.png'} alt='img' className='brand' />
      <img src={'../images/puma_brand.png'} alt='img' className='brand' />
      <img src={'../images/adidas_brand.png'} alt='img' className='brand' />
    </div>
  </div>
)

export default BrandSection
