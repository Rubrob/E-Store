import React, { useState } from "react";
import "./styles.sass";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  useMediaQuery,
  Backdrop,
  Slide,
  IconButton,
  Fade
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import {
  dispatchClearSuggestions,
  dispatchSearchSuggestions,
  dispatchSubheaderTitle
} from "redux/actions";
import SearchSuggestions from "./SearchSuggestions";
import SearchInput from "components/Header/SearchBox/SearchInput";

const TransitionWrapper = ({ type, children, ...props }) => {
  switch (type) {
    case "fade":
      return (
        <Fade mountOnEnter unmountOnExit {...props}>
          {children}
        </Fade>
      );
    case "slide":
      return (
        <Slide direction="left" mountOnEnter unmountOnExit {...props}>
          {children}
        </Slide>
      );
    default:
      return children;
  }
};

const SearchBox = ({
  history,
  currency,
  suggestions,
  suggestions_total,
  dispatchSearchSuggestions,
  dispatchClearSuggestions,
  dispatchSubheaderTitle,
  ...props
}) => {
  const matchWidth = useMediaQuery("(min-width: 960px)");
  const [state, setState] = useState({
    isSuggestionsShowing: false,
    open: false
  });

  React.useEffect(() => {
    document.body.style.overflow = suggestions_total > 0 ? "hidden" : "";
  }, [suggestions_total]);

  const onClose = () => {
    setState(prevState => ({
      ...prevState,
      isSuggestionsShowing: false,
      open: false
    }));
    setTimeout(() => dispatchClearSuggestions(), 300);
  };

  const onHideSuggestions = () => {
    dispatchClearSuggestions();
    setState(prevState => ({
      ...prevState,
      isSuggestionsShowing: false,
      open: true
    }));
  };

  const onGetSuggestions = async value => {
    await dispatchSearchSuggestions(value).then(() =>
      setState(prevState => ({
        ...prevState,
        isSuggestionsShowing: true
      }))
    );
  };

  const onSearch = value => {
    history.push("/p/?search=" + value);
    dispatchSubheaderTitle(`Search for "${value}"`);
  };

  return (
    <>
      {!state.open && !matchWidth ? (
        <IconButton color="primary" onClick={() => setState({ open: true })}>
          <SearchIcon />
        </IconButton>
      ) : (
        <SearchInput
          onGetSuggestions={onGetSuggestions}
          onSearch={onSearch}
          onHideSuggestions={!matchWidth ? onHideSuggestions : undefined}
          onClose={onClose}
          showClear={!matchWidth}
          autoFocus={state.open}
        >
          <TransitionWrapper
            type={state.open ? "slide" : "slide"}
            in={state.isSuggestionsShowing}
            direction={state.open ? "top" : "left"}
          >
            <div className="SearchBoxSuggestions">
              <SearchSuggestions
                currency={currency}
                items={suggestions}
                total={suggestions_total}
              />
            </div>
          </TransitionWrapper>
        </SearchInput>
      )}
      <Backdrop
        open={
          (state.isSuggestionsShowing && suggestions_total > 0) || state.open
        }
        className="SearchBoxSuggestions-dropdown"
        onClick={matchWidth ? onClose : null}
      />
    </>
  );
};

export default compose(
  withRouter,
  connect(
    state => ({
      currency: state.products.currency,
      suggestions: state.products.suggestions,
      suggestions_total: state.products.suggestions_total
      // {
      //   suggestions_total: state.products.suggestions_total,
      //   suggestions: state.products.suggestions
      // }
    }),
    {
      dispatchClearSuggestions,
      dispatchSearchSuggestions,
      dispatchSubheaderTitle
    }
  )
)(SearchBox);
