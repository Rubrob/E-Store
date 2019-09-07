import React, { useState } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { useMediaQuery } from '@material-ui/core'
import { searchProduct } from '../../../actions/products'
import DesktopSearchBox from './DesktopSearchBox/DesktopSearchBox'
import MobileSearchBox from './MobileSearchBox/MobileSearchBox'
import SearchItem from './SearchItem/SearchItem'

const SearchBox = (props) => {
  const { products, currency, history } = props
  const matches = useMediaQuery('(min-width: 960px)');
  const [state, setState] = useState({
    text: '',
    suggestions: []
  })

  const search = (value) => {
    history.push('/p/')
    props.searchProduct(value)
  }

  const onTextChange = (evt) => {
    const { value } = evt.target
    let suggestions = []
    if(value.length){
      const regexp = new RegExp(`${value}`, 'im')
      suggestions = [...products].sort().filter(item => regexp.test(item.title))
    }
    setState({
      suggestions,
      text: value
    })
  }

  const suggestionSelected = (value) => {
    setState({
      suggestions: [],
      text: value
    })
  }


  const renderSuggestions = (callback = () => null) => {
    // const { suggestions, text } = state
    const { suggestions } = state
    if(suggestions.length === 0){
      return null
    }

    const clickSuggestion = (value) => {
      suggestionSelected(value)
      search(value)
      callback()
    }

    return <SearchItem currency={currency} onClick={clickSuggestion} suggestions={suggestions} />
  }

  return(
    <>
    {matches ?
      <DesktopSearchBox
        clear={suggestionSelected}
        search={search}
        onTextChange={onTextChange}
        suggestions={renderSuggestions}
        value={state.text}
        /> :
      <MobileSearchBox
        clear={suggestionSelected}
        search={search}
        onTextChange={onTextChange}
        suggestions={renderSuggestions}
        value={state.text}
        />}
    </>
  );
}

const mapStateToProps = state => ({
  products: state.products.products,
  searched: state.products.searched,
  currency: state.products.currency
})
const mapDispatchToProps = dispatch => ({
  searchProduct: value => dispatch(searchProduct(value))
})

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(SearchBox)