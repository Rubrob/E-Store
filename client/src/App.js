import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import FrontPage from './components/FrontPage/FrontPage'
import ProductList from './containers/ProductList/ProductList'
import ProductPage from './containers/ProductList/ProductPage/ProductPage'
import Cart from './containers/Cart/Cart'
import Checkout from './containers/Checkout/Checkout'
import SingUpIn from './containers/SingUpIn/SingUpIn'
import Profile from './containers/Profile/Profile'
import { filterURL, filterProductsWithURL } from './actions/products'
import { fetchMember } from './actions/auth'
import { fetchProducts, fetchCategories } from './actions/products'
import Loader from './components/Loader/Loader'
import Toaster from './components/Toaster/Toaster'
import ScrollToTop from './components/ScrollToTop'


const App = ({
  fetchMember,
  fetchProducts,
  fetchCategories,
  isFetching,
  filterProductsWithURL,
  isAuthenticated,
}) => {
  useEffect(() => {
    fetchMember()
    fetchProducts()
    fetchCategories()
  },[fetchCategories, fetchMember, fetchProducts])

  return (
    isFetching ? <Loader /> :
    <>
      <Toaster />
      <ScrollToTop />
      <Header />
      <>
        <Route exact path='/' component={FrontPage} />
        <Route path='/profile' render={(props) => isAuthenticated ? <Profile {...props} /> : <Redirect to='/register' />} />
        <Route exact path='/cart' component={Cart} />
        <Route exact path='/checkout' component={Checkout} />
        <Route exact path='/p/:filter' render={({match}) => {
          const URL = filterURL(match.params.filter, '-', 2)
          filterProductsWithURL(URL)
          return <ProductList title={URL} />
        }}/>
        <Route exact path='/pp/:productId/:colorId' component={ProductPage} />
        <Route exact path='/p' component={ProductList} />
        <Route exact path='/register' component={SingUpIn} />
        <Route path='/' component={({location}) => <Footer isCartLocation={location.pathname === '/cart'} />} />
      </>
    </>
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

export default connect(mapStateToProps, mapDispatchToProps)(App)