import React from "react";
import "./styles.sass";
import { Button } from "@material-ui/core";
import BillingFields from "components/Fields/BillingFields";
import ShippingFields from "components/Fields/ShippingFields";
import ExpandedPanel from "components/ExpandedPanel";

const ProfileForm = ({
  handleSubmit,
  invalid,
  onSubmit,
  initialValues,
  formType,
  ...props
}) => {
  const submit = async value => await onSubmit({ [formType]: value });

  const renderForm = () => {
    if (formType === "shipping") return <ShippingFields />;
    if (formType === "billing") return <BillingFields />;
    return null;
  };
  return (
    <div className="ProfileForm">
      <ExpandedPanel title={props.title}>
        <form onSubmit={handleSubmit(submit)}>
          {renderForm()}
          <div className="formBtns">
            <Button onClick={() => props.reset()}>Cancel</Button>
            <Button variant="contained" color="primary" type="submit" disabled={invalid}>
              Save
            </Button>
          </div>
        </form>
      </ExpandedPanel>
      {/* <ExpansionPanel elevation={0}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">{props.title}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <form onSubmit={handleSubmit(submit)}>
            {renderForm()}
            <div className="formBtns">
              <Button onClick={() => props.reset()}>Cancel</Button>
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
      </ExpansionPanel> */}
    </div>
  );
};

export default ProfileForm;
