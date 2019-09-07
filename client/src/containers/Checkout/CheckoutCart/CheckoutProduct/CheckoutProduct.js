import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Typography } from '@material-ui/core'
import { withStyles, makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  checkoutProduct: {
    position: 'relative',
    display: 'flex',
    padding: 8,
    '&:not(:last-child)::before': {
      content: '',
      position: 'absolute',
      left: '50%',
      bottom: 0,
      transform: 'translateX(-50%)',
      width: '90%',
      height: 1,
      background: '#e5e5e5',
    },
    '& img': {
      alignSelf: 'center',
      display: 'block',
      height: 120
    },
    '& a': {
      textDecoration: 'underline'
    }
  },
  img: {
    alignSelf: 'center',
  },
  info: {
    alignSelf: 'center',
    marginLeft: 8,
    textTransform: 'capitalize',
    color: '#999',
    '& > :last-child': {
      color: '#444',
      fontWeight: 600
    }
  },
}))

const CheckoutProductTitle = withStyles(() => ({
  root: {
    color: '#444',
    fontWeight: 600,
    '& a': {
      color: '#444',
      fontWeight: 600,
    }
  }
}))((props) => <Typography component='div' {...props} />)

const CheckoutProduct = ({ info, withUrl, currency }) => {
  const classes = useStyles()
  const { img, title, url, gender, color, size, qty, price } = info
  return (
    <div className={classes.checkoutProduct}>
      {withUrl ?
        <Link to={url} className={classes.img} children={<img src={img} alt='img'/>} /> :
        <img src={img} alt='img'/>
      }
      <div className={classes.info}>
        <CheckoutProductTitle children={withUrl ? <Link to={url} children={title} /> : title} />
        <Typography variant='body2' component='div' children={`Gender: ${gender}'s`} />
        <Typography variant='body2' component='div' children={`Color: ${color}`} />
        <Typography variant='body2' component='div' children={`Size: ${size}`} />
        <Typography variant='body2' component='div' children={`Qty: ${qty} / ${currency}${price}`} />
        <Typography variant='body2' component='div' children={`${currency}${qty * price}`} />
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  currency: state.products.currency
})

export default connect(mapStateToProps, null)(CheckoutProduct)