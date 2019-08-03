import React from 'react'
import './FrontPage.sass'
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
    title: 'FRONT RUNNER',
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
const trendingData = [{
    image: 'https://assets.adidas.com/images/w_840,h_840,f_auto,q_auto:sensitive,fl_lossy/87b00aee8aca459e957da9a401151c48_9366/Pureboost_Go_Shoes_Pink_B75824_01_standard.jpg',
    title: 'Pureboost Go Shoes',
    img: '/images/trending/t-1.jpg'
  }, {
    image:'https://assets.adidas.com/images/w_840,h_840,f_auto,q_auto:sensitive,fl_lossy/88d8aa4376d542bfb2b7a90300cce61f_9366/Duramo_9_Shoes_Grey_F35278_01_standard.jpg',
    title: 'Duramo 9 Shoes',
    img: '/images/trending/t-2.jpg'
  }, {
    image: 'https://assets.adidas.com/images/w_840,h_840,f_auto,q_auto:sensitive,fl_lossy/a2d1c1e5d6a24487bc96a827015fc456_9366/3_Stripes_Leggings_Black_CE2441_21_model.jpg',
    title: '3-Stripes Leggings',
    img: '/images/trending/t-3.jpg'
  }, {
    image: 'https://assets.adidas.com/images/w_840,h_840,f_auto,q_auto:sensitive,fl_lossy/269d0eb81dd34536b0f7a7940140d3cc_9366/Badge_of_Sport_Classic_Tee_Black_CE2615_21_model.jpg',
    title: 'Badge Of Sport Classic Tee',
    img: '/images/trending/t-4.jpg'
  }, {
    image: 'https://assets.adidas.com/images/w_840,h_840,f_auto,q_auto:sensitive,fl_lossy/188c6437f3e84f20ba20a87900f025bc_9366/SST_Track_Pants_Black_CE2400_21_model.jpg',
    title: 'SST Track Pants',
    img: '/images/trending/t-5.jpg'
  }, {
    image: 'https://assets.adidas.com/images/w_840,h_840,f_auto,q_auto:sensitive,fl_lossy/323bfe0b3a864135a9faaa1f00ed94a9_9366/Falcon_Shoes_Black_EG7653_01_standard.jpg',
    title: 'Falcon Shoes',
    img: '/images/trending/t-6.jpg'
}]

function FrontPage() {
  return (
    <div>
      <Carousel data={carouselData} />
      <Trending data={trendingData} />
    </div>
  )
}

export default FrontPage