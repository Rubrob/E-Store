import React from "react";
import "./styles.sass";
import {
  Typography,
  Avatar,
  Button,
  Fab,
  Box,
  Hidden
} from "@material-ui/core";
import ProductSlider from "../ProductSlider";
import _pick from "lodash/pick";
import { parsePrice } from "utils";
import cx from "classnames";
import { Link } from "react-router-dom";

const ProductInfo = ({ currency, addCartItem, data }) => {
  const [state, setstate] = React.useState({
    quantity: 1
  });

  React.useEffect(() => {
    const { sizes } = data.color;
    const sku =
      sizes.length === 1 && sizes[0].size === "OSFA" ? sizes[0].sku : undefined;

    setstate({ ...state, sku });
  }, [data]);

  const onAdd = () => addCartItem({ ...state, price: data.color.price });

  const renderColors = () =>
    data.product.colors.length >= 2 && (
      <div className="avColors">
        {data.product.colors.map(({ preview_image, slug }) => (
          <Avatar
            key={slug}
            children="I"
            className={cx({
              "avColors-active": data.color.slug === slug
            })}
            src={preview_image}
            variant="square"
            component={Link}
            to={`/pp/${data.product.slug}/${slug}`}
          />
        ))}
      </div>
    );

  const renderSizes = () =>
    data.color.sizes.length > 2 && (
      <>
        <Box display="flex" justifyContent="space-between">
          <Typography paragraph>Select Size</Typography>
          <Typography
            paragraph
            component="a"
            target="_blank"
            href="https://www.nike.com/us/en_us/sfg/unisex-shoe-sizing-chart"
          >
            Size Guide
          </Typography>
        </Box>
        <div className="avSizes">
          {data.color.sizes.map(({ size, sku, availability }) => (
            <Button
              key={sku}
              color={state.sku === sku ? "primary" : "default"}
              variant={state.sku === sku ? "contained" : "outlined"}
              onClick={() => setstate({ ...state, sku, size })}
              className="avSizes-size"
              disableTouchRipple
              disabled={!availability}
            >
              {size}
            </Button>
          ))}
        </div>
      </>
    );

  const renderProductTitle = () => (
    <Box display="flex" justifyContent="space-between" width={1}>
      <div>
        <Typography>{data.product.subtitle}</Typography>
        <Typography variant="h4">{data.product.title}</Typography>
      </div>
      <Typography component="span">
        {parsePrice(data.color.price, currency)}
      </Typography>
    </Box>
  );

  return (
    <>
      <Hidden only={["md", "lg", "xl"]}>
        <div className="ProductInfo-title">{renderProductTitle()}</div>
      </Hidden>
      <div className="ProductInfo-content">
        <ProductSlider images={data.color.slides} />
        <div className="ProductInfo-content-main">
          <Hidden smDown>
            <div className="ProductInfo-title">{renderProductTitle()}</div>
          </Hidden>
          <div className="ProductInfo-content-main-colors">
            {renderColors()}
          </div>
          <div className="ProductInfo-content-main-sizes">{renderSizes()}</div>
          <Fab
            color="primary"
            variant="extended"
            onClick={onAdd}
            disabled={!state.sku}
          >
            Add To Cart
          </Fab>
        </div>
      </div>
    </>
  );
};

export default ProductInfo;
