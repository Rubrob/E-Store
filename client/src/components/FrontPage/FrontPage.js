import React from 'react'
import Carousel from './Carousel/Carousel'
import Trending from './Trending/Trending'

const carouselData = [{
    url: '/images/slide-1.jpg',
    title: 'PULL OUT ALL THE STOPS',
    substitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
  },{
    url: '/images/slide-2.jpg',
    title: 'CALL THE SHOTS',
    substitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
  },{
    url: '/images/slide-3.jpg',
    title: 'BE A FRONT RUNNER',
    substitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
  },{
    url: '/images/slide-4.jpg',
    title: 'GET INTO THE FULL SWING',
    substitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
  },{
    url: '/images/slide-5.jpg',
    title: 'GET A SECOND WIND',
    substitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
  },{
    url: '/images/slide-6.jpg',
    title: 'STAY AHEAD OF THE GAME',
    substitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
}]
const trendingData = [
  { title: 'Pureboost Go Shoes', img: '/images/trending/t_1.jpg' },
  { title: 'Duramo 9 Shoes', img: '/images/trending/t_2.jpg' },
  { title: '3-Stripes Leggings', img: '/images/trending/t_3.jpg' },
  { title: 'Badge Of Sport Classic Tee', img: '/images/trending/t_4.jpg' },
  { title: 'SST Track Pants', img: '/images/trending/t_5.jpg' },
  { title: 'Falcon Shoes', img: '/images/trending/t_6.jpg'}
]

function FrontPage() {
  return (
    <>
      <Carousel data={carouselData} />
      <Trending data={trendingData} />
    </>
  )
}

export default FrontPage