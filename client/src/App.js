import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import ProductList from './containers/ProductList/ProductList'
import ProductPage from './containers/ProductList/ProductPage/ProductPage'
import { filterURL, filterProductsWithURL } from './actions/products'
import { fetchMember } from './actions/auth'
import { fetchProducts, fetchCategories } from './actions/products'
import Loader from './components/Loader/Loader'
import Loadable from 'react-loadable';
import {withRouter} from 'react-router-dom'
import {compose} from 'redux'
import MainBlock from './components/MainBlock';


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
  fetchCategories,
  isFetching,
  filterProductsWithURL,
  isAuthenticated,
  ...props
}) => {
  useEffect(() => {
    fetchMember()
    fetchProducts()
    fetchCategories()
  },[fetchCategories, fetchMember, fetchProducts])

  const routes = [
    {
      exact: true,
      path: '/',
      component: createLoadableComponent(() => import('./components/FrontPage/FrontPage'))
    },
    {
      path: '/profile',
      component: createLoadableComponent(() => import('./containers/Profile/Profile'))
    },
    {
      exact: true,
      path: '/cart',
      component: createLoadableComponent(() => import('./containers/Cart/Cart'))
    },
    {
      exact: true,
      path: '/checkout',
      component: createLoadableComponent(() => import('./containers/Checkout/Checkout'))
    },
    {
      exact: true,
      path: '/p',
      component: createLoadableComponent(() => import('./containers/ProductList/ProductList'))
    },
    {
      exact: true,
      path: '/register',
      component: createLoadableComponent(() => import('./containers/SingUpIn/SingUpIn'))
    }
  ]

  if(props.location.pathname.indexOf('/profile') >= 0 && !isAuthenticated) {
    return  <Redirect to='/register' />
  }

  return (
    <MainBlock isCartLocation={props.location.pathname === '/cart'}>
      {routes.map((routeprops) => (
        <Route key={routeprops.path} {...routeprops} />
      ))}
      <Route exact path='/pp/:productId/:colorId' component={ProductPage} />
      <Route exact path='/p/:filter' render={({match}) => {
          const URL = filterURL(match.params.filter, '-', 2)
          filterProductsWithURL(URL)
          return <ProductList title={URL} />
        }}
      />
    </MainBlock>
  );
}

const mapStateToProps = state => ({
  products: state.products.products,
  isFetching: state.products.isFetching,
  isAuthenticated: state.auth.isAuthenticated,
})
const mapDispatchToProps = dispatch => ({
  filterProductsWithURL: value => dispatch(filterProductsWithURL(value)),
  fetchMember: () => dispatch(fetchMember()),
  fetchProducts: () => dispatch(fetchProducts()),
  fetchCategories: () => dispatch(fetchCategories()),
})

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(App)