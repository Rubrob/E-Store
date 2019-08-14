import React from 'react'
import { connect } from 'react-redux'
import { Radio, RadioGroup, FormControlLabel, Typography } from '@material-ui/core'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import { changeDelivery } from '../../../../reducers/actions/cart'
import { freeIfZero } from '../../../../utils'

const CustomFormControlLabel = withStyles({
  root: {
    '& .MuiFormControlLabel-label': {
      width: '100%'
    },
    '& .MuiRadio-root': {
      padding: '5px 10px'
    },
  }
})(FormControlLabel)


const useStyles = makeStyles({
  root: {
    display: 'flex',
    textTransform: 'capitalize',
  },
  radioGroup: {
    marginTop: 20
  },
  title: {
    fontWeight: 700,
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
    marginRight: -6
  }
})

function DeliveryBox(props) {
  const classes = useStyles()
  const { input } = props
  const { currency, deliveryMethods, changeDelivery, delivery } = props

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
        children={'Select your shipping speed'} />
      {Object.keys(deliveryMethods).map(key => <div className={classes.root} key={key}>
          <CustomFormControlLabel className={classes.plan} value={key} control={<Radio />} label={
          <Typography variant='body1' component='div' className={classes.content}>
            {key}
            <Typography
              variant='body1'
              component='span'
              className={classes.cost}
              children={freeIfZero(deliveryMethods[key], currency)} />
          </Typography>} />
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