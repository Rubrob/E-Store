import React, {useEffect} from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import {Route, Redirect} from "react-router-dom";
import ProductList from "containers/ProductList";
import ProductPage from "containers/ProductList/ProductPage";
import {
  filterURL,
  filterProductsWithURL,
  fetchProducts,
} from "redux/actions/products";
import {fetchMember} from "redux/actions/auth";
import Loader from "components/Loader";
import MainBlock from "components/MainBlock";
import Loadable from "react-loadable";
import {withRouter} from "react-router-dom";


const createLoadableComponent = (pathResolver) => {
  return Loadable({
    loader: pathResolver,
    loading: props =>
      props.error ? console.error(props.error) : <Loader />
  });
}


const App = ({
  fetchMember,
  fetchProducts,
  isFetching,
  filterProductsWithURL,
  isAuthenticated,
  ...props
}) => {
  useEffect(() => {
    fetchMember()
    fetchProducts()
  },[fetchMember, fetchProducts])

  const routes = [
    {
      exact: true,
      path: "/",
      component: createLoadableComponent(() => import("./components/FrontPage"))
    },
    {
      path: "/profile",
      component: createLoadableComponent(() => import("./containers/Profile"))
    },
    {
      exact: true,
      path: "/cart",
      component: createLoadableComponent(() => import("./containers/Cart"))
    },
    {
      exact: true,
      path: "/checkout",
      component: createLoadableComponent(() => import("./containers/Checkout"))
    },
    {
      exact: true,
      path: "/p",
      component: createLoadableComponent(() => import("./containers/ProductList"))
    },
    {
      exact: true,
      path: "/register",
      component: createLoadableComponent(() => import("./containers/SingUpIn"))
    }
  ]

  if(props.location.pathname.indexOf("/profile") >= 0 && !isAuthenticated) {
    return  <Redirect to="/register" />
  }

  return (
    <MainBlock isCartLocation={props.location.pathname === "/cart"}>
      {routes.map((routeprops) => (
        <Route key={routeprops.path} {...routeprops} />
      ))}
      <Route exact path="/pp/:productId/:colorId" component={ProductPage} />
      <Route exact path="/p/:filter" render={({match}) => {
          const URL = filterURL(match.params.filter, "-", 2)
          filterProductsWithURL(URL)
          return <ProductList title={URL} />
        }}
      />
    </MainBlock>
  );
}

export default compose(
  withRouter,
  connect(
    (state) => ({
      products: state.products.products,
      isFetching: state.products.isFetching,
      isAuthenticated: state.auth.isAuthenticated,
    }),
    (dispatch) => ({
      filterProductsWithURL: (value) => dispatch(filterProductsWithURL(value)),
      fetchMember: () => dispatch(fetchMember()),
      fetchProducts: () => dispatch(fetchProducts()),
    })
  )
)(App)
