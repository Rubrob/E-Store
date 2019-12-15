// export const colors = {
//   'black': '#000',
//   'blue': '#347',
//   'brown': '#421',
//   'dark-gray': '#555',
//   'gray': '#777',
//   'green': '#0c0',
//   'red': '#d00',
//   'pink': '#ecb',
//   'purple': '#617',
//   'orange': '#f80',
//   'white': '#fff',
//   'yellow': '#ff0',
// }

export const colors = {
  'black': '#000000',
  'blue': '#0d47a1',
  'brown': '#795548',
  'dark-gray': '#424242',
  'gray': '#757575',
  'green': '#43a047',
  'red': '#d32f2f',
  'pink': '#eeccbb',
  'purple': '#6a1b9a',
  'orange': '#ef6c00',
  'white': '#ffffff',
  'yellow': '#ffeb3b',
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
    slidesPerView: 2,
    spaceBetween: 10,
    centeredSlides: true,
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
      dynamicBullets: true,
    },
    // scrollbar: {
    //   el: ".swiper-scrollbar",
    //   hide: false
    // },
    navigation: {
      nextEl: '.swiper-arrows--next',
      prevEl: '.swiper-arrows--prev'
    },
    breakpoints: {
      1024: {
        freeMode: true,
        slidesPerView: 3,
        centeredSlides: false,
      },
      960: {
        freeMode: true,
        slidesPerView: 2,
        centeredSlides: true,
      },
      640: {
        freeMode: true,
        slidesPerView: 2,
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
