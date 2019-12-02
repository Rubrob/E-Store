import React from 'react'
import { connect } from 'react-redux'
import { Radio, RadioGroup, FormControlLabel, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { changeDelivery } from '../../../../actions/cart'
import { freeIfZero } from '../../../../utils'


const useStyles = makeStyles({
  root: {
    display: 'flex',
    textTransform: 'capitalize',
    position: 'relative'
  },
  radioGroup: {
    marginTop: 20,
    padding: 10
  },
  title: {
    fontWeight: 600,
  },
  content: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between'
  },
  plan: {
    width: '100%'
  },
  cost: {
    position: 'absolute',
    right: 0,
    top: '50%',
    transform: 'translate3d(0, -50%, 0)'
  }
})

function DeliveryBox(props) {
  const classes = useStyles()
  const {
    input,
    currency,
    deliveryMethods,
    changeDelivery,
    delivery
  } = props

  return (
    <RadioGroup
      {...input}
      value={delivery}
      className={classes.radioGroup}
      onChange={(evt) => changeDelivery(evt.target.value)} >
      <Typography
        variant='subtitle1'
        className={classes.title}
        paragraph
        children={'Select your shipping speed'}
      />
      {Object.keys(deliveryMethods).map(key => (
        <div className={classes.root} key={key}>
          <FormControlLabel className={classes.plan} value={key} control={<Radio />} label={
            <Typography component='div' className={classes.content}>
              {key}
              <Typography
                component='span'
                className={classes.cost}
                children={freeIfZero(deliveryMethods[key], currency)}
              />
            </Typography>} />
        </div>))}
    </RadioGroup>
  )
}

const mapStateToProps = state => ({
  currency: state.products.currency,
  deliveryMethods: state.cart.deliveryMethods,
  delivery: state.cart.defaultValues.delivery
})
const mapDispatchToProps = dispatch => ({
  changeDelivery: (value) => dispatch(changeDelivery(value))
})

export default connect(mapStateToProps, mapDispatchToProps)(DeliveryBox)