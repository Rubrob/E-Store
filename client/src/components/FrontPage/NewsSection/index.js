import React from "react";
import "./styles.sass";
import {Typography, Button, Box} from "@material-ui/core";


const NewsSection = (props) => {
  const renderNews = () => (
    props.news.map((item, index) => (
      <div key={index} className="news-cont-item">
        <img src={item.image} alt="img" />
        <div>
          <Typography gutterBottom>{item.text}</Typography>
          <Button color="default" variant='contained'>
            Shop
          </Button>
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
