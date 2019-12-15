import React from "react";
import {Field} from "redux-form";
import StyledInput from "components/StyledInput";


export default () => (
  <>
    <Field
      className="input"
      name="firstname"
      label="First Name"
      component={StyledInput}
    />
    <Field
      className="input"
      name="lastname"
      label="Last Name"
      component={StyledInput}
    />
    <Field
      className="input"
      name="email"
      label="Email"
      type="email"
      component={StyledInput}
    />
    <Field
      className="input"
      name="password"
      autoComplete="on"
      label="Password"
      type="password"
      component={StyledInput}
    />
  </>
)
