import { createMuiTheme } from '@material-ui/core/styles';
// import defaultTheme from '@material-ui/core/styles/defaultTheme';

const fields = {
  static: {
    label: '#999',
    field: '#e5e5e5',
  },
  focused: {
    label: '#999',
    field: '#999',
  },
  hover: {
    label: '#777',
    field: '#777',
  }
}

export const theme = createMuiTheme({
  // palette: {
  //   primary: {
  //     main: orange[800],
  //   },
  //   secondary: {
  //     main: indigo[800],
  //   },
  //   error: {
  //     main: '#f44336'
  //   }
  // },
  overrides:{
    MuiFormControl: {
      root: {
        '& .MuiInputBase-root': {
          '& fieldset': {
            borderColor: fields.static.field
          },
          '&:not(.Mui-error).Mui-focused fieldset': {
            borderColor: fields.focused.field
          },
          '&:not(.Mui-error).Mui-focused': {
            '&::before, &::after': {
              borderColor: fields.focused.field
            }
          },
          '&:not(.Mui-focused):not(.Mui-error)': {
            '&::before, &::after': {
              borderColor: fields.static.field
            }
          },
        },


        '&:hover': {
          '& .MuiInputBase-root': {
            '&:not(.Mui-focused):not(.Mui-error)': {
              '& fieldset': {
                borderColor: fields.hover.field
              },
              '&::before, &::after': {
                borderColor: fields.hover.field
              }
            },
          },
          '& .MuiInputLabel-root': {
            '&:not(.Mui-error):not(.Mui-focused)': {
              color: fields.hover.label
            },
          }
        },

        '& .MuiInputLabel-root': {
          '&:not(.Mui-error):not(.Mui-focused)': {
            color: fields.static.label
          },
          '&:not(.Mui-error).Mui-focused': {
            color: fields.focused.label
          },
        },
        '& .MuiFormHelperText-root:not(.Mui-error):not(.Mui-focused)': {
          color: fields.static.label
        }
      }
    },
  },
});