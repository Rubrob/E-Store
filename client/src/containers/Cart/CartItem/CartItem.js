import React from 'react'
import './CartItem.sass'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { arrayFromNumber} from '../../../utils'
import { Clear } from '@material-ui/icons'
import {
  changeProductQuantity,
  changeProductSize,
  deleteCartProduct,
} from '../../../reducers/actions/cart'
import CustomSelect from '../CustomSelect/CustomSelect'

function CartItem(props) {
  const data = props.cartProducts[props.i]
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
    currency,
    price
  } = data

  const { changeProductQuantity, changeProductSize, deleteCartProduct } = props

  const changeQuantity = (data) => changeProductQuantity(data)
  const changeSize = (data) => changeProductSize(data)

  return (
    <div className='ProductToBuy'>
      <div className='ProductToBuy-content'>
        <Link to={url} className='ProductToBuy-content-img' children={<img src={img} alt='img'/>} />

        <div className='ProductToBuy-content-data'>
          <Link to={url} children={title} />
          <div>Gender: {gender}'s</div>
          <div>Color: {color}</div>
          <div className='sizeSelect'>
            Size: <CustomSelect data={sizes} primary={size} onChangeData={data} onChange={changeSize}/>
          </div>
          <div className='quantitySelect'>
            Quantity: <CustomSelect data={arrayFromNumber(availability)} primary={qty} onChangeData={data} onChange={changeQuantity}/>
            <span style={{fontSize: 10, paddingRight: 5}}>x</span>{currency}{price}
          </div>
        </div>
      </div>

      <div className='ProductToBuy-controls'>
        <div onClick={() => deleteCartProduct(data)} children={<Clear />} />
        <div>{currency}{data.qty * price}</div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  cartProducts: state.cart.cartProducts
})
const mapDispatchToProps = dispatch => ({
  changeProductQuantity: value => dispatch(changeProductQuantity(value)),
  changeProductSize: value => dispatch(changeProductSize(value)),
  deleteCartProduct: value => dispatch(deleteCartProduct(value))
})

export default connect(mapStateToProps, mapDispatchToProps)(CartItem)