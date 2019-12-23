import React from "react";
import "./styles.sass";
import {Card, Typography} from "@material-ui/core";
import {totalCalculation} from "utils";
import CheckoutProduct from "containers/Checkout/CheckoutCart/CheckoutProduct";
import moment from "moment";


const OrderPage = ({
  orders,
  currency
}) => {
  return (
    <div className="orderPage">
      <Typography
        variant="h5"
        component="h2"
        align="center"
        className="orderPage-title"
        children="My Orders"
      />
      <div>
        {!orders.length ? (
          <Typography
            variant="subtitle1"
            component="div"
            align="center"
            children="You don't have any orders yet"
          />
        ) : (
          orders.map(({order}, index) => (
            <Card className="orderPage-block" key={index}>
              {order.map((p, i) => (
                <CheckoutProduct key={i} withUrl info={p} currency={currency} />
              ))}
              <Typography variant="h6" component="div" className="orderPage-total">
                Total: <span>{currency}{totalCalculation(order)}</span>
              </Typography>
              <Typography align="left" variant="caption" style={{margin: '0 0 8px 8px', display:"block"}}>
                {moment(new Date()).format("MMM DD, YYYY HH:mm")}
              </Typography>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}

export default OrderPage
