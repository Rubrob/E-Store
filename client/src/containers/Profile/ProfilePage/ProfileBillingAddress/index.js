import React from "react";
import {reduxForm} from "redux-form";
import {validate} from "validation";
import ProfileForm from "../ProfileForm";


export default reduxForm({
  form: "profile-billing",
  validate,
  enableReinitialize: true
})((props) => (<ProfileForm {...props} />))
