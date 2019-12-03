import React from 'react'
import Toaster from '../Toaster/Toaster'
import ScrollToTop from '../ScrollToTop'
import Header from '../Header/Header'
import Footer from '../Footer/Footer';

const MainBlock = (props) => {
  return (
    <div>
      <Toaster />
      <ScrollToTop />
      <Header />
      {props.children}
      <Footer isCartLocation={props.isCartLocation} />
    </div>
  )
}

export default MainBlock
