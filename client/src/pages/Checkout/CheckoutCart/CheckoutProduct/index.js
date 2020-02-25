import React from "react";
import "./styles.sass";
import { Typography } from "@material-ui/core";

const CheckoutProduct = ({ info, currency }) => {
  return (
    <div className="checkoutProduct">
      <div className="checkoutProduct-img">
        <img src={info.preview_image} alt="img" />
      </div>
      <div className="checkoutProduct-info">
        <Typography component="div" color="textPrimary" className="checkoutProduct-info-title">
          {info.title}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {info.subtitle}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="div">
          Color: {info.color}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="div">
          Size: {info.size}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="div">
          Qty: {info.quantity} / {currency}
          {info.price}
        </Typography>
        <Typography variant="body2" color="textPrimary" component="div">
          {currency}
          {info.quantity * info.price}
        </Typography>
      </div>
    </div>
  );
};

export default CheckoutProduct;
