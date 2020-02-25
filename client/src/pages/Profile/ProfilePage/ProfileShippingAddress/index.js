// import React from "react";
import { reduxForm } from "redux-form";
import { validate } from "validation";
import ProfileForm from "../ProfileForm";

export default reduxForm({
  form: "profile-shipping",
  validate,
  enableReinitialize: true
})(ProfileForm);
