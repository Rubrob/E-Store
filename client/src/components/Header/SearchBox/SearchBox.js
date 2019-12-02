import React, { useState } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { useMediaQuery } from '@material-ui/core'
import { searchProduct } from '../../../actions/products'
import DesktopSearchBox from './DesktopSearchBox/DesktopSearchBox'
import MobileSearchBox from './MobileSearchBox/MobileSearchBox'
import SearchItem from './SearchItem/SearchItem'
import { setSuggestions, emptySuggestions } from '../../../actions/searchbox'

const SearchBox = ({
  products,
  currency,
  history,
  suggestions,
  setSuggestions,
  searchProduct,
  emptySuggestions
}) => {
  const matches = useMediaQuery('(min-width: 960px)')
  const [state, setState] = useState({
    text: '',
    active: false,
  })

  const search = (value) => {
    history.push('/p/')
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
      text: ''
    })
    emptySuggestions()
  }


  const renderSuggestions = (
    suggestions.length === 0 ?
    null :
    <SearchItem
      currency={currency}
      onClick={(value) => search(value)}
      suggestions={suggestions}
    />
  )

  return(
    matches ?
      <DesktopSearchBox
        clear={suggestionSelected}
        search={search}
        onTextChange={onTextChange}
        suggestions={renderSuggestions}
        value={state.text}
        active={state.active}
        setActive={(bool) => setState({ ...state, active: bool })}
      /> :
      <MobileSearchBox
        clear={suggestionSelected}
        search={search}
        onTextChange={onTextChange}
        suggestions={renderSuggestions}
        value={state.text}
        active={state.active}
        setActive={(bool) => setState({ ...state, active: bool })}
      />
  );
}

const mapStateToProps = state => ({
  products: state.products.products,
  currency: state.products.currency,
  suggestions: state.searchbox.suggestions
})
const mapDispatchToProps = dispatch => ({
  searchProduct: value => dispatch(searchProduct(value)),
  setSuggestions: (value, items) => dispatch(setSuggestions(value, items)),
  emptySuggestions: () => dispatch(emptySuggestions())
})

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(SearchBox)