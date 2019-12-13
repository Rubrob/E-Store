import React, {useState} from "react";
import "./styles.sass";
import {Button, Typography} from "@material-ui/core";
import FormsPreview from "containers/Checkout/FormsPreview";
import CheckoutForm from "containers/Checkout/CheckoutForm";
import {isObjectValues} from "utils";


const ProfileForm = ({
  handleSubmit,
  invalid,
  onSubmit,
  initialValues,
  preview,
  formType,
  ...props
}) => {
  const [open, setOpen] = useState(false)
  const isValues = isObjectValues(initialValues)
  const submit = async (value) => {
    await onSubmit(value)
    setOpen(false)
  }

  return (
    <div className={`ProfileForm ${!isValues && !open && "toAdd"}`}>
      <Typography variant="h6" className="ProfileForm-header">
        {props.title}
      </Typography>
      <div className="ProfileForm-preview">
        {open ?
          <form onSubmit={handleSubmit(submit)}>
            <CheckoutForm type={formType} />
            <div className="formBtns">
              <Button
                variant="contained"
                onClick={() => setOpen(false)}
                children="Cancel"
              />
              <Button
                variant="contained"
                color="secondary"
                type="submit"
                disabled={invalid}
                children="Save"
              />
            </div>
          </form> :
          <>
            <div>
              {isValues && <FormsPreview content={preview} />}
            </div>
            <Button
              variant="contained"
              className="openForm"
              onClick={() => setOpen(true)}
            >
              {isValues ? "Edit" : "Add"}
            </Button>
          </>
        }
      </div>
    </div>
  )
}

export default ProfileForm
