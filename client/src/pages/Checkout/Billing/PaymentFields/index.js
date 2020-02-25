import React from "react";
import { Field } from "redux-form";
import { Grid, Box } from "@material-ui/core";
import StyledInput from "components/StyledInput";
import masks from "utils/masks";

const PaymentFields = props => {
  return (
    <>
      <Box fontWeight={600} mb={2}>
        Add Card
      </Box>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={4}>
          <Field
            name="cardnumber"
            type="tel"
            label="Card Number"
            component={StyledInput}
            className="cardnumber"
            {...masks.cardnumber}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Field
            name="exp"
            type="tel"
            label="MM/YY"
            component={StyledInput}
            className="exp"
            {...masks.cardexp}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Field
            name="cvv"
            type="tel"
            label="Secure Code"
            component={StyledInput}
            className="cvv"
            inputProps={{ maxLength: 4 }}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default PaymentFields;
