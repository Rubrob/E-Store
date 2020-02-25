import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { Route, Redirect, Switch, withRouter } from "react-router-dom";
import Loadable from "react-loadable";
import { getUser, dispatchValidateCart } from "redux/actions";
import ProductList from "pages/ProductList";
import ProductPage from "pages/ProductPage";
import Loader from "components/Loader";
import Layout from "components/Layout";
import Notifier from "components/Notifier";
import ScrollToTop from "components/ScrollToTop";

const createLoadableComponent = pathResolver => {
  return Loadable({
    loader: pathResolver,
    loading: props => (props.error ? console.error(props.error) : <Loader />)
  });
};

const App = ({
  cart,
  token,
  isAuthenticated,
  getUser,
  dispatchValidateCart,
  ...props
}) => {
  React.useEffect(() => {
    if (isAuthenticated && token) getUser();
  }, [isAuthenticated]);

  React.useEffect(() => {
    dispatchValidateCart();
  }, []);

  // path={`/:id(${allowedRoutes.join('|')})`}
  const routes = [
    {
      exact: true,
      path: "/",
      component: createLoadableComponent(() => import("./pages/FrontPage"))
    },
    {
      path: "/profile",
      component: createLoadableComponent(() => import("./pages/Profile"))
    },
    {
      exact: true,
      path: "/cart",
      component: createLoadableComponent(() => import("./pages/Cart"))
    },
    {
      exact: true,
      path: "/checkout",
      component: createLoadableComponent(() => import("./pages/Checkout"))
    },
    {
      exact: true,
      path: "/register",
      component: createLoadableComponent(() => import("./pages/SingUpIn"))
    }
    // {
    //   exact: true,
    //   path: "/pp/:productId/:colorId",
    //   component: createLoadableComponent(() => import("./pages/ProductPage"))
    // },
  ];

  if (props.location.pathname.indexOf("/profile") >= 0 && !isAuthenticated) {
    return <Redirect to="/register" />;
  }

  return (
    <>
      <Notifier />
      <ScrollToTop />
      <Layout
        isCartLocation={props.location.pathname === "/cart"}
        showSidebar={/\/p\/.?/.test(props.location.pathname)}
        showSubheader={/\/p\/.?/.test(props.location.pathname)}
        subheaderTitle={props.subheaderTitle}
        hOffset={/\/p\/.?/.test(props.location.pathname) ? 60 : 0}
      >
        <Switch>
          {routes.map(routeprops => (
            <Route key={routeprops.path} {...routeprops} />
          ))}
          <Route exact path="/pp/:productId/:colorId" component={ProductPage} />
          <Route path="/p/:category_slug?" component={ProductList} />
        </Switch>
      </Layout>
    </>
  );
};

export default compose(
  withRouter,
  connect(
    state => ({
      token: state.auth.token,
      isAuthenticated: state.auth.isAuthenticated,
      subheaderTitle: state.products.subheaderTitle,
      cart: state.cart.cart
    }),
    { getUser, dispatchValidateCart }
  )
)(App);
