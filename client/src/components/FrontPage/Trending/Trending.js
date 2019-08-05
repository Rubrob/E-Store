import React from 'react'
import './Trending.sass'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons'

function Trending({ data }) {
  const settings = {
    speed: 400,
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    lazyLoad: true,
    centerMode: true,
    prevArrow: <SamplePrevArrow />,
    nextArrow: <SampleNextArrow />,
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

  function SamplePrevArrow({ className, style, onClick }) {
    return (
      <span
        className={'trendingarrow prev'}
        onClick={onClick}
        children={<KeyboardArrowLeft />}
        />
    );
  }
  function SampleNextArrow({ className, style, onClick }) {
    return (
      <div
        className={'trendingarrow next'}
        onClick={onClick}
        children={<KeyboardArrowRight />}
        />
    );

  }
  const TrendingContent = ({ data }) => (
    <div className='Trending-content' style={{backgroundImage: `url(${data.img})`}}>
      <img src={data.img} alt='img' />
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