import React from 'react'
import './Footer.sass'
import { withRouter } from 'react-router-dom'
import { Typography, IconButton } from '@material-ui/core'
import {withStyles} from '@material-ui/styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const SocialIconButton = withStyles(() =>({
  root: {
    padding: 10,
    marginRight: 5,
    color: '#444',
    background: 'rgba(255, 255, 255, .45)',
    '&:hover': {
      background: '#fff'
    }
  }
}))(IconButton)

const Footer = (props) => {
  const isCartLocation = props.location.pathname.indexOf('cart') !== -1

  return (
    <footer className='Footer'>
      <div className='Footer-main'>
        <div className='Footer-main-contacts'>
          <Typography variant='h6' component='h4' paragraph children={'Contact Us:'} />
          <Typography variant='body2' component='div' children={'+ 380 99 999 12 30'} />
          <Typography variant='body2' component='div' children={'react-store@awesome.com'} />
          <Typography variant='body2' component='div' children={'Store Address 21 St'} />
        </div>

        <div className='Footer-main-social'>
          <Typography variant='h6' component='h4' paragraph children={'Follow Us:'} />
          <SocialIconButton className='Footer-main-social-icon' children={<FontAwesomeIcon icon={['fab', 'facebook']} size='xs' />} />
          <SocialIconButton className='Footer-main-social-icon' children={<FontAwesomeIcon icon={['fab', 'twitter']} size='xs' />} />
          <SocialIconButton className='Footer-main-social-icon' children={<FontAwesomeIcon icon={['fab', 'youtube']} size='xs' />} />
          <SocialIconButton className='Footer-main-social-icon' children={<FontAwesomeIcon icon={['fab', 'instagram']} size='xs' />} />
        </div>

      </div>
        <Typography
          variant='caption'
          align='center'
          children={`© ${new Date().getFullYear()} E-Store, Inc. All Rights Reserved`}
          className={`Footer-main-rights ${isCartLocation ? 'cart-mode' : ''}`} />
    </footer>
  )
}

export default withRouter(Footer)