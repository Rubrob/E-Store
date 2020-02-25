import React from "react";
import "./styles.sass";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";

const OrderItem = ({ color, product, currency, quantity, size }) => {
  const url = "/pp/" + product.slug + "/" + color.slug;
  return (
    <div className="OrderItem">
      <div className="OrderItem-img">
        <Link to={url}>
          <img src={color.preview_image} alt="img" />
        </Link>
      </div>
      <div className="OrderItem-info">
        <Typography component="div" color="textPrimary" className="OrderItem-info-title">
          <Link to={url}>{product.title}</Link>
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {product.subtitle}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="div">
          Color: {color.color}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="div">
          Size: {size}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="div">
          Qty: {quantity} / {currency}
          {color.price}
        </Typography>
        <Typography variant="body2" color="textPrimary" component="div">
          {currency}
          {quantity * color.price}
        </Typography>
      </div>
    </div>
  );
};

export default OrderItem;
