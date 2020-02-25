import React from "react";
import "./styles.sass";
import { IconButton, Hidden, SwipeableDrawer } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import MenuListItem from "./MenuListItem";

export const MobileMenuContext = React.createContext(null);

const MobileMenu = ({ menu, onLogOut, isAuthenticated }) => {
  const [open, setOpen] = React.useState(false);
  const onToggle = () => setOpen(!open);

  const renderMenuItems = menu => {
    return menu.map(({ title, slug }) => (
      <MenuListItem key={title} title={title} link={`/p/${slug}`} />
    ));
  };

  const renderMenu = menu => {
    return menu.map(({ title, categories, subcategories }) =>
      categories ? (
        <MenuListItem key={title} title={title}>
          {renderMenu(categories)}
        </MenuListItem>
      ) : (
        <MenuListItem key={title} title={title}>
          {renderMenuItems(subcategories)}
        </MenuListItem>
      )
    );
  };

  const renderAccountMenu = () => {
    return isAuthenticated ? (
      <MenuListItem
        title="My Account"
        className="listItem -header"
        icon={<AccountCircleIcon />}
      >
        <MenuListItem
          className="listItem"
          title="Orders"
          link="/profile/orders"
        />
        <MenuListItem className="listItem" title="Profile" link="/profile" />
        <MenuListItem
          pure
          className="listItem"
          title="Log Out"
          direction={false}
          onClick={onLogOut}
        />
      </MenuListItem>
    ) : (
      <MenuListItem
        className="listItem -header noIcon"
        title="Join / Log In"
        link="/register"
      />
    );
  };

  return (
    <Hidden mdUp>
      <MobileMenuContext.Provider value={{ onClose: onToggle }}>
        <IconButton color="primary" onClick={onToggle}>
          <MoreVertIcon />
        </IconButton>
        <SwipeableDrawer
          anchor="right"
          open={open}
          onClose={onToggle}
          onOpen={onToggle}
          className="MobileMenu"
        >
          <div>
            {renderAccountMenu()}
            <div>{renderMenu(menu)}</div>
          </div>
        </SwipeableDrawer>
      </MobileMenuContext.Provider>
    </Hidden>
  );
};

export default MobileMenu;
