import React, {useState} from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {useMediaQuery} from "@material-ui/core";
import {searchProduct} from "redux/actions/products";
import DesktopSearchBox from "./DesktopSearchBox";
import MobileSearchBox from "./MobileSearchBox";
import SearchItem from "./SearchItem";
import {setSuggestions, emptySuggestions} from "redux/actions/searchbox";


const SearchBox = ({
  products,
  currency,
  history,
  suggestions,
  setSuggestions,
  searchProduct,
  emptySuggestions
}) => {
  const matches = useMediaQuery("(min-width: 960px)")
  const [state, setState] = useState({
    text: "",
    active: false,
  })

  const search = (value) => {
    history.push("/p/")
    searchProduct(value)
    suggestionSelected()
  }

  const onTextChange = (evt) => {
    const { value } = evt.target
    if(value.length){
      setSuggestions(value, [...products])
    }else{
      setSuggestions(value, [])
    }

    setState({
      active: true,
      text: value
    })
  }

  const suggestionSelected = () => {
    setState({
      active: false,
      text: ""
    })
    emptySuggestions()
  }


  const renderSuggestions = (
    !!suggestions.length &&
    <SearchItem
      currency={currency}
      onClick={(value) => search(value)}
      suggestions={suggestions}
    />
  )

  return(
    matches ? (
      <DesktopSearchBox
        clear={suggestionSelected}
        search={search}
        onTextChange={onTextChange}
        suggestions={renderSuggestions}
        value={state.text}
        active={state.active}
        setActive={(bool) => setState({ ...state, active: bool })}
      />
    ) : (
      <MobileSearchBox
        clear={suggestionSelected}
        search={search}
        onTextChange={onTextChange}
        suggestions={renderSuggestions}
        value={state.text}
        active={state.active}
        setActive={(bool) => setState({ ...state, active: bool })}
      />
    )
  );
}

export default compose(
  withRouter,
  connect(
    (state) => ({
      products: state.products.products,
      currency: state.products.currency,
      suggestions: state.searchbox.suggestions
    }),
    (dispatch) => ({
      searchProduct: value => dispatch(searchProduct(value)),
      setSuggestions: (value, items) => dispatch(setSuggestions(value, items)),
      emptySuggestions: () => dispatch(emptySuggestions())
    })
  )
)(SearchBox)
