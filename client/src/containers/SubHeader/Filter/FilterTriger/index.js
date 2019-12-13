import React from "react"
import {
  useMediaQuery
} from "@material-ui/core"
import TuneIcon from "@material-ui/icons/Tune";
import StyledButton from "components/StyledButton";


const FilterTriger = ({
  toggle,
  label
}) => {
  const match = useMediaQuery("(max-width: 959.5px)")
  return (
    <StyledButton
      className="FilterTriger"
      onClick={toggle}
      endIcon={<TuneIcon fontSize="small" />}
    >
      {!match && label}
    </StyledButton>
  )
}

export default FilterTriger
