import React, { useState, useEffect } from 'react'
import './ProductPage.sass'
import { connect } from 'react-redux'
import { ampersand } from '../../../utils'
import { addToCart } from '../../../reducers/actions/cart'
import ProductSlider from './ProductSlider/ProductSlider'

function ProductPage (props){

  useEffect(() => { window.scrollTo(0, 0) }, [])

  const { pp, cp } = props

  const { addToCart } = props
  const { ids: { colorId, productId }, currency, history } = props
  const { title, price, description, category, gender, subcategory, colors, id } = pp
  const { images, sizes, availability, color } = cp
  const url = props.history.location.pathname

  const [slide, setSlide] = useState(0)
  const [size, setSize] = useState(sizes[0] === 'One Size' ? 'One Size' : 0)

  const subTitle = `${gender}'s ${ampersand(subcategory || '')} ${category === 'shoes' ? category : null}`
  const reset = () => {
    setSlide(0)
    setSize(sizes[0] === 'One Size' ? 'One Size' : 0)
  }

  const add = () => {
    const data = {
      title,
      productId,
      colorId,
      color,
      gender,
      price,
      size,
      sizes,
      qty: 1,
      img: images[0],
      availability,
      url
    }

    addToCart(data)
  }

  const availableColors = colors.map(color =>
    <img
      key={color.id}
      alt='img'
      src={color.preview}
      onClick={() => {
        history.push(`/pp/${id}/${color.id}`)
        reset()
      }} />)

  const availableSizes = sizes.map((item) =>
    <div
      key={item}
      onClick={() => setSize(item)}
      className={`avSizes-size ${size === item ? 'active' : ''}`}
      children={item}
      />)

  const productPageTitle = <>
    <div>
      <h4>{subTitle}</h4>
      <h1>{title}</h1>
    </div>
    <span children={`${currency}${price}`} />
  </>

  return (
    <div className='productPage'>
      <div className='desktopTitle' children={productPageTitle} />
      <div className='productPage-content'>
        <ProductSlider images={images} slide={slide} setSlide={setSlide} />
        <div className='productPage-content-main'>
          <div className='mobileTitle' children={productPageTitle} />
            {!(colors.length <= 1) && <div className='productPage-content-main-colors'>
            <div className='avColors' children={availableColors} />
          </div>}
          <div className='productPage-content-main-sizes'>
            <h4>Select Size</h4>
            <div className={`avSizes ${sizes.length < 2 ? 'onesize' : ''}`} children={availableSizes} />
          </div>
          <button disabled={!size} className='addToCart' onClick={add} children='Add To Cart' />
        </div>
      </div>
      <div className='productDescription'>
        <h4>Description</h4>
        {description}
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  pp: state.products.pp,
  cp: state.products.cp,
  currency: state.products.currency,
  productPage: state.products.productPage,
  products: state.products.products
})
const mapDispatchToProps = dispatch => ({
  addToCart: value => dispatch(addToCart(value)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage)