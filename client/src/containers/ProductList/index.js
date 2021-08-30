import React from "react";
import "./styles.sass";
import {connect} from "react-redux";
import {
  useMediaQuery,
  SwipeableDrawer,
  Typography,
} from "@material-ui/core";
import {toggleFilter} from "redux/actions/trigers";
import SubHeader from "../SubHeader";
import Filter from "../SubHeader/Filter";
import ProductCard from "./ProductCard";


const ProductList = ({
  filtered,
  currency,
  searchedStr,
  isFilterOpen,
  toggle
}) => {
  const match = useMediaQuery("(max-width: 959.5px)")
  const productCards = filtered.map(product => <ProductCard key={product._id} product={product} currency={currency} />)

  return (
    <div className="productList">
      <SubHeader />
      {(match && filtered.length > 0) && <Typography variant="h5" children={searchedStr} />}
      <div className="flexRow">
        {match ?
          <SwipeableDrawer
            open={isFilterOpen}
            onClose={toggle}
            onOpen={toggle}
            children={<Filter />}
          /> :
          <Filter hide={isFilterOpen} />
        }
        <div className="productList-content">
          <div className="productList-content-main">
            {filtered.length < 1 ?
              <Typography
                variant="h5"
                align="center"
                className="productList-empty"
              >
                I Couldn't Find Anything For Your Request
              </Typography>
            : productCards}
          </div>
        </div>
      </div>
    </div>
  )
}

export default connect(
  (state) => ({
    // filtered: state.products.filtered,
    filtered: state.products.products,
    searchedStr: state.products.searchedStr,
    currency: state.products.currency,
    isFilterOpen: state.trigers.filter
  }),
  (dispatch) => ({
    toggle: () => dispatch(toggleFilter())
  })
)(ProductList)
