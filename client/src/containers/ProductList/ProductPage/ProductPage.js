import React, { Component } from 'react'
import './ProductPage.sass'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withWidth, Typography, Avatar, Fab } from '@material-ui/core'
import { renderTitle } from '../../../utils'
import { addToCart } from '../../../actions/cart'
import { getCurrentProduct } from '../../../actions/products'
import { notify } from './../../../components/Toaster/Toaster'
import ProductSlider from './ProductSlider/ProductSlider'
import cx from 'classnames'


class ProductPage extends Component {
  constructor(props){
    super(props)
    this.state = {
      size: 0,
    };
  }

  componentDidMount() {
    this.props.getCurrentProduct(this.props.match.params)
    this.setState({
      size: this.props.currentPage.sizes[0] === 'One Size' ? 'One Size' : 0,
    });
  }

  render() {
    const {
      match: {
        params: {colorId, productId},
      },
      currency,
      history,
      addToCart,
      currentPage
    } = this.props
    const {
      title,
      price,
      description,
      category,
      gender,
      subcategory,
      colors,
      images,
      sizes,
      availability,
      color
    } = currentPage

    const subTitle = renderTitle({gender, subcategory, category})
    const match = this.props.width === 'sm' || this.props.width === 'xs'

    const add = () => {
      const data = {
        title,
        color,
        gender,
        price,
        sizes,
        availability,
        productId,
        colorId,
        size: this.state.size,
        qty: 1,
        img: images[0],
        url: history.location.pathname
      }

      addToCart(data)
      notify('success', 'Succesfully added to your cart')
    }

    const setSize = (newSize) => this.setState({size: newSize})

    const changeColor = (productId, colorId) => {
      history.push(`/pp/${productId}/${colorId}`)
      this.props.getCurrentProduct({productId, colorId})
      setSize(sizes[0] === 'One Size' ? 'One Size' : 0)
    }

    const availableColors = colors.map((color) => (
      <Avatar
        key={color.id}
        src={color.preview}
        variant="square"
        component='div'
        onClick={() => changeColor(productId, color.id)}
      />
    ))

    const availableSizes = sizes.map((item) => (
      <div
        key={item}
        onClick={() => setSize(item)}
        className={cx(
          'avSizes-size', {
            active: this.state.size === item
          }
        )}
        children={item}
      />
    ))

    const ProductPageTitle = ({classes}) => (
      <div className={`productPage-title ${classes || ''}`}>
        <div>
          <Typography variant='subtitle1' component='h4' children={subTitle} />
          <Typography variant='h4' component='h1' children={title} />
        </div>
        <Typography component='span'>
          {currency}{price}
        </Typography>
      </div>
    )

    const productDesctiptionImgs = (count) => (
      Array.from(Array(count), (_, i) => (
        <div
          key={i}
          className={`productDescription-partical p${++i}`}
          style={{ backgroundImage: `url(${images[0]})` }}
        />
      ))
    )

    const showColors = colors.length >= 2 && (
      <div className='productPage-content-main-colors'>
        <div className='avColors' children={availableColors} />
      </div>
    )

    return (
      <div className='productPage'>
        <ProductPageTitle classes='desktop' />
        <div className='productPage-content'>
          <ProductSlider images={images}/>
          <div className='productPage-content-main'>
            <ProductPageTitle classes='mobile' />
            {showColors}
            <div className='productPage-content-main-sizes'>
              <Typography variant='subtitle1' component='h4' paragraph>
                Select Size
              </Typography>
              <div className={cx('avSizes', {onesize: sizes.length < 2})} children={availableSizes} />
            </div>
            <Fab
              variant="extended"
              disabled={!this.state.size}
              className='addToCart'
              onClick={add}
              children='Add To Cart'
            />
          </div>
        </div>
        <div className='productDescription'>
          <div>
            {match ? <Typography children={description} /> : null}
          </div>
          <div className='productDescription-desktop'>
            <div className='productDescription-photo'>
              {productDesctiptionImgs(4)}
            </div>
              <Typography
                className='productDescription-desktop-title'
                variant='h3'
                align='right'
                paragraph
                component='div'
                children={title}
              />
              <Typography
                className='productDescription-desktop-body'
                component='div'
                children={description}
              />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  currentPage: state.products.currentPage,
  currency: state.products.currency,
  products: state.products.products
})
const mapDispatchToProps = (dispatch) => ({
  addToCart: value => dispatch(addToCart(value)),
  getCurrentProduct: (value) => dispatch(getCurrentProduct(value))
})

export default compose(
  withWidth(),
  connect(mapStateToProps, mapDispatchToProps)
)(ProductPage)