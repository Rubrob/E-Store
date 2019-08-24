import React, { useEffect } from 'react'
import './App.sass'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import FrontPage from './components/FrontPage/FrontPage'
import ProductList from './containers/ProductList/ProductList'
import ProductPage from './containers/ProductList/ProductPage/ProductPage'
import Cart from './containers/Cart/Cart'
import Checkout from './containers/Checkout/Checkout'
import SingUpIn from './containers/SingUpIn/SingUpIn'
import Profile from './containers/Profile/Profile'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas, faSort, faSlidersH } from '@fortawesome/free-solid-svg-icons'
import { filterURL, filterProductsWithURL } from './actions/products'
import { fetchMember } from './actions/auth'
import { fetchProducts, fetchProductPage, fetchCategories } from './actions/products'
import Loader from './components/Loader/Loader'
import Toaster from './components/Toaster/Toaster'

library.add(fab, fas, faSort, faSlidersH)

function App(props) {
  const {
    fetchMember,
    fetchProducts,
    fetchCategories,
    products,
    isFetching,
    fetchPP,
    filterProductsWithURL
  } = props

  useEffect(() => {
    localStorage.getItem('JWT_TOKEN')
    fetchMember()
    fetchProducts()
    fetchCategories()
  },[fetchCategories, fetchMember, fetchProducts])

  return (
    isFetching ? <Loader /> :
    <div className='App'>
      <Toaster />
      <Header />
        <main>
          <Route exact path='/' component={FrontPage} />
          <Route path='/profile' component={Profile} />
          <Route exact path='/cart' component={Cart} />
          <Route exact path='/checkout' render={(props) => <Checkout {...props} />}/>
          <Route exact path='/p/:filter' render={({match}) => {
            const URL = filterURL(match.params.filter, '-', 2)
            filterProductsWithURL(URL)
            return <ProductList title={URL}/>
          }}/>
          <Route exact path='/pp/:productId/:colorId' render={(props) => {
            const { productId, colorId } = props.match.params
            const redirect = () => props.history.push('/')
            fetchPP(productId, colorId, products, redirect)
            return <ProductPage {...props} ids={{productId, colorId}}/>
          }} />

          <Route exact path='/p' component={ProductList} />
          <Route exact path='/register' component={SingUpIn} />
        </main>
      <Footer />
    </div>
  );
}

const mapStateToProps = state => ({
  products: state.products.products,
  isFetching: state.products.isFetching
})
const mapDispatchToProps = dispatch => ({
  filterProductsWithURL: value => dispatch(filterProductsWithURL(value)),
  fetchMember: () => dispatch(fetchMember()),
  fetchProducts: () => dispatch(fetchProducts()),
  fetchCategories: () => dispatch(fetchCategories()),
  fetchPP: (id, cid, products, redirect) => dispatch(fetchProductPage(id, cid, products, redirect))
})

export default connect(mapStateToProps, mapDispatchToProps)(App)