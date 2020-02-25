import React, { useState } from "react";
import "./styles.sass";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import cx from "classnames";

const DesktopMenu = ({ menu }) => {
  const [state, setState] = useState(null);

  const mapSubcategories = subcategories =>
    subcategories.map(({ title, slug }) => {
      if (/All (Men|Women)'s/.test(title)) return null;
      return (
        <Typography
          key={title}
          to={`/p/${slug}`}
          onClick={() => setState(null)}
          component={Link}
          variant="body2"
          color="textSecondary"
          className="subcategory__block-title"
        >
          {title}
        </Typography>
      );
    });

  const menuItems = menu =>
    menu.map(({ title, slug, subcategories }) => (
      <div key={slug} className="category__block">
        <Typography
          variant="h6"
          component={Link}
          gutterBottom
          className="category__block-title"
          color="textPrimary"
          to={`/p/${slug}`}
          onClick={() => setState(null)}
        >
          {title}
        </Typography>
        <div className="subcategory__block">
          {mapSubcategories(subcategories)}
        </div>
      </div>
    ));

  const renderTrigers = () =>
    menu.map(({ title }) => (
      <Typography
        key={title}
        component="div"
        onMouseEnter={() => setState(title)}
        onMouseLeave={() => setState(null)}
        className={cx("triger", { active: state === title })}
      >
        {title}
      </Typography>
    ));

  const renderMenu = () =>
    menu.map(
      ({ title, categories }) =>
        state === title && (
          <div
            key={title}
            className="DesktopMenu-menu"
            onMouseEnter={() => setState(title)}
            onMouseLeave={() => setState(null)}
          >
            {menuItems(categories)}
          </div>
        )
    );

  return (
    <>
      <div className="DesktopMenu">{renderTrigers()}</div>
      {renderMenu()}
    </>
  );
};

export default DesktopMenu;
