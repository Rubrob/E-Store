import React from 'react'
import './Footer.sass'
import { withRouter } from 'react-router-dom'
import { Typography, IconButton } from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
          <IconButton size='small' className='Footer-main-social-icon' children={<FontAwesomeIcon icon={['fab', 'facebook']} />} />
          <IconButton size='small' className='Footer-main-social-icon' children={<FontAwesomeIcon icon={['fab', 'twitter']} />} />
          <IconButton size='small' className='Footer-main-social-icon' children={<FontAwesomeIcon icon={['fab', 'youtube']} />} />
          <IconButton size='small' className='Footer-main-social-icon' children={<FontAwesomeIcon icon={['fab', 'instagram']} />} />
        </div>

      </div>
        <Typography
          variant='caption'
          align='center'
          component='div'
          children={`© ${new Date().getFullYear()} E-Store, Inc. All Rights Reserved`}
          className={`Footer-main-rights ${isCartLocation ? 'cart-mode' : ''}`} />
    </footer>
  )
}

export default withRouter(Footer)