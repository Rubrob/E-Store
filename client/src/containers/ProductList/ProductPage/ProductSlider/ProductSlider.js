import React from 'react'
import './ProductSlider.sass'
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons'

function ProductSlider({ images, slide, setSlide }) {
  const slideHandle = (type) => {
    switch(type){
      case 'prev':
        if(slide <= 0) setSlide(images.length - 1)
        else setSlide(slide - 1)
        break

      case 'next':
        if(slide >= images.length - 1) setSlide(0)
        else setSlide(slide + 1)
        break
      default:
        break
    }
  }

  return (
    <div className='productSlider'>
      <div className='productSlider-slides'>
        {images.map((img, i) =>
          <div
            key={i}
            onClick={() => setSlide(i)}
            className={`slide ${slide === i ? 'active' : ''}`}
            children={<img src={img} alt='img' />}
            />)}
      </div>
      <div className='productSlider-primary' >
        <img src={images[slide]} alt='img' />
        <div
          className='productSlider-arrow --left'
          onClick={() => slideHandle('prev')}
          children={<KeyboardArrowLeft />}/>
        <div
          className='productSlider-arrow --right'
          onClick={() => slideHandle('next')}
          children={<KeyboardArrowRight />} />
      </div>
    </div>
  )
}

export default ProductSlider