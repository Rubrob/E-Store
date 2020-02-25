import React from "react";
import "./styles.sass";
import { connect } from "react-redux";
import { dispatchProduct, dispatchAddToCart } from "redux/actions";
import ProductInfo from "./ProductInfo";
import ProductDetails from "./ProductDetails";

const ProductPage = ({
  currency,
  dispatchAddToCart,
  productPage,
  dispatchProduct,
  ...props
}) => {
  React.useEffect(() => {
    const { productId, colorId } = props.match.params;
    dispatchProduct(productId + "/" + colorId);
  }, [props.match.params]);

  if (!(productPage.product || productPage.color)) {
    return null;
  }

  return (
    <div className="productPage">
      <ProductInfo
        addCartItem={dispatchAddToCart}
        currency={currency}
        data={{ ...productPage, ...props.match.params }}
      />
      <ProductDetails
        image={productPage.color.preview_image}
        title={productPage.product.title}
        description={productPage.product.description}
      />
    </div>
  );
};

export default connect(
  state => ({
    productPage: state.products.productPage,
    currency: state.products.currency,
    products: state.products.products
  }),
  { dispatchProduct, dispatchAddToCart }
)(ProductPage);
