import React from "react";
import "./styles.sass";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Clear from "@material-ui/icons/Clear";
import Search from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";

export const SearchInputContext = React.createContext(null);

const SearchInput = ({
  onSearch,
  onGetSuggestions,
  onClose,
  onHideSuggestions,
  showClear,
  children,
  ...props
}) => {
  const [state, setState] = React.useState({
    value: "",
    timer: null
  });

  const handleOnChange = evt => {
    const { value } = evt.target;

    clearTimeout(state.timer);

    setState({ value });

    if (value.length >= 2) {
      setState({
        value,
        timer: setTimeout(async () => {
          await onGetSuggestions(value);
        }, 500)
      });
    }
  };

  const handleKeyUp = evt => {
    if (evt.keyCode === 13) {
      onSearch(evt.target.value);
      handleClick();
    }

    if (evt.keyCode === 27) {
      handleClick();
    }

    if (evt.target.value.length === 0) {
      if (onHideSuggestions) {
        onHideSuggestions();
      } else {
        handleClick();
      }
    }
  };

  const handleClick = () => {
    clearTimeout(state.timer);
    setState({ value: "", timer: null });
    if (onClose) {
      onClose();
    }
  };

  const handleMouseDown = evt => evt.preventDefault();

  return (
    <SearchInputContext.Provider
      value={{ onClose: handleClick, value: state.value }}
    >
      <FormControl className="SearchInput" fullWidth>
        <InputBase
          value={state.value}
          onChange={handleOnChange}
          onKeyUp={handleKeyUp}
          onFocus={() => window.scrollTo(0, 0)}
          placeholder="Search"
          {...props}
          startAdornment={
            <InputAdornment>
              <IconButton
                color="primary"
                onClick={() => {
                  if (state.value.length >= 2) {
                    onSearch(state.value);
                  }
                }}
                onMouseDown={handleMouseDown}
              >
                <Search />
              </IconButton>
            </InputAdornment>
          }
          endAdornment={
            (showClear || state.value.length > 0) && (
              <InputAdornment>
                <IconButton
                  color="primary"
                  onClick={handleClick}
                  onMouseDown={handleMouseDown}
                >
                  <Clear />
                </IconButton>
              </InputAdornment>
            )
          }
        />
      </FormControl>
      {children}
    </SearchInputContext.Provider>
  );
};

export default SearchInput;
