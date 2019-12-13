import React, {useState} from "react";
import "./styles.sass";
import {Link} from "react-router-dom";
import {Typography, Hidden} from "@material-ui/core";
import {KeyboardArrowLeft, KeyboardArrowRight} from "@material-ui/icons";
import {renderTitle} from "utils";
import { colors as colorsType } from "constants/index";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


function ProductCard({product, currency}) {
  const {title, price, colors, subcategory, id, gender, category} = product

  const previews = colors.map((color) => (
    <Link key={color.id} to={`/pp/${id}/${color.id}`} className="previewImg">
      <img
        alt="product"
        src={color.preview}
        onMouseEnter={() => changeImage(color.id, color.preview)}
      />
    </Link>
  ))

  const [colorID, setColorID] = useState(colors[0].id)
  const [front, setFront] = useState(colors[0].preview)
  const [slide, setSlide] = useState(0)

  const handleSlide = (type) => {
    const slidesCount = colors.length
    const slideWidth = 60
    const slidesToShow = 3
    switch(type){
      case "next":
        if(slide <= -(slidesCount - (slidesCount % slidesToShow)) * slideWidth){
          setSlide(-(slidesCount - (slidesCount % slidesToShow)) * slideWidth)
          // console.log(-(slidesCount * slideWidth) - 180)
          // console.log(-(slidesCount - slidesToShow) * slideWidth)
          // console.log(-(slidesCount + 1) * slideWidth, (slidesCount % slidesToShow), slidesCount)
        } else {
          setSlide(slide - 180)
        }
        break;

      case "prev":
        if(slide >= -(slidesToShow-1) * slideWidth) {
          setSlide(0)
        } else {
          setSlide(slide + (slideWidth * slidesToShow))
        }
        break;
      default:
        break;
      }
  }

  const changeImage = (colorID, img) => {
    setColorID(colorID)
    setFront(img)
  }

  const renderColors = () => (
    <>
      {colors.map(({color}, i) => (
        (i < 4) && (
          <span
            key={color}
            className="color"
            style={{background: colorsType[color]}}
          />
        )
      ))}
      <Typography
        variant="caption"
        color="textSecondary"
        className="colorsMore"
      >
        {colors.length > 4 && "+ More"}
      </Typography>
    </>
  )

  return (
    <div className="productCard">
      <Link to={`/pp/${id}/${colorID}`} className="frontImg">
        <img src={front} alt="img"/>
      </Link>

      {colors.length > 1 && (
        <Hidden xsDown>
          <div className="previewBox">
            <div className="previewImgs">
              <div className="previewSlider" style={{left: slide}}>
                {previews}
              </div>
            </div>
            {colors.length > 3 && (
              <>
                <span
                  className="arrow left"
                  onClick={() => handleSlide("prev")}
                >
                  <KeyboardArrowLeft fontSize="small" />
                </span>
                <span
                  className="arrow right"
                  onClick={() => handleSlide("next")}
                >
                  <KeyboardArrowRight fontSize="small" />
                </span>
              </>
            )}
          </div>
        </Hidden>
      )}

      <div className="productInfo">
        <Typography
          className="title"
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
        >
          {renderTitle({gender, subcategory, category})}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
        >
          {currency}{price}
        </Typography>
        <div className="colors">
          {renderColors()}
        </div>
      </div>
    </div>
  )
}

export default ProductCard
