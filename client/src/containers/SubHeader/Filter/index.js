import React from "react";
import "./styles.sass";
import {connect} from "react-redux";
import {Button} from "@material-ui/core";
import {
  resetFilter,
  getFilters,
  changeFilter,
} from "redux/actions/products";
import FilterBlock from "./FilterBlock";
import cx from "classnames";


const Filter = ({
  searched,
  hide,
  onReset,
  onChange,
  globalFilter
}) => {
  const filters = getFilters(searched, ["color", "size"])
  return (
    <div className={cx("Filter", {hide})}>
      <FilterBlock
        label="Color"
        filterType="color"
        currentFilter={filters.colors}
        onChange={onChange}
        globalFilter={globalFilter}
      />
      <FilterBlock
        label="Size"
        filterType="size"
        currentFilter={filters.sizes}
        onChange={onChange}
        globalFilter={globalFilter}
      />
      <Button
        variant="contained"
        color="primary"
        className="Filter-reset"
        onClick={onReset}
      >
        Reset
      </Button>
    </div>
  )
}

export default connect(
  (state) => ({
    searched: state.products.searched,
    globalFilter: state.products.filter
  }),
  (dispatch) => ({
    onReset: () => dispatch(resetFilter()),
    onChange: value => dispatch(changeFilter(value)),
  })
)(Filter)
