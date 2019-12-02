import React from 'react'
import './CheckoutProduct.sass'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Typography } from '@material-ui/core'

const CheckoutProduct = ({ info, withUrl, currency }) => {
  const { img, title, url, gender, color, size, qty, price } = info
  return (
    <div className='checkoutProduct'>
      <div className='checkoutProduct-img'>
        {withUrl ?
          <Link to={url} children={<img src={img} alt='img' />} /> :
          <img src={img} alt='img' />
        }
      </div>
      <div className='checkoutProduct-info'>
        <Typography
          component='div'
          color='textPrimary'
          className='checkoutProduct-info-title'
          children={withUrl ? <Link to={url} children={title} /> : title}
        />
        <Typography variant='body2' color='textSecondary' component='div' children={`Gender: ${gender}'s`} />
        <Typography variant='body2' color='textSecondary' component='div' children={`Color: ${color}`} />
        <Typography variant='body2' color='textSecondary' component='div' children={`Size: ${size}`} />
        <Typography variant='body2' color='textSecondary' component='div' children={`Qty: ${qty} / ${currency}${price}`} />
        <Typography variant='body2' color='textPrimary' component='div'>
          {currency}{qty * price}
        </Typography>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  currency: state.products.currency
})

export default connect(mapStateToProps, null)(CheckoutProduct)