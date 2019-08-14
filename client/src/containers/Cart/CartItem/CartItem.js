import React from 'react'
import './CartItem.sass'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { arrayFromNumber} from '../../../utils'
import { Typography, IconButton } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { Clear } from '@material-ui/icons'
import {
  changeProductQuantity,
  changeProductSize,
  deleteCartProduct,
} from '../../../reducers/actions/cart'
import CustomSelect from '../CustomSelect/CustomSelect'

const CartItemTitle = withStyles(() => ({
  root: {
    '& a': {
      fontWeight: 600,
      color: '#444',
    }
  }
}))((props) => <Typography variant='body1' component='div' {...props} />)

function CartItem(props) {
  const data = props.cartProducts[props.i]
  const { currency } = props
  const {
    url,
    img,
    title,
    gender,
    color,
    size,
    sizes,
    availability,
    qty,
    price
  } = data

  const { changeProductQuantity, changeProductSize, deleteCartProduct } = props

  const changeQuantity = (data) => changeProductQuantity(data)
  const changeSize = (data) => changeProductSize(data)

  return (
    <div className='ProductToBuy'>
      <div className='ProductToBuy-content'>
        <Link to={url} className='ProductToBuy-content-img' children={<img src={img} alt='img' />} />

        <div className='ProductToBuy-content-data'>
          <CartItemTitle children={<Link to={url} children={title} />}/>
          <Typography variant='body2' component='div' children={`Gender: ${gender}'s`} />
          <Typography variant='body2' component='div' children={`Color: ${color}`} />
          <Typography variant='body2' component='div'>
            Size: <CustomSelect data={sizes} primary={size} onChangeData={data} onChange={changeSize} />
          </Typography>
          <Typography variant='body2' component='div'>
            Quantity: <CustomSelect data={arrayFromNumber(availability)} primary={qty} onChangeData={data} onChange={changeQuantity}/>
          </Typography>
        </div>

        <div className='ProductToBuy-controls'>
          <IconButton
            size='small'
            onClick={() => deleteCartProduct(data)}
            children={<Clear />} />
          <Typography variant='body1' component='div'>{currency}{data.qty * price}</Typography>
        </div>
      </div>

    </div>
  )
}

const mapStateToProps = state => ({
  cartProducts: state.cart.cartProducts,
  currency: state.products.currency
})
const mapDispatchToProps = dispatch => ({
  changeProductQuantity: value => dispatch(changeProductQuantity(value)),
  changeProductSize: value => dispatch(changeProductSize(value)),
  deleteCartProduct: value => dispatch(deleteCartProduct(value))
})

export default connect(mapStateToProps, mapDispatchToProps)(CartItem)