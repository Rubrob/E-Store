import React, { useState } from 'react'
import './ProductCard.sass'
import { Link } from 'react-router-dom'
import { useMediaQuery } from '@material-ui/core'
import { ampersand } from '../../../utils'

function ProductCard({ product, currency }) {
  const match = useMediaQuery('(max-width: 480px)')
  const { title, price, colors, subcategory, id } = product
  const preview = colors[0].preview
  const quantity = colors.length > 1 ? 'Colors' : 'Color'

  const previews = colors.map(color =>
  <Link key={color.id} to={`/pp/${id}/${color.id}`} className='previewImg'>
    <img
      alt='product'
      src={color.preview}
      onMouseEnter={() => changeImage(color.id, color.preview)} />
  </Link>)

  const [colorID, setColorID] = useState(colors[0].id)
  const [front, setFront] = useState(preview)
  const [slide, setSlide] = useState(0)

  const handleSlide = (type) => {
    if(type === 'next'){
      if(!(slide <= -(colors.length - 3) * 60)){
        setSlide(slide - 180)
      } else {
        setSlide(-(colors.length - 3) * 60)
      }
    }

    if(type === 'prev'){
      if(slide >= -120) {
        setSlide(0)
      } else {
        setSlide(slide + 180)
      }
    }
  }

  const changeImage = (colorID, img) => {
    setColorID(colorID)
    setFront(img)
  }

  return (
    <div className='productCard'>
      <div className='absolute'>

        <Link to={`/pp/${id}/${colorID}`} className='frontImg' children={<img src={front} alt='front'/>} />

        {colors.length > 1 &&
          <div className='previewBox'>
            <div className='previewImgs'>
              <div className='previewSlider' style={{left: slide}} children={previews} />
            </div>
            {colors.length > 3 && <>
              <span className='arrow left' onClick={() => handleSlide('prev')} />
              <span className='arrow right' onClick={() => handleSlide('next')} />
            </>}
          </div>}

        <div className='productInfo'>
          <div className='title'>{title}</div>
          <div>{ampersand(subcategory)}</div>
          <div className='price'>{currency}{price}</div>
          <div className='colors'>
            {colors.map((color, i) => (match && i >= 4) ? null : <span key={color.color} className={`color ${color.color}`} />)}
            <span className='colorsQuantity'>{(match && colors.length >= 4) ? '+ More' : `${colors.length} ${quantity}`}</span>
          </div>
        </div>

      </div>
    </div>
  )
}

export default ProductCard