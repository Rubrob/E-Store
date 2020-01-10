import React, {useState, useEffect} from "react";
import {matchPath} from "react-router-dom";
import {connect} from "react-redux";
import {Tabs, Tab} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import OrdersPage from "./OrdersPage";
import ProfilePage from "./ProfilePage";
import {setUserAddresses} from "redux/actions/auth";


const useStyles = makeStyles({
  profile: {
    padding: "60px 12px",
    maxWidth: 1200,
    margin: "0 auto",
  },
  tabs: {
    textTransform: 'none'
  }
})


const Profile = ({
  match,
  history,
  location,
  currency,
  orders,
  userShipping,
  userBilling,
  fullname,
  setUserAddresses
}) => {
  const classes = useStyles()

  const getModeFromPathname = (pageName, modes, pathname) => (
    Object.entries(modes)
      .map(([mode, suffix]) => ({
        mode,
        ...(matchPath(pathname, {
          path: `/${pageName}${suffix}`,
          exact: true
        }) || {})
      }))
      .find(result => result.path) || {}
  );


  const [state, setState] = useState({
    modes: {
      preview: "",
      orders: "/orders",
    },
    mode: 'preview'
  })


  useEffect(() => {
    setState((prevState) => ({
      ...prevState, 
      ...getModeFromPathname("profile", state.modes, location.pathname)
    }))
  }, [location.pathname, state.modes])


  return (
    <div className={classes.profile}>
      <Tabs
        value={location.pathname}
        indicatorColor="primary"
        onChange={(_, value) => history.push(value)}
        centered
      >
        <Tab
          disableRipple
          className={classes.tabs}
          value={match.url}
          label="Profile"
        />
        <Tab
          disableRipple
          className={classes.tabs}
          value={match.url + "/orders"}
          label="Orders"
        />
      </Tabs>
      {state.mode === "preview" ? (
        <ProfilePage
          fullname={fullname}
          userShipping={userShipping}
          userBilling={userBilling}
          setUserAddresses={setUserAddresses}
        />
      ) : state.mode = "orders" ? (
        <OrdersPage
          currency={currency}
          orders={orders}
        />
      ) : null}
    </div>
  )
}

export default connect(
  (state) => ({
    userShipping: state.auth.addresses.shipping,
    userBilling: state.auth.addresses.billing,
    fullname: state.auth.fullname,
    currency: state.products.currency,
    orders: state.auth.orders
  }),
  (dispatch) => ({
    setUserAddresses: value => dispatch(setUserAddresses(value))
  })
)(Profile)
