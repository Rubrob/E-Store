import React, { Component } from 'react'
import './ProductPage.sass'
import { connect } from 'react-redux'
import { Button, withWidth, Typography } from '@material-ui/core'
import { ampersand } from '../../../utils'
import { addToCart } from '../../../reducers/actions/cart'
import { notify } from './../../../components/Toaster/Toaster'
import ProductSlider from './ProductSlider/ProductSlider'

class ProductPage extends Component {
  constructor(props){
    super(props)
    this.state = {
      size: 0,
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0)
    this.setState({
      size: this.props.cp.sizes[0] === 'One Size' ? 'One Size' : 0,
    });
  }

  render() {

  const { ids: { colorId, productId }, currency, history, addToCart,  pp, cp } = this.props
  const { title, price, description, category, gender, subcategory, colors, id } = pp
  const { images, sizes, availability, color } = cp

  const subTitle = `${gender}'s ${ampersand(subcategory || '')} ${category === 'shoes' ? category : null}`

  const add = () => {
    const data = {
      title,
      productId,
      colorId,
      color,
      gender,
      price,
      size: this.state.size,
      sizes,
      qty: 1,
      img: images[0],
      availability,
      url: history.location.pathname
    }

    addToCart(data)
    notify('success', 'Succesfully added to your cart')
  }

  const availableColors = colors.map(color =>
    <img
      key={color.id}
      alt='img'
      src={color.preview}
      onClick={() => {
        history.push(`/pp/${id}/${color.id}`)
        this.setState({
          size: sizes[0] === 'One Size' ? 'One Size' : 0
        })
      }} />)

  const availableSizes = sizes.map((item) =>
    <div
      key={item}
      onClick={() => this.setState({size: item})}
      className={`avSizes-size ${this.state.size === item ? 'active' : ''}`}
      children={item}
      />)

  const ProductPageTitle = ({classes}) => (
    <div className={`productPage-title ${classes || ''}`}>
      <div>
        <Typography variant='subtitle1' component='h4' children={subTitle} />
        <Typography variant='h4' component='h1' children={title} />
      </div>
      <Typography variant='body1' component='span' children={`${currency}${price}`} />
    </div>
  )

  const productDesctiptionImgs = (count) => {
    return Array.from(Array(count), (_, i) =>
      <div key={i} className={`productDescription-partical p${i + 1}`} style={{ backgroundImage: `url(${images[0]})` }} />
    )
  }

  const match = this.props.width === 'sm' || this.props.width === 'xs'

  return (
    <div className='productPage'>
      <ProductPageTitle classes='desktop' />
      <div className='productPage-content'>
        <ProductSlider images={images}/>
        <div className='productPage-content-main'>
          <ProductPageTitle classes='mobile' />
            {colors.length >= 2 && <div className='productPage-content-main-colors'>
            <div className='avColors' children={availableColors} />
          </div>}
          <div className='productPage-content-main-sizes'>
            <Typography variant='subtitle1' component='h4' paragraph children={'Select Size'} />
            <div className={`avSizes ${sizes.length < 2 ? 'onesize' : ''}`} children={availableSizes} />
          </div>
          <Button
            variant='contained'
            fullWidth
            disabled={!this.state.size}
            className='addToCart'
            onClick={add}
            children='Add To Cart' />
        </div>
      </div>
      <div className='productDescription'>
        {match ? <Typography variant='body1' component='div' children={description} /> : null}
        <div class='productDescription-desktop'>
          <div className='productDescription-photo'>
            {productDesctiptionImgs(4)}
          </div>
            <Typography
              className='productDescription-desktop-title'
              variant='h3'
              align='right'
              paragraph
              component='div'
              children={title} />
            <Typography
              className='productDescription-desktop-body'
              variant='body1'
              component='div'
              children={description} />
        </div>
      </div>

    </div>
  )
  }
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

export default connect(mapStateToProps, mapDispatchToProps)(withWidth()(ProductPage))