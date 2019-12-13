import React, {useState} from "react";
import {
  useMediaQuery,
  Menu,
  MenuItem,
} from "@material-ui/core";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import StyledButton from "components/StyledButton";


const Sort = ({
  sortByPrice,
  label
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const match = useMediaQuery("(max-width: 959.5px)")
  const handleOpen = (evt) => setAnchorEl(evt.currentTarget)
  const handleClose = () => setAnchorEl(null)
  const handleSort = (method) => {
    sortByPrice(method)
    handleClose()
  }

  return (
    <>
      <StyledButton
        className="Sort"
        onClick={handleOpen}
        endIcon={<ImportExportIcon fontSize="small" />}
      >
        {!match && label}
      </StyledButton>
      <Menu
        id="sort-menu"
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        className="Sort-menu"
      >
        <MenuItem onClick={() => handleSort("low")}>Price: Low - High</MenuItem>
        <MenuItem onClick={() => handleSort("high")}>Price: High - Low</MenuItem>
      </Menu>
    </>
  )
}

export default Sort
