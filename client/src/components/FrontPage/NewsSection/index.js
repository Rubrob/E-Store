import React from "react";
import "./styles.sass";
import {Typography, Button, Box} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";


const NewsButton = withStyles(() => ({
  root: {
    color: "#444",
    background: "rgba(255, 255, 255, .8)",
    "&:hover": {
      background: "rgba(255, 255, 255, .1)",
      color: "#fff"
    },
  }
}))(Button)


const NewsSection = (props) => {
  const renderNews = () => (
    props.news.map((item, index) => (
      <div key={index} className="news-cont-item">
        <img src={item.image} alt="img" />
        <div>
          <Typography gutterBottom>{item.text}</Typography>
          <NewsButton color="inherit" children={"Shop"} />
        </div>
      </div>
    ))
  )

  return (
    <div className="news">
      <Box mb={5}>
        <Typography variant="h4" align="center">
          STORE NEWS
        </Typography>
      </Box>
      <div className="news-cont">
        {renderNews()}
      </div>
    </div>
  )
}

export default NewsSection
