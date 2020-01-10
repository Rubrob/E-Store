import React from "react";
import "./styles.sass";
import {
  Button, 
  Typography, 
  ExpansionPanel, 
  ExpansionPanelSummary, 
  ExpansionPanelDetails
} from "@material-ui/core";
import CheckoutForm from "containers/Checkout/CheckoutForm";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


const ProfileForm = ({
  handleSubmit,
  invalid,
  onSubmit,
  initialValues,
  formType,
  ...props
}) => {
  const submit = async (value) => {
    await onSubmit({[formType]: value})
  }


  return (
    <div className='ProfileForm'>      
      <ExpansionPanel elevation={0}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="h6">
            {props.title}
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <form onSubmit={handleSubmit(submit)}>
            <CheckoutForm type={formType} />
            <div className="formBtns">
              <Button onClick={() => props.reset()}>
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={invalid}
              >
                Save
              </Button>
            </div>
          </form>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  )
}

export default ProfileForm
