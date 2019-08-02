import React from 'react'
import './DeliveryBox.sass'
import { connect } from 'react-redux'
import { changeDelivery } from '../../../../reducers/actions/cart'
import { Radio, RadioGroup, FormControlLabel } from '@material-ui/core'
import { freeIfZero } from '../../../../utils'

function DeliveryBox(props) {

  const { input } = props
  const { currency, deliveryMethods, changeDelivery, delivery } = props

  return (
    <RadioGroup {...input} value={delivery} onChange={(evt) => changeDelivery(evt.target.value)} >
      <h4>Select your shipping speed</h4>
      {Object.keys(deliveryMethods).map(key => <div className='DeliveryBox' key={key}>
          <FormControlLabel className='DeliveryBox-plan' value={key} control={<Radio className='radio'/>} label={key} />
          <span className='DeliveryBox-cost'>
            {freeIfZero(deliveryMethods[key], currency)}
          </span>
        </div>)}
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