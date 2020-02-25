import React from "react";
import "./styles.sass";
import { Typography } from "@material-ui/core";
import ProfileShippingAddress from "./ProfileShippingAddress";
import ProfileBillingAddress from "./ProfileBillingAddress";

const ProfilePage = ({
  fullname,
  userShipping,
  userBilling,
  setUserAddresses
}) => {
  return (
    <div className="profilePage">
      <Typography
        variant="h5"
        component="h2"
        align="center"
        className="profilePage-title"
      >
        Hi, {fullname}
      </Typography>
      <div className="profilePage-forms">
        <div>
          <ProfileShippingAddress
            formType="shipping"
            initialValues={userShipping}
            onSubmit={setUserAddresses}
            title="Shipping Address"
          />
          <ProfileBillingAddress
            formType="billing"
            initialValues={userBilling}
            onSubmit={setUserAddresses}
            title="Billing Address"
          />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
