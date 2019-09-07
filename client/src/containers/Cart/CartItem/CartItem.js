import React from 'react'
import './CartItem.sass'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { arrayFromNumber} from '../../../utils'
import { Typography, IconButton } from '@material-ui/core'
import { Clear } from '@material-ui/icons'
import {
  changeProductQuantity,
  changeProductSize,
  deleteCartProduct,
} from '../../../actions/cart'
import CustomSelect from '../CustomSelect/CustomSelect'

const CartItem = (props) => {
  const {
    data,
    currency,
    changeProductQuantity,
    changeProductSize,
    deleteCartProduct,
  } = props

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

  const changeQuantity = (data) => changeProductQuantity(data)
  const changeSize = (data) => changeProductSize(data)
  const deleteItem = () => deleteCartProduct(data)

  return (
    <div className='ProductToBuy'>
      <div className='ProductToBuy-content'>
        <Link to={url} className='ProductToBuy-content-img' children={<img src={img} alt='img' />} />

        <div className='ProductToBuy-content-data'>
          <Typography
            component='div'
            className='ProductToBuy-content-data-title'
            children={<Link to={url} children={title} />}/>
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
          <IconButton size='small' onClick={deleteItem} children={<Clear />} />
          <Typography variant='button'>{currency}{data.qty * price}</Typography>
        </div>
      </div>

    </div>
  )
}

const mapStateToProps = state => ({
  currency: state.products.currency
})
const mapDispatchToProps = dispatch => ({
  changeProductQuantity: value => dispatch(changeProductQuantity(value)),
  changeProductSize: value => dispatch(changeProductSize(value)),
  deleteCartProduct: value => dispatch(deleteCartProduct(value))
})

export default connect(mapStateToProps, mapDispatchToProps)(CartItem)