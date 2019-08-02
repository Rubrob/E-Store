import React, { useEffect } from 'react';
import './App.css'
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import FrontPage from './components/FrontPage/FrontPage';
import ProductList from './containers/ProductList/ProductList';
import ProductPage from './containers/ProductList/ProductPage/ProductPage';
import Cart from './containers/Cart/Cart';
import Checkout from './containers/Checkout/Checkout'
import SingUpIn from './containers/SingUpIn/SingUpIn';
import Profile from './containers/Profile/Profile';

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas, faSort, faSlidersH } from '@fortawesome/free-solid-svg-icons'
import { filterURL, filterProductsWithURL } from './reducers/actions/products'
import { fetchMember } from './reducers/actions/auth'
import { fetchProducts } from './reducers/actions/products'

library.add(fab, fas, faSort, faSlidersH)

function App(props) {
  const { fetchMember, fetchProducts } = props

  useEffect(() => {
    localStorage.getItem('JWT_TOKEN')
    fetchMember()
    fetchProducts()
  },[fetchMember, fetchProducts])

  const { filterProductsWithURL } = props
  return (
    <div className="App">
      <Header />
        <main className='App-container'>
          <Route exact path='/' render={() => <FrontPage />}/>
          <Route path='/profile' component={Profile} />
          <Route exact path='/cart' component={Cart} />
          <Route exact path='/checkout' render={(props) => <Checkout {...props} />}/>
          <Route exact path='/p/:filter' render={({match}) => {
            const URL = filterURL(match.params.filter, '-', 2)
            filterProductsWithURL(URL)
            return <ProductList title={filterURL(match.params.filter, '-', 2)}/>
          }}/>
          <Route exact path='/pp/:productId/:colorId' component={ProductPage} />
          <Route exact path="/p" component={ProductList} />
          <Route exact path='/register' component={SingUpIn} />
        </main>
      <Footer />
    </div>
  );
}

const mapStateToProps = state => ({
  products: state.products.products,
})
const mapDispatchToProps = dispatch => ({
  filterProductsWithURL: value => dispatch(filterProductsWithURL(value)),
  fetchMember: () => dispatch(fetchMember()),
  fetchProducts: () => dispatch(fetchProducts())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);