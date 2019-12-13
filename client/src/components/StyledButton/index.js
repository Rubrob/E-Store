import {Button} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";


export default withStyles({
  root: {
    minWidth: 50,
    width: 100,
    marginLeft: 5,
    height: 50,
    padding: 6,
    "@media (max-width: 959.5px)": {
      width: 50,
      marginLeft: 0,
      "& .MuiButton-endIcon": {
        margin: 0
      }
    },
  },
})((Button));
