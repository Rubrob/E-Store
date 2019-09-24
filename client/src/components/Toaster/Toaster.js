import React from 'react'
import './Toaster.sass'
import { Error, CheckCircle } from '@material-ui/icons'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const settings = {
  closeButton: false,
  position: 'top-center',
  autoClose: 2000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true
}

const setIcon = (type) => {
  if(type === 'error') {
    return <Error />
  } else if (type === 'success') {
    return <CheckCircle />
  }
}

const template = (type, msg) => {
  return <div className='toaster-content'>
    {setIcon(type)}
    <div>{msg}</div>
  </div>
}

export const notify = (type, msg) => {
  switch(type) {
    case 'error':
      return toast.error(
        template('error', msg),
        {
          ...settings,
          className: 'toaster error',
        }
      );
    case 'success':
      return toast.success(
        template('success', msg),
        {
          ...settings,
          className: 'toaster success',
        }
      )
    default:
      return null
  }
}

export default () => <ToastContainer />