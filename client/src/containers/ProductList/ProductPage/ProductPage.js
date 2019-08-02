import React, { useState, useEffect } from 'react'
import './ProductPage.sass'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { ampersand } from '../../../utils'
import { getProductPage } from '../../../reducers/actions/products'
import { addToCart } from '../../../reducers/actions/cart'
import ProductSlider from './ProductSlider/ProductSlider'

function ProductPage (props){

  useEffect(() => { window.scrollTo(0, 0) }, [])

  const { pp, addToCart } = props
  const { match: { params: { colorId } }, currency } = props

  const { title, price, description, category, gender, subcategory, colors, id } = pp
  const currItem = colors.filter(item => colorId === item.id)[0] || []
  const { images = [], sizes = [], availability = 1 } = currItem

  const [slide, setSlide] = useState(0)
  const [size, setSize] = useState(sizes[0] === "One Size" ? "One Size" : 0)

  const resetPage = () => {
    setSize(sizes[0] === "One Size" ? "One Size" : 0)
    setSlide(0)
  }

  const add = () => {
    addToCart({
      title,
      productId: id,
      colorId,
      color: currItem.color,
      gender,
      price,
      size,
      sizes,
      qty: 1,
      img: images[0],
      availability,
      url: window.location.pathname,
      currency,
    })
  }

  const availableColors = colors.map(color =>
    <Link
      key={color.id}
      to={`/pp/${id}/${color.id}`}
      onClick={resetPage}
      children={<img src={color.preview} alt='img' />} />)

  const availableSizes = sizes.map((item) =>
    <div
      key={item}
      onClick={() => setSize(item)}
      className={`availableSizes-size ${size === item ? 'active' : ''}`}
      children={item}
      />)

  const productPageTitle = <>
    <div>
      <h4>{`${gender}'s`} {ampersand(subcategory)} {category === 'shoes' && category}</h4>
      <h1 children={title} />
    </div>
    <span children={`${currency}${price}`} />
  </>

  return (
    <div className='productPage'>
      <div className='desktopTitle' children={productPageTitle} />
      <div className='productPage-content'>
        <ProductSlider images={images} slide={slide} setSlide={setSlide}/>
        <div className='productPage-content-main'>
          <div className='mobileTitle' children={productPageTitle} />
            {!(colors.length <= 1) && <div className='productPage-content-main-colors'>
            <div className='availableColors' children={availableColors} />
          </div>}
          <div className='productPage-content-main-sizes'>
            <h4>Select Size</h4>
            <div className={`availableSizes ${sizes.length < 2 ? 'onesize' : ''}`} children={availableSizes} />
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

const mapStateToProps = (state, ownProps) => ({
  pp: getProductPage(ownProps.match.params.productId, state.products.products),
  currency: state.products.currency
})
const mapDispatchToProps = dispatch => ({
  addToCart: value => dispatch(addToCart(value))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage)