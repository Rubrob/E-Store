import React from "react";
import "./styles.sass";
import { withRouter } from "react-router-dom";
import { Button } from "@material-ui/core";
import FilterBlock from "./FilterBlock";
import {
  handleQuery,
  pasreQuery,
  toggleFilterQuery,
  replaceFilterQuery
} from "utils";
import { filters } from "constants/index";
import { ColorButton, FilterButton, ListButton } from "./FilterButtons";

const Filter = props => {
  const [state, setstate] = React.useState({
    color: [],
    size: [],
    sort: ""
  });

  React.useEffect(() => {
    const { color, size, sort } = pasreQuery(props.location.search);
    setstate({
      color: Array.isArray(color) ? color : [color] || [],
      size: Array.isArray(size) ? size : [size] || [],
      sort: sort || ""
    });
  }, [props.location.search]);

  const onSubmitQuery = (value, path) => {
    props.history.push({
      ...handleQuery(props.location, { ...value }),
      pathname: path ? path : props.location.pathname
    });
  };

  const toggleFilter = (value, type) => () => {
    onSubmitQuery({
      [type]: toggleFilterQuery(props.location.search, type, value)
    });
  };

  const replaceFilter = (value, type) => () => {
    onSubmitQuery({
      [type]: replaceFilterQuery(props.location.search, type, value)
    });
  };

  return (
    <div className="Filter">
      <FilterBlock
        label="Sort By"
        currentFilter={Object.keys(filters.sort)}
        globalFilter={state.sort}
        containerClass="FilterBlock-content2"
        renderItem={({ item, active }) => (
          <ListButton
            key={item}
            className="sort"
            onClick={replaceFilter(item, "sort")}
            active={active}
          >
            {filters.sort[item]}
          </ListButton>
        )}
      />
      <FilterBlock
        label="Color"
        currentFilter={filters.colors}
        globalFilter={state.color}
        containerClass="FilterBlock-content"
        renderItem={({ item, active }) => (
          <ColorButton
            key={item}
            className="color"
            colorType={item}
            onClick={toggleFilter(item, "color")}
            active={active}
          />
        )}
      />
      <FilterBlock
        label="Size"
        currentFilter={filters.shoesSizes}
        globalFilter={state.size}
        containerClass="FilterBlock-content"
        renderItem={({ item, active }) => (
          <FilterButton
            key={item}
            className="size"
            onClick={toggleFilter(item, "size")}
            active={active}
          >
            {item}
          </FilterButton>
        )}
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        className="Filter-reset"
        onClick={() => {
          onSubmitQuery({
            color: null,
            size: null,
            sort: null
          });
        }}
      >
        Reset
      </Button>
    </div>
  );
};

export default withRouter(Filter);
