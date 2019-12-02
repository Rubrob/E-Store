import React from 'react'
import './Toaster.sass'
import { Error, CheckCircle } from '@material-ui/icons'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import cx from 'classnames'


const settings = {
  closeButton: false,
  position: 'top-center',
  autoClose: 2000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true
}

const setIcon = (type) => (
  type === 'error' ? <Error /> :
  type === 'success' ? <CheckCircle /> :
  null
)

const template = (type, msg) => (
  <div className={cx('toaster-content', {[type]: type})}>
    {setIcon(type)}
    <div>{msg}</div>
  </div>
)

export const notify = (type, msg) => {
  return toast[type](
    template(type, msg),
    {...settings, className: 'toaster'}
  )
}

export default () => <ToastContainer />