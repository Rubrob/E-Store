import React, {useState} from "react";
import "./styles.sass";
import {Link} from "react-router-dom";
import {Typography, Box, Avatar, useMediaQuery} from "@material-ui/core";
import {renderTitle} from "utils";
import {colors as colorsType} from "constants/index";


const ProductCard = ({
  product,
  currency
}) => {
  const match = useMediaQuery("(max-width:600px)")
  const {title, price, colors, subcategory, _id, gender, category} = product
  const [preview, setPreview] = useState(false)
  const [mainImage, setMainImage] = useState({
    url: colors[0].preview || '../images/slide_4.jpg',
    id: colors[0]._id
  })

  const changeImage = (id, url) => setMainImage({url, id})
  const togglePreview = (option) => () => !match && setPreview(option)

  const renderPreviews = (variant) => {
    return <>
      {colors.map((item, index) => (
        (index < 4) && (
          variant === "circles" ? (
            <span
              key={item.color}
              className="ProductCard-colors-circle"
              style={{background: colorsType[item.color]}}
            />
          ) : variant === "images" ? (
            <Link
              key={item._id}
              to={`/pp/${_id}/${item._id}`}
              className="ProductCard-colors-image"
            >
              <Avatar
                src={item.preview}
                alt="product"
                variant="rounded"
                onMouseEnter={() => changeImage(item._id, item.preview)}
              />
            </Link>
          ) : null
        )
      ))}
      <Typography
        variant="caption"
        color="textSecondary"
        className="ProductCard-colors-plusMore"
      >
        {colors.length > 4 && `+ ${colors.length - 4} More`}
      </Typography>
    </>
  }

  return (
    <div
      className="ProductCard"
      onMouseEnter={togglePreview(colors.length > 1)}
      onMouseLeave={togglePreview(false)}
    >
      <Link
        to={`/pp/${_id}/${mainImage.id}`}
        className="ProductCard-mainImage"
      >
        <img src={mainImage.url} alt="img"/>
      </Link>

      <div className="ProductCard-info">
        <div className="ProductCard-info-content">
          <div>
            <Typography className="ProductCard-title">
              {title}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {renderTitle({gender, subcategory, category})}
            </Typography>
          </div>
          <Typography variant="body2">
            {currency}{price}
          </Typography>
        </div>
        {colors.length > 1 && (
          <Box mt={1} display="flex" alignItems="center" height={40}>
            {preview && !match ? (
              // <Hidden xsDown></Hidden>
              <div className="ProductCard-colors">
                {renderPreviews("images")}
              </div>
            ) : (
              <div className="ProductCard-colors">
                {renderPreviews("circles")}
              </div>
            )}
          </Box>
        )}
      </div>
    </div>
  )
}

export default ProductCard
