import React from "react";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { freeIfZero } from "utils/index";

const useStyles = makeStyles({
  radioGroup: {
    marginTop: 24,
    padding: 10
  },
  title: {
    fontWeight: 600
  },
  plan: {
    textTransform: "capitalize"
  }
});

const DeliveryBox = ({ currency, methods, onChange, selected }) => {
  const classes = useStyles();
  return (
    <RadioGroup
      value={selected}
      className={classes.radioGroup}
      onChange={evt => onChange(evt.target.value)}
    >
      <Typography variant="subtitle1" className={classes.title} gutterBottom>
        Select your shipping speed
      </Typography>
      {Object.keys(methods).map(key => (
        <FormControlLabel
          key={key}
          className={classes.plan}
          value={key}
          control={<Radio />}
          label={key + " - " + freeIfZero(methods[key], currency)}
        />
      ))}
    </RadioGroup>
  );
};

export default DeliveryBox;
