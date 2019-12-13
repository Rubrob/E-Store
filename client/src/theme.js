import {createMuiTheme} from '@material-ui/core/styles';
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

export default createMuiTheme({
  palette: {
    primary: {
      main: '#000000'
    },
    text: {
      secondary: '#777777'
    }
  },
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
    MuiTabs: {
      root: {
        '&': {
          color: '#999',
          maxWidth: 320,
          margin: '0 auto',
          borderBottom: '1px solid #e5e5e5',
          '& .MuiTab-root': {
            fontSize: 16,
            textTransform: 'none',
            '&:hover': {
              color: '#000',
            },
          },
          '& .Mui-selected': {
            color: '#000'
          }
        },
        '& .MuiTabs-indicator': {
          backgroundColor: '#000'
        }
      },
    },
    MuiMenu: {
      paper: {
        minWidth: 150,
        border: '1px solid',
        borderColor: '#e5e5e5'
      }
    }
  },
});
