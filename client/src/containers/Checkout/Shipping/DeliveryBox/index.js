import React from "react";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  Typography
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {freeIfZero} from "utils";


const useStyles = makeStyles({
  root: {
    display: "flex",
    textTransform: "capitalize",
    position: "relative"
  },
  radioGroup: {
    marginTop: 20,
    padding: 10
  },
  title: {
    fontWeight: 600,
  },
  content: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between"
  },
  plan: {
    width: "100%"
  },
  cost: {
    position: "absolute",
    right: 0,
    top: "50%",
    transform: "translate3d(0, -50%, 0)"
  }
})


const DeliveryBox = ({
  currency,
  methods,
  onChange,
  selected
}) => {
  const classes = useStyles()
  return (
    <RadioGroup
      value={selected}
      className={classes.radioGroup}
      onChange={(evt) => onChange(evt.target.value)} >
      <Typography
        variant="subtitle1"
        className={classes.title}
        paragraph
      >
        Select your shipping speed
      </Typography>
      {Object.keys(methods).map(key => (
        <div className={classes.root} key={key}>
          <FormControlLabel className={classes.plan} value={key} control={<Radio />} label={
            <Typography component="div" className={classes.content}>
              {key}
              <Typography
                component="span"
                className={classes.cost}
                children={freeIfZero(methods[key], currency)}
              />
            </Typography>} />
        </div>))}
    </RadioGroup>
  )
}

export default DeliveryBox
