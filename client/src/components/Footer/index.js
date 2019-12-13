import React from "react";
import "./styles.sass";
import {Typography, IconButton} from "@material-ui/core";
import InstagramIcon from "@material-ui/icons/Instagram";
import YouTubeIcon from "@material-ui/icons/YouTube";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import cx from "classnames";


const contactInfo = {
  address: "Store Address 21 St",
  email: "react-store@awesome.com",
  phone:  "+380 (99) 999 12 30"
}

const contacSocial = [
  <TwitterIcon fontSize="small" />,
  <FacebookIcon fontSize="small" />,
  <YouTubeIcon fontSize="small" />,
  <InstagramIcon fontSize="small" />,
]

const Footer = ({isCartLocation}) => {
  return (
    <footer className="Footer">
      <div className="Footer-main">
        <div className="Footer-main-contacts">
          <Typography variant="h6" component="h4" paragraph>
            Contact Us:
          </Typography>
          {Object.values(contactInfo).map((item) => (
            <Typography
              key={item}
              variant="body2"
              component="div"
            >
              {item}
            </Typography>
          ))}
        </div>
        <div className="Footer-main-social">
          <Typography variant="h6" component="h4" paragraph>
            Follow Us:
          </Typography>
          {contacSocial.map((item, index) => (
            <IconButton
              key={index}
              size="small"
              className="Footer-main-social-icon"
            >
              {item}
            </IconButton>
          ))}
        </div>

      </div>
        <Typography
          variant="caption"
          align="center"
          component="div"
          className={cx("Footer-main-rights", {
            isCartLocation
          })}
        >
          © {new Date().getFullYear()} E-Store, Inc. All Rights Reserved
        </Typography>
    </footer>
  )
}

export default Footer
