import React, {useState} from "react";
import "./styles.sass";
import {ExpandLess, ExpandMore} from "@material-ui/icons";
import {Button, Typography} from "@material-ui/core";
import ProfileShippingAddress from "./ProfileShippingAddress";
import ProfileBillingAddress from "./ProfileBillingAddress";


const ProfilePage = ({
  fullname,
  userShipping,
  userBilling,
  setShipping,
  setBilling
}) => {
  const [open, setOpen] = useState(true)
  return (
    <div className="profilePage">
      <Typography variant="h5" component="h2" align="center" className="profilePage-title">
        Hi, {fullname}
      </Typography>
      <div className={"profilePage-forms"}>
        <Button
          disableRipple
          className="profilePage-customExpand"
          onClick={() => setOpen(!open)}>
          Your Addresses
          {open ? <ExpandLess /> : <ExpandMore />}
        </Button>
        {open && (
          <>
            <div className="profilePage-forms-form">
              <ProfileShippingAddress
                formType="shipping"
                preview={userShipping}
                initialValues={userShipping}
                onSubmit={setShipping}
                title="Shipping Address"
              />
            </div>
            <div className="profilePage-forms-form">
              <ProfileBillingAddress
                formType="billing"
                preview={userBilling}
                initialValues={userBilling}
                onSubmit={setBilling}
                title="Billing Address"
              />
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default ProfilePage
