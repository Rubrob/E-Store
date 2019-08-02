import React from 'react'
import './Footer.sass'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import logo from '../../logo.png'

function Footer(props) {
  return (
    <footer className='Footer'>
      <div className='Footer-main'>

        <div className='Footer-main-logo'>
          <img src={logo} alt='logo' />
        </div>

        <div className='Footer-main-contacts'>
          <h4>Contact Us:</h4>
          <div>+380 99 999 12 30</div>
          <div>react-store@awesome.com</div>
          <div>Some Address 21 St</div>
        </div>

        <div className='Footer-main-social'>
          <h4>Follow Us:</h4>
          <FontAwesomeIcon icon={['fab', 'facebook']} className='Footer-main-social-icon'/>
          <FontAwesomeIcon icon={['fab', 'twitter']} className='Footer-main-social-icon'/>
          <FontAwesomeIcon icon={['fab', 'youtube']} className='Footer-main-social-icon'/>
          <FontAwesomeIcon icon={['fab', 'instagram']} className='Footer-main-social-icon'/>
        </div>

      </div>
      <div className='Footer-main-rights'>© {new Date().getFullYear()} React-Store, Inc. All Rights Reserved</div>
    </footer>
  )
}

export default Footer