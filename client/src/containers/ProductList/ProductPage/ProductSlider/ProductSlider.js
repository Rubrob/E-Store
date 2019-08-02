import React from 'react'
import './ProductSlider.sass'

function ProductSlider({ images, slide, setSlide }) {
  const slideHandle = (type) => {
    if(type === 'prev'){
      if(slide <= 0) setSlide(images.length - 1)
      else setSlide(slide - 1)
    }

    if(type === 'next'){
      if(slide >= images.length - 1) setSlide(0)
      else setSlide(slide + 1)
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
      <div className='productSlider-primary' children={<img src={images[slide]} alt='img' />} />
      <div className='productSlider-arrow --left' onClick={() => slideHandle('prev')} />
      <div className='productSlider-arrow --right' onClick={() => slideHandle('next')} />
    </div>
  )
}

export default ProductSlider