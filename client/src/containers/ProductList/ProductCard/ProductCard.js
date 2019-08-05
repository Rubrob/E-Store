import React, { useState } from 'react'
import './ProductCard.sass'
import { Link } from 'react-router-dom'
import { useMediaQuery } from '@material-ui/core'
import { ampersand } from '../../../utils'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons'

function ProductCard({ product, currency }) {

  const match = useMediaQuery('(max-width: 480px)')
  const { title, price, colors, subcategory, id, gender } = product
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
    const slidesCount = colors.length
    const slideWidth = 60
    const slidesToShow = 3
    switch(type){
      case 'next':
        if(slide <= -(slidesCount - (slidesCount % slidesToShow)) * slideWidth){
          setSlide(-(slidesCount - (slidesCount % slidesToShow)) * slideWidth)
          console.log(-(slidesCount * slideWidth) - 180)
          console.log(-(slidesCount - slidesToShow) * slideWidth)
          console.log(-(slidesCount + 1) * slideWidth, (slidesCount % slidesToShow), slidesCount)
        } else {
          setSlide(slide - 180)
        }
        break;

      case 'prev':
        if(slide >= -(slidesToShow-1) * slideWidth) {
          setSlide(0)
        } else {
          setSlide(slide + (slideWidth * slidesToShow))
        }
        break;
        default:
          break;
      }
  }

  const changeImage = (colorID, img) => {
    setColorID(colorID)
    setFront(img)
  }

  return (
    <div className='productCard'>
        <Link to={`/pp/${id}/${colorID}`} className='frontImg' children={<img src={front} alt='img'/>} />

        {colors.length > 1 &&
          <div className='previewBox'>
            <div className='previewImgs'>
              <div className='previewSlider' style={{left: slide}} children={previews} />
            </div>
            {colors.length > 3 && <>
              <span
                className='arrow left'
                onClick={() => handleSlide('prev')}
                children={<KeyboardArrowLeft />}/>
              <span
                className='arrow right'
                onClick={() => handleSlide('next')}
                children={<KeyboardArrowRight />}/>
            </>}
          </div>}

        <div className='productInfo'>
          <div className='title'>{title}</div>
          <div>{`${gender}'s`}{ampersand(subcategory)}</div>
          <div className='price'>{currency}{price}</div>
          <div className='colors'>
            {colors.map((color, i) => (match && i >= 4) ? null : <span key={color.color} className={`color ${color.color}`} />)}
            <span className='colorsQuantity'>{(match && colors.length >= 4) ? '+ More' : `${colors.length} ${quantity}`}</span>
          </div>
        </div>
    </div>
  )
}

export default ProductCard