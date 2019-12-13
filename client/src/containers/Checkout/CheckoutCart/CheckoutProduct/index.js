import React from "react";
import "./styles.sass";
import {Link} from "react-router-dom";
import {Typography} from "@material-ui/core";


const CheckoutProduct = ({
  info,
  withUrl,
  currency
}) => {
  return (
    <div className="checkoutProduct">
      <div className="checkoutProduct-img">
        {withUrl ? (
          <Link to={info.url}>
            <img src={info.img} alt="img" />
          </Link>
        ) : (
          <img src={info.img} alt="img" />
        )}
      </div>
      <div className="checkoutProduct-info">
        <Typography
          component="div"
          color="textPrimary"
          className="checkoutProduct-info-title"
        >
          {withUrl ? (
            <Link to={info.url}>{info.title}</Link>
          ) : info.title}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="div">
          Gender: {info.gender}"s
        </Typography>
        <Typography variant="body2" color="textSecondary" component="div">
          Color: {info.color}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="div">
          Size: {info.size}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="div">
          Qty: {info.qty} / {currency}{info.price}
        </Typography>
        <Typography variant="body2" color="textPrimary" component="div">
          {currency}{info.qty * info.price}
        </Typography>
      </div>
    </div>
  )
}

export default CheckoutProduct
