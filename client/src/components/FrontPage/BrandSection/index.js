import React from "react";
import "./styles.sass";
import {Typography} from "@material-ui/core";


const BrandSection = ({brands}) => (
  <div className="brand_container">
    <Typography
      variant="h4"
      align="center"
    >
      OUR BRANDS
    </Typography>
    <div className="brand_wrapper">
      {Object.entries(brands).map(([key, value]) => (
        <img
          key={key}
          src={value}
          alt={key}
          className="brand"
        />
      ))}
    </div>
  </div>
)

export default BrandSection
