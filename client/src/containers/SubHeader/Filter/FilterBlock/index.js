import React from "react";
import {
  Button,
  Typography,
  withStyles
} from "@material-ui/core";
import cx from "classnames";
import {Done} from "@material-ui/icons";
import {colors} from "constants/index";


const styles = (theme) => ({
  root: {
    width: 35,
    height: 35,
    minHeight: 35,
    minWidth: 35,
    borderRadius: 50,
    border: "1px solid #e5e5e5",
    color: styledBy("colorType", colors, (color) => theme.palette.getContrastText(color)),
    backgroundColor: styledBy("colorType", colors, (color) => color),
    "&:hover": {
      backgroundColor: styledBy("colorType", colors, (color) => color)
    }
  }
});


const styledBy = (property, mapping, cb) => (props) => cb(mapping[props[property]]);

const FilterColorButton = withStyles(styles)(({
  classes,
  className,
  colorType,
  ...props
}) => (
  <Button
    className={cx(classes.root, className)}
    {...props}
  />
))


const FilterBlock = ({
  globalFilter,
  filterType,
  currentFilter,
  label,
  onChange,
}) => {
  const renderItems = () =>
   currentFilter.map((item) => {
    const active =  globalFilter[filterType].indexOf(item) > -1
    const data = {
      type: filterType,
      value: item
    }

    return (
      filterType === "color" ?
      <FilterColorButton
        key={item}
        className={{
          [filterType]: filterType,
        }}
        size="small"
        disableFocusRipple
        colorType={item}
        onClick={() => onChange(data)}
      >
        {active && <Done fontSize="small" />}
      </FilterColorButton>
      :
      <Button
        key={item}
        className={cx({
          [filterType]: filterType,
        })}
        onClick={() => onChange(data)}
        color={active ? "primary": "default"}
        variant={active ? "contained": "outlined"}
      >
        {item}
      </Button>
    )})

  return (
    <div className="FilterBlock">
      <Typography variant="h6">
        {label}
      </Typography>
      <div className="FilterBlock-content">
        {renderItems()}
      </div>
    </div>
  )
}

export default FilterBlock
