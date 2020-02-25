import React, { useState } from "react";
import "./styles.sass";
import {
  Slide,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar
} from "@material-ui/core";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import { Link } from "react-router-dom";
import { MobileMenuContext } from "./../index";

export const MenuItem = ({
  action = () => {},
  icon = null,
  direction = "front",
  title,
  link,
  ...props
}) => (
  <ListItem
    button
    title={title}
    onClick={action}
    {...props}
    component={link ? Link : "li"}
    to={link ? link : "#"}
  >
    {direction === "back" && <KeyboardArrowLeftIcon />}
    {icon && (
      <ListItemAvatar>
        <Avatar>{icon}</Avatar>
      </ListItemAvatar>
    )}
    <ListItemText primary={title} />
    {direction === "front" && !link && <KeyboardArrowRightIcon />}
  </ListItem>
);

const MenuListItem = ({ icon, title, link, ...props }) => {
  const { onClose } = React.useContext(MobileMenuContext);
  const [state, setState] = useState({
    open: false,
    header: ""
  });

  const handleOnClick = () => {
    onClose();
    if (props.onClick) props.onClick();
  };

  const handleOpen = () => {
    setState({
      open: true,
      header: title
    });
  };

  const handleClose = () => {
    setState({
      open: false,
      header: ""
    });
  };
  return (
    <>
      <MenuItem
        title={title}
        link={link}
        className="listItem"
        action={link || props.pure ? handleOnClick : handleOpen}
        icon={icon}
        {...props}
      />
      {!link && (
        <Slide direction="left" in={state.open} mountOnEnter unmountOnExit>
          <div className="MobileMenu-drawer">
            <MenuItem
              title={state.header}
              className="listItem -header"
              action={handleClose}
              direction="back"
            />
            {props.children}
          </div>
        </Slide>
      )}
    </>
  );
};

export default MenuListItem;
