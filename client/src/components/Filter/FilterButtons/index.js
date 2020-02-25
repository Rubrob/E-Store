import React from "react";
import { Button, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import cx from "classnames";
import DoneIcon from "@material-ui/icons/Done";
import { colors } from "constants/index";

const styles = theme => ({
  root: {
    width: 35,
    height: 35,
    minHeight: 35,
    minWidth: 35,
    borderRadius: 50,
    border: "1px solid #e5e5e5",
    color: styledBy("colorType", colors, color =>
      theme.palette.getContrastText(color)
    ),
    backgroundColor: styledBy("colorType", colors, color => color),
    "&:hover": {
      backgroundColor: styledBy("colorType", colors, color => color)
    }
  }
});

const styledBy = (property, mapping, cb) => props =>
  cb(mapping[props[property]]);

export const ColorButton = withStyles(styles)(
  ({ classes, className, colorType, active, ...props }) => (
    <Button
      className={cx(classes.root, className)}
      size="small"
      disableFocusRipple
      {...props}
    >
      {active && <DoneIcon fontSize="small" />}
    </Button>
  )
);

export const FilterButton = ({ active, ...props }) => (
  <Button
    color="primary"
    disableTouchRipple
    // disableRipple
    variant={active ? "contained" : "outlined"}
    {...props}
  />
);

export const ListButton = withStyles({
  root: {
    margin: "4px 0",
    cursor: "pointer",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  text: {
    padding: "8px 0"
  }
})(({ active, children, classes, className, ...props }) => (
  <div className={cx(classes.root, className)} {...props}>
    <Typography className={classes.text} variant="body2">
      {children}
    </Typography>
    {active && <DoneIcon fontSize="small" />}
  </div>
));
