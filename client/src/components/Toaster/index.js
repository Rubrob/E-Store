import React from "react";
import {Box} from "@material-ui/core";
import {Error, CheckCircle} from "@material-ui/icons";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const colors = {
  error: "#f05",
  success: "#0c0"
}

const settings = {
  closeButton: false,
  position: "top-center",
  autoClose: 2000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true
}

const setIcon = (type) => (
  type === "error" ? <Error /> :
  type === "success" ? <CheckCircle /> :
  null
)

const template = (type, msg) => (
  <Box
    display="flex"
    textAlign="center"
    alignItems="center"
    color={colors[type]}
  >
    {setIcon(type)}
    <Box width={1} p={2}>{msg}</Box>
  </Box>
)

export const notify = (type, msg) => {
  return toast(
    template(type, msg),
    {...settings}
  )
}

export default () => <ToastContainer />
