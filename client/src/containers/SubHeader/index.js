import React, {useEffect} from "react";
import "./styles.sass";
import {connect} from "react-redux";
import cx from "classnames";
import {sortByPrice} from "redux/actions/products";
import {toggleFilter} from "redux/actions/trigers";
import {useMediaQuery, Typography, Box} from "@material-ui/core";
import {SetFixed} from "utils";
import FilterTriger from "./Filter/FilterTriger";
import Sort from "./Sort";


const SubHeader = ({
  filtered,
  searchedStr,
  sortByPrice,
  toggleFilter
}) => {
  const match = useMediaQuery("(max-width: 959.5px)")
  const {fixed, setFixed} = SetFixed(40)
  const searchedQuantity = `${filtered.length} ${filtered.length > 1 ? "Items" : "Item"}`

  useEffect(() => {
    window.addEventListener("scroll", setFixed)
    return () => { window.removeEventListener("scroll", setFixed) }
  }, [setFixed])

  return (
    <Box
      className={cx("subHeader", {fixed})}
      boxShadow={fixed ? 4 : 0}>
      {!match &&
        <Box fontSize={fixed ? 20 : 24} className="subHeader-title">
          {searchedStr}
        </Box>
      }
      <Box display="flex" justifyContent="space-between" alignItems="center" className="subHeader-main">
        <FilterTriger label="Filter" toggle={toggleFilter} />
        {match && <Typography children={searchedQuantity} />}
        <Sort label="Sort By" sortByPrice={sortByPrice} />
      </Box>
    </Box>
  )
}

const mapStateToProps = state => ({
  filtered: state.products.filtered,
  searchedStr: state.products.searchedStr,
})
const mapDispatchToProps = dispatch => ({
  sortByPrice: (method) => dispatch(sortByPrice(method)),
  toggleFilter: () => dispatch(toggleFilter())
})

export default connect(mapStateToProps, mapDispatchToProps)(SubHeader)
