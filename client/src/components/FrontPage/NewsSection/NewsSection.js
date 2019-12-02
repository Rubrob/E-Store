import React from 'react'
import './NewsSection.sass'
import { Typography, Button, Box } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

const NewsButton = withStyles(() => ({
  root: {
    color: '#444',
    background: 'rgba(255, 255, 255, .8)',
    '&:focus': {
      background: 'rgba(255, 255, 255, .8)',
    },
    '&:hover': {
      background: 'rgba(255, 255, 255, .1)',
      color: '#fff'
    },
  }
}))(Button)

const News = ({img, text}) => (
  <div className='news-cont-item'>
    <img src={img} alt='img' />
    <div>
      <Typography gutterBottom>{text}</Typography>
      <NewsButton color='inherit' children={'Shop'} />
    </div>
  </div>
)

const NewsSection = () => (
  <div className='news'>
    <Box mb={5}>
      <Typography variant='h4' align='center' children='STORE NEWS' />
    </Box>
    <div className='news-cont'>
      <News img={'../images/slide_4.jpg'} text={'Shoes made for running high'} />
      <News img={'../images/slide_5.jpg'} text={'Waterproof features'} />
    </div>
  </div>
)

export default NewsSection
