import React from "react";
import "./styles.sass";
import { Link } from "react-router-dom";
import {
  Typography,
  Fab,
  Select,
  MenuItem,
  InputBase
} from "@material-ui/core";
import { parsePrice } from "utils";
import _range from "lodash/range";

// const CartItemSelect = ({ label, value, options, onChange }) => (
//   <Typography variant="body2" color="textSecondary" component="div">
//     {label}
//     <Select
//       className="CartItemSelect"
//       defaultValue={value}
//       input={<InputBase className="CartItemSelect-input" />}
//       onChange={evt => onChange(evt.target.value)}
//       style={{ fontSize: "14px", color: "inherit" }}
//     >
//       {options.map(item => (
//         <MenuItem key={item} value={item}>
//           {item}
//         </MenuItem>
//       ))}
//     </Select>
//   </Typography>
// );

const CartItem = ({ data, cartSkus, currency, onChange, onDelete }) => {
  const handleSelectChange = evt =>
    onChange(
      {
        quantity: data.quantity,
        sku: data.sku,
        [evt.target.name]: evt.target.value
      },
      data.sku
    );

  return (
    <div className="ProductToBuy">
      <div className="ProductToBuy-content">
        <Link to={"/pp/" + data.url} className="ProductToBuy-content-img">
          <img src={data.preview_image} alt="img" />
        </Link>

        <div className="ProductToBuy-content-data">
          <div>
            <Typography
              gutterBottom
              component="div"
              className="ProductToBuy-content-data-title"
            >
              <Link to={"/pp/" + data.url}>{data.title}</Link>
              <Typography variant="body2">
                {parsePrice(data.quantity * data.price, currency)}
              </Typography>
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {data.subtitle}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {data.color}
            </Typography>
            <div className="ProductToBuy-selects">
              <Typography variant="body2" color="textSecondary" component="div">
                Size{" "}
                <Select
                  className="CartItemSelect"
                  name="sku"
                  defaultValue={data.sku}
                  input={<InputBase className="CartItemSelect-input" />}
                  onChange={handleSelectChange}
                  style={{ fontSize: "14px", color: "inherit" }}
                >
                  {data.sizes.map(({ sku, size }) => (
                    <MenuItem
                      key={sku}
                      value={sku}
                      disabled={cartSkus.includes(sku)}
                    >
                      {size}
                    </MenuItem>
                  ))}
                </Select>
              </Typography>
              <Typography variant="body2" color="textSecondary" component="div">
                Quantity{" "}
                <Select
                  className="CartItemSelect"
                  defaultValue={data.quantity}
                  name="quantity"
                  input={<InputBase className="CartItemSelect-input" />}
                  onChange={handleSelectChange}
                  style={{ fontSize: "14px", color: "inherit" }}
                >
                  {_range(1, 11).map(item => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </Typography>
            </div>
          </div>
          <div className="ProductToBuy-controls">
            <Fab
              onClick={() => onDelete(data.sku)}
              color="primary"
              variant="extended"
              size="small"
            >
              <Typography variant="body2">Delete</Typography>
            </Fab>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
