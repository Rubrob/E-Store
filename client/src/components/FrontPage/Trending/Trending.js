import React from 'react'
import './Trending.sass'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { useMediaQuery } from '@material-ui/core'

function Trending({data}) {
  const sm = useMediaQuery('(max-width:419.5px)')
  const md = useMediaQuery('(max-width:959.5px)')
  const settings = {
    speed: 400,
    dots: true,
    infinite: true,
    slidesToShow: sm ? 1 : md ? 2 : 3,
    slidesToScroll: sm ? 1 : md ? 2 : 3,
  }

  const Content = ({data}) => (
    <div className='Trending-content'>
      <img src={data.img} alt='img'/>
      <div>
        <h4>{data.title}</h4>
        <span>Shop Now</span>
      </div>
    </div>
  )
  const newsTemplate = data.length > 0 ? data.map((item, index) => <Content key={index} data={item} />) : null

  return (
    <div className='Trending'>
      <h2>Trending</h2>
      <Slider {...settings}>{newsTemplate}</Slider>
    </div>
  )
}

export default Trending