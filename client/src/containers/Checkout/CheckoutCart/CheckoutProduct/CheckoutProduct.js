import React from 'react'
import './CheckoutProduct.sass'
import { Link } from 'react-router-dom';

function CheckoutProduct({ info, withUrl }) {
  const { img, title, url, gender, color, size, qty, price, currency } = info
  return (
    <div className='checkoutProduct'>
      {withUrl ? <Link to={url} className='checkoutProduct-img'>
        <img src={img} alt='c-img'/>
      </Link> :
      <img src={img} alt='c-img'/>}
      <div className='checkoutProduct-info'>
        {withUrl ? <Link to={url}>{title}</Link> : <div>{title}</div>}
        <div>Gender: {gender}'s</div>
        <div>Color: {color}</div>
        <div>Size: {size}</div>
        <div>Qty: {qty} / {currency}{price}</div>
        <div>{currency}{qty * price}</div>
      </div>
    </div>
  )
}

export default CheckoutProduct