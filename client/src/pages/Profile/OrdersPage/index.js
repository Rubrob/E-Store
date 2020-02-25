import React from "react";
import "./styles.sass";
import { Card, Typography } from "@material-ui/core";
import { totalCalculation } from "utils";
import OrderItem from "../OrderItem";
import moment from "moment";

const OrderPage = ({ orders, currency, getUserOrders }) => {
  React.useEffect(() => {
    getUserOrders();
  }, [getUserOrders]);

  return (
    <div className="orderPage">
      <Typography variant="h5" component="h2" align="center" className="orderPage-title">
        My Orders
      </Typography>
      <div>
        {!orders.length ? (
          <Typography
            variant="subtitle1"
            component="div"
            align="center"
            children="You don't have any orders yet"
          />
        ) : (
          orders.map(({ items, created_at }, index) => (
            <Card className="orderPage-block" key={index}>
              {items.map(({ _id, color, product, size, quantity }) => (
                <OrderItem
                  key={_id}
                  color={color}
                  product={product}
                  size={size}
                  quantity={quantity}
                  currency={currency}
                />
              ))}
              <Typography variant="h6" component="div" className="orderPage-total">
                Total:{" "}
                <span>
                  {currency}
                  {totalCalculation(items)}
                </span>
              </Typography>
              <Typography
                align="left"
                variant="caption"
                style={{ margin: "0 0 8px 8px", display: "block" }}
              >
                {moment(created_at).format("MMM DD, YYYY HH:mm")}
              </Typography>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default OrderPage;
