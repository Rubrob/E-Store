import { createMuiTheme } from "@material-ui/core/styles";
// import defaultTheme from "@material-ui/core/styles/defaultTheme";
// console.log("defaultTheme", defaultTheme);

const FIELDS_COLORS = {
  static: {
    label: "#999",
    field: "#e5e5e5"
  },
  focused: {
    label: "#999",
    field: "#999"
  },
  hover: {
    label: "#777",
    field: "#777"
  }
};

export default createMuiTheme({
  palette: {
    primary: {
      main: "#000"
      // main: '#455a64'
    },
    text: {
      secondary: "#757575"
    }
  },
  overrides: {
    MuiFormControl: {
      root: {
        "& .MuiInputBase-root": {
          "& fieldset": {
            borderColor: FIELDS_COLORS.static.field
          },
          "&:not(.Mui-error).Mui-focused fieldset": {
            borderColor: FIELDS_COLORS.focused.field
          },
          "&:not(.Mui-error).Mui-focused": {
            "&::before, &::after": {
              borderColor: FIELDS_COLORS.focused.field
            }
          },
          "&:not(.Mui-focused):not(.Mui-error)": {
            "&::before, &::after": {
              borderColor: FIELDS_COLORS.static.field
            }
          }
        },

        "&:hover": {
          "& .MuiInputBase-root": {
            "&:not(.Mui-focused):not(.Mui-error)": {
              "& fieldset": {
                borderColor: FIELDS_COLORS.hover.field
              },
              "&::before, &::after": {
                borderColor: FIELDS_COLORS.hover.field
              }
            }
          },
          "& .MuiInputLabel-root": {
            "&:not(.Mui-error):not(.Mui-focused)": {
              color: FIELDS_COLORS.hover.label
            }
          }
        },

        "& .MuiInputLabel-root": {
          "&:not(.Mui-error):not(.Mui-focused)": {
            color: FIELDS_COLORS.static.label
          },
          "&:not(.Mui-error).Mui-focused": {
            color: FIELDS_COLORS.focused.label
          }
        },
        "& .MuiFormHelperText-root:not(.Mui-error):not(.Mui-focused)": {
          color: FIELDS_COLORS.static.label
        }
      }
    },
    MuiTabs: {
      // root: {
      //   '&': {
      //     color: '#999',
      //     maxWidth: 320,
      //     margin: '0 auto',
      //     borderBottom: '1px solid #e5e5e5',
      //     '& .MuiTab-root': {
      //       fontSize: 16,
      //       textTransform: 'none',
      //       '&:hover': {
      //         color: '#000',
      //       },
      //     },
      //     '& .Mui-selected': {
      //       color: '#000'
      //     }
      //   },
      //   '& .MuiTabs-indicator': {
      //     backgroundColor: '#000'
      //   }
      // },
    },
    MuiMenu: {
      paper: {
        minWidth: 150,
        border: "1px solid",
        borderColor: "#e5e5e5"
      }
    }
  }
});
