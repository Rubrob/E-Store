import React from "react";
import {AccountCircle} from "@material-ui/icons";
import MenuListItem from "../../MobileMenu/MenuListItem";


const MobileAccount = ({
  isAuthenticated,
  onClose,
  logOut,
}) => {
  return isAuthenticated ? (
    <MenuListItem
      title="My Account"
      className="listItem -header"
      icon={<AccountCircle />}
    >
      <MenuListItem
        className="listItem"
        title="Orders"
        link="/profile/orders"
        onClose={onClose}
      />
      <MenuListItem
        className="listItem"
        title="Profile"
        link="/profile"
        onClose={onClose}
      />
      <MenuListItem
        className="listItem"
        title="Log Out"
        onClose={() => {
          logOut()
          onClose()
        }}
        link="none"
      />
    </MenuListItem>
  ) : (
    <MenuListItem
      className="listItem -header noIcon"
      onClose={onClose}
      title="Join / Log In"
      link="/register"
    />
  )
}

export default MobileAccount
