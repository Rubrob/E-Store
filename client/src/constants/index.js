export const colors = {
  'black': '#000',
  'blue': '#347',
  'brown': '#421',
  'dark-gray': '#555',
  'gray': '#777',
  'green': '#0c0',
  'red': '#d00',
  'pink': '#ecb',
  'purple': '#617',
  'orange': '#f80',
  'white': '#fff',
  'yellow': '#ff0',
}


export const homeSlider = {
  settings: {
    className: 'Carousel',
    swipe: false,
    pauseOnHover: true,
    arrows: false,
    autoplay: true,
    speed: 2000,
    dots: false,
    slidesToShow: 1,
    adaptiveHeight: true,
    infinite: true,
    centerMode: true,
    centerPadding: '60px',
    responsive: [{
      breakpoint: 959.5,
        settings: {
          centerPadding: '0px'
        }
    }]
  },
  slides: [
    {url: '../images/slide_1.jpg', title: 'THE BEST CHOICE'},
    {url: '../images/slide_2.jpg', title: 'THE BEST BIKE GEAR TO BUY THIS SPRING'},
    {url: '../images/slide_3.jpg', title: 'GET A SECOND WIND'}
  ]
}


export const homeSwiper = {
  settings: {
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
}


export const news = [
  {image: '../images/slide_4.jpg', text: 'Shoes made for running high'},
  {image: '../images/slide_5.jpg', text: 'Waterproof features'}
]

export const brands = {
  nike: '../images/nike_brand.png',
  puma: '../images/puma_brand.png',
  adidas: '../images/adidas_brand.png'
}
