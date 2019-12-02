import React from 'react'
import './Footer.sass'
import { Typography, IconButton } from '@material-ui/core'
import InstagramIcon from '@material-ui/icons/Instagram';
import YouTubeIcon from '@material-ui/icons/YouTube';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import cx from 'classnames';


const contactInfo = {
  address: 'Store Address 21 St',
  email: 'react-store@awesome.com',
  phone:  '+380 (99) 999 12 30'
}


const Footer = ({isCartLocation}) => {
  return (
    <footer className='Footer'>
      <div className='Footer-main'>
        <div className='Footer-main-contacts'>
          <Typography variant='h6' component='h4' paragraph children={'Contact Us:'} />
          <Typography variant='body2' component='div' children={contactInfo.phone} />
          <Typography variant='body2' component='div' children={contactInfo.email} />
          <Typography variant='body2' component='div' children={contactInfo.address} />
        </div>

        <div className='Footer-main-social'>
          <Typography variant='h6' component='h4' paragraph children={'Follow Us:'} />
          <IconButton size='small' className='Footer-main-social-icon' children={<TwitterIcon fontSize='small' />} />
          <IconButton size='small' className='Footer-main-social-icon' children={<FacebookIcon fontSize='small' />} />
          <IconButton size='small' className='Footer-main-social-icon' children={<YouTubeIcon fontSize='small' />} />
          <IconButton size='small' className='Footer-main-social-icon' children={<InstagramIcon fontSize='small' />} />
        </div>

      </div>
        <Typography
          variant='caption'
          align='center'
          component='div'
          children={`© ${new Date().getFullYear()} E-Store, Inc. All Rights Reserved`}
          className={cx(
            `Footer-main-rights`, {
              isCartLocation
            }
          )}
        />
    </footer>
  )
}

export default Footer
