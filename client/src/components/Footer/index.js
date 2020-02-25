import React from "react";
import "./styles.sass";
import { Typography, IconButton } from "@material-ui/core";
import InstagramIcon from "@material-ui/icons/Instagram";
import YouTubeIcon from "@material-ui/icons/YouTube";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import cx from "classnames";

const contactInfo = {
  address: "Store Address 21 St",
  email: "react-store@awesome.com",
  phone: "+380 (99) 999 12 30"
};

const contacSocial = [
  <TwitterIcon fontSize="small" />,
  <FacebookIcon fontSize="small" />,
  <YouTubeIcon fontSize="small" />,
  <InstagramIcon fontSize="small" />
];

const Footer = props => {
  return (
    <footer className="Footer">
      <div className="Footer-main">
        <div className="Footer-main-contacts">
          <Typography variant="h6" paragraph>
            Contact Us:
          </Typography>
          {Object.values(contactInfo).map(item => (
            <Typography key={item} variant="body2">
              {item}
            </Typography>
          ))}
        </div>
        <div className="Footer-main-social">
          <Typography variant="h6" paragraph>
            Follow Us:
          </Typography>
          {contacSocial.map((item, idx) => (
            <IconButton
              key={idx}
              size="small"
              color="primary"
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
          isCartLocation: props.isCartLocation
        })}
      >
        © {new Date().getFullYear()} E-Store, Inc. All Rights Reserved
      </Typography>
    </footer>
  );
};

export default Footer;
