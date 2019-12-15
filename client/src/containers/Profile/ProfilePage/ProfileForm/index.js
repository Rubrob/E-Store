import React, {useState} from "react";
import "./styles.sass";
import {Button, Typography} from "@material-ui/core";
import FormsPreview from "containers/Checkout/FormsPreview";
import CheckoutForm from "containers/Checkout/CheckoutForm";
import {isObjectValues} from "utils";
import cx from "classnames";


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
    <div className={cx('ProfileForm', {toAdd: !isValues && !open})}>
      <Typography variant="h6" className="ProfileForm-header">
        {props.title}
      </Typography>
      <div className="ProfileForm-preview">
        {open ? (
          <form onSubmit={handleSubmit(submit)}>
            <CheckoutForm type={formType} />
            <div className="formBtns">
              <Button
                onClick={() => setOpen(false)}
                children="Cancel"
              />
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={invalid}
                children="Save"
              />
            </div>
          </form>
          ) : (
          <>
            <>
              {isValues && <FormsPreview content={preview} />}
            </>
            <Button
              variant="contained"
              color='primary'
              className="openForm"
              onClick={() => setOpen(true)}
            >
              {isValues ? "Edit" : "Add"}
            </Button>
          </>
        )}
      </div>
    </div>
  )
}

export default ProfileForm
