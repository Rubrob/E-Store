import React, {Component} from "react";
import "./styles.sass";
import {connect} from "react-redux";
import {addToCart} from "redux/actions/cart";
import {getCurrentProduct} from "redux/actions/products";
import ProductInfo from "./ProductInfo";
import ProductDetails from "./ProductDetails";


class ProductPage extends Component {
  componentDidMount() {
    this.props.getCurrentProduct(this.props.match.params)
  }

  componentDidUpdate(prevProps, _) {
    if(prevProps.match.params !== this.props.match.params){
      this.props.getCurrentProduct(this.props.match.params)
    }
  }

  render() {
    const {
      match,
      currency,
      history,
      addToCart,
      currentPage
    } = this.props

    return (
      <div className="productPage">
        <ProductInfo
          addToCart={addToCart}
          changeColor={(pid, cid) => history.push(`/pp/${pid}/${cid}`)}
          currency={currency}
          data={{...currentPage, ...match.params}}
          url={history.location.pathname}
        />
        <ProductDetails
          images={currentPage.images}
          title={currentPage.title}
          description={currentPage.description}
        />
      </div>
    )
  }
}

export default connect(
  (state) => ({
    currentPage: state.products.currentPage,
    currency: state.products.currency,
    products: state.products.products
  }),
  (dispatch) => ({
    addToCart: value => dispatch(addToCart(value)),
    getCurrentProduct: (value) => dispatch(getCurrentProduct(value))
  })
)(ProductPage)
