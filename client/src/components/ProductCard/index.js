import React, { useState } from "react";
import "./styles.sass";
import { Link } from "react-router-dom";
import { Typography, Box, Avatar, useMediaQuery } from "@material-ui/core";
import { colors as colorsType } from "constants/index";
import { parsePrice } from "utils";

const ProductCard = ({
  title,
  subtitle,
  colors,
  productSlug,
  currency,
  ...props
}) => {
  const matchWidth = useMediaQuery("(max-width:600px)");
  const [isColors, setIsColors] = useState(false);
  const [previewColor, setPreviewColor] = useState({
    preview_image: colors[0].preview_image,
    price: colors[0].price,
    slug: colors[0].slug
  });

  React.useEffect(() => {
    setPreviewColor({
      preview_image: colors[0].preview_image,
      price: colors[0].price,
      slug: colors[0].slug
    });
  }, [colors]);

  const changeImage = values => setPreviewColor(values);

  const togglePreview = condition => () =>
    !matchWidth && setIsColors(condition);

  const renderPreviews = variant => {
    return (
      <>
        {colors.map(
          ({ color, slug, preview_image, price, ...rest }, idx) =>
            idx < 4 &&
            (variant === "circles" ? (
              <span
                key={rest._id}
                className="ProductCard-colors-circle"
                style={{ background: colorsType[color] }}
              />
            ) : variant === "images" ? (
              <Link
                key={rest._id}
                to={`/pp/${productSlug}/${slug}`}
                className="ProductCard-colors-image"
              >
                <Avatar
                  src={preview_image}
                  children={"I"}
                  style={{ height: 32, width: 32 }}
                  alt="product"
                  variant="rounded"
                  onMouseEnter={() =>
                    changeImage({ preview_image, price, slug })
                  }
                />
              </Link>
            ) : null)
        )}
        <Typography
          variant="caption"
          color="textSecondary"
          className="ProductCard-colors-plusMore"
        >
          {colors.length > 4 && `+ ${colors.length - 4} More`}
        </Typography>
      </>
    );
  };

  return (
    <div
      className="ProductCard"
      onMouseEnter={togglePreview(colors.length > 1)}
      onMouseLeave={togglePreview(false)}
    >
      <Link
        to={`/pp/${productSlug}/${previewColor.slug}`}
        className="ProductCard-mainImage"
      >
        <img src={previewColor.preview_image} alt="img" />
      </Link>

      <div className="ProductCard-info">
        <div className="ProductCard-info-content">
          <div>
            <Typography className="ProductCard-title">{title}</Typography>
            <Typography variant="body2" color="textSecondary">
              {subtitle}
            </Typography>
          </div>
          <Typography variant="body2">
            {parsePrice(previewColor.price, currency)}
          </Typography>
        </div>
        <Box mt={1} display="flex" alignItems="center" height={40}>
          {colors.length > 1 &&
            (isColors && !matchWidth ? (
              // <Hidden xsDown></Hidden>
              <div className="ProductCard-colors">
                {renderPreviews("images")}
              </div>
            ) : (
              <div className="ProductCard-colors">
                {renderPreviews("circles")}
              </div>
            ))}
        </Box>
      </div>
    </div>
  );
};

export default ProductCard;
