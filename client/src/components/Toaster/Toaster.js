import React from 'react'
import './Toaster.sass'
import { Error, CheckCircle } from '@material-ui/icons'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const notify = (type, message) => {
  if(type === 'error'){
    return toast.error(
      <div className='toaster-content'>
        <Error />
        <div>{message}</div>
      </div>, {
      closeButton: false,
      className: 'toaster error',
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true
    });
  }

  if(type === 'success'){
    return toast.success(
      <div className='toaster-content'>
        <CheckCircle />
        <div>{message}</div>
      </div>
      , {
      closeButton: false,
      className: 'toaster success',
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true
    });
  }
}

function Toaster(props) {
  return (
    <ToastContainer />
  )
}

export default Toaster