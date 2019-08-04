import React from 'react'
import './Trending.sass'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

function Trending({ data }) {
  const settings = {
    speed: 400,
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 959.5,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 419.5,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  }

  const TrendingContent = ({ data }) => (
    <div className='Trending-content'>
      <img src={data.img} alt='img'/>
      <div>
        <h4>{data.title}</h4>
        <button>Shop Now</button>
      </div>
    </div>
  )
  const newsTemplate = data.map((item, i) => <TrendingContent key={i} data={item} />)

  return (
    <div className='Trending'>
      <h2>Trending</h2>
      <Slider {...settings}>{data.length > 0 ? newsTemplate : null}</Slider>
    </div>
  )
}

export default Trending