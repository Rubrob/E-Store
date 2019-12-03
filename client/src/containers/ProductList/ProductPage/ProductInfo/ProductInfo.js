import React, { useState, useEffect } from "react"
import "./ProductInfo.sass"
import {
  Typography,
  Avatar,
  Button,
  Fab,
  Box
} from "@material-ui/core"
import { renderTitle } from "../../../../utils"
import { notify } from "./../../../../components/Toaster/Toaster"
import ProductSlider from "../ProductSlider/ProductSlider"


const ProductInfo = ({
  currency,
  changeColor,
  addToCart,
  data,
  url,
}) => {
  const [state, setstate] = useState({
    qty: 1,
    size: 0,
  })
  useEffect(() => {
    setstate({
      qty: 1,
      size: data.sizes &&
      data.sizes.length === 1 &&
      data.sizes[0] === "One Size"
        ? "One Size" : 0,
    });
  }, [data.sizes])

  const {
    colors = [],
    images = [],
    sizes = [],
  } = data

  const add = () => {
    addToCart({
      ...data,
      ...state,
      img: images[0],
      url: url
    })
    notify("success", "Succesfully added to your cart")
  }

  const renderColors = () => (
    colors.length >= 2 && (
      <div className="avColors">
        {colors.map((color) => (
          <Avatar
            key={color.id}
            src={color.preview}
            variant="square"
            onClick={() => changeColor(data.productId, color.id)}
          />
        ))}
      </div>
    )
  )

  const renderSizes = () => (
    sizes.length > 2 &&
    <>
      <Typography variant="subtitle1" paragraph>
        Select Size
      </Typography>
      <div className="avSizes">
        {sizes.map((size) => (
          <Button
            key={size}
            color={state.size === size  ? "primary" : "default"}
            variant={state.size === size ? "contained" : "outlined"}
            onClick={() => setstate({...state, size})}
            children={size}
            className="avSizes-size"
            disableTouchRipple
          />
        ))}
      </div>
    </>
  )

  const renderProductTitle = () => (
    <>
      <div>
        <Typography variant="subtitle1" component="div">
          {renderTitle({
            gender: data.gender,
            subcategory: data.subcategory,
            category: data.category
          })}
        </Typography>
        <Typography variant="h4" component="div" children={data.title} />
      </div>
      <Typography component="span">
        {currency}{data.price}
      </Typography>
    </>
  )


  return (
    <>
      <Box className='ProductInfo-title desktop'>
        {renderProductTitle()}
      </Box>
      <div className="ProductInfo-content">
        <ProductSlider images={images} />
        <div className="ProductInfo-content-main">
          <Box className='ProductInfo-title mobile'>
            {renderProductTitle()}
          </Box>
          <div className="ProductInfo-content-main-colors">
            {renderColors()}
          </div>
          <div className="ProductInfo-content-main-sizes">
            {renderSizes()}
          </div>
          <Fab
            color="primary"
            variant="extended"
            onClick={add}
            disabled={!state.size}
            children="Add To Cart"
          />
        </div>
      </div>
    </>
  )
}

export default ProductInfo
