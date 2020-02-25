import React from "react";
import "./styles.sass";
import { connect } from "react-redux";
import { Typography } from "@material-ui/core";
import ProductCard from "components/ProductCard";
import { dispatchSubheaderTitle, dispatchProducts } from "redux/actions";
import { pasreQuery, transformSlug } from "utils";

const ProductList = ({ products, currency, ...props }) => {
  React.useEffect(() => {
    const query = pasreQuery(props.location.search);
    props
      .dispatchProducts(props.match.params.category_slug, {
        page: 1,
        ...query
      })
      .then(() =>
        props.dispatchSubheaderTitle(
          transformSlug(props.match.params.category_slug) ||
            `Search for "${query.search || ""}"`
        )
      );
  }, [props.location.search, props.match.params.category_slug]);

  const renderProducts = () => {
    if (props.loading && products.length < 1) {
      return null;
    }

    if (!products || products.length === 0)
      return (
        <Typography variant="h5" align="center" className="ProductList-empty">
          No Products
        </Typography>
      );

    return products.map(product => (
      <ProductCard
        key={product._id}
        product={product}
        productSlug={product.slug}
        currency={currency}
        title={product.title}
        subtitle={product.subtitle}
        colors={product.colors}
      />
    ));
  };

  return (
    <div className="ProductList">
      <div className="ProductList-content">{renderProducts()}</div>
    </div>
  );
};

export default connect(
  state => ({
    products: state.products.products,
    loading: state.products.loading,
    currency: state.products.currency
  }),
  {
    dispatchSubheaderTitle,
    dispatchProducts
  }
)(ProductList);
