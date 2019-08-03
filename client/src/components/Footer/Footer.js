import React from 'react'
import './Footer.sass'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { withRouter } from 'react-router-dom'

function Footer(props) {
  const isCartLocation = props.location.pathname.indexOf('cart') !== -1

  return (
    <footer className='Footer'>
      <div className='Footer-main'>
        <div className='Footer-main-contacts'>
          <div>Contact Us:</div>
          <div>+380 99 999 12 30</div>
          <div>react-store@awesome.com</div>
          <div>Some Address 21 St</div>
        </div>

        <div className='Footer-main-social'>
          <div>Follow Us:</div>
          <FontAwesomeIcon icon={['fab', 'facebook']} className='Footer-main-social-icon'/>
          <FontAwesomeIcon icon={['fab', 'twitter']} className='Footer-main-social-icon'/>
          <FontAwesomeIcon icon={['fab', 'youtube']} className='Footer-main-social-icon'/>
          <FontAwesomeIcon icon={['fab', 'instagram']} className='Footer-main-social-icon'/>
        </div>

      </div>
      <div className={`Footer-main-rights ${isCartLocation ? 'cart-mode' : ''}`}>© {new Date().getFullYear()} E-Store, Inc. All Rights Reserved</div>
    </footer>
  )
}

export default withRouter(Footer)