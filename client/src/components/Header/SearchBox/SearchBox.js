import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { useMediaQuery } from '@material-ui/core';
import { searchProduct } from '../../../reducers/actions/products'
import DesktopSearchBox from './DesktopSearchBox/DesktopSearchBox'
import MobileSearchBox from './MobileSearchBox/MobileSearchBox'

function SearchField(props) {
  const { products, currency } = props
  const matches = useMediaQuery('(min-width:960px)');
  const [redirect, setRedirect] = useState(false)
  const [state, setState] = useState({
    text: '',
    suggestions: []
  })

  const search = (value) => {
    setRedirect(true)
    props.searchProduct(value)
  }

  const onTextChange = (evt) => {
    const { value } = evt.target
    let suggestions = []
    if(value.length > 0){
      const regexp = new RegExp(`${value}`, 'im')
      suggestions = [...products].sort().filter(v => regexp.test(v.title))
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

  const renderSuggestions = (suggestionsCallback = () => null) => {
    const { suggestions, text } = state
    if(suggestions.length === 0){
      return null
    }

    const clickSuggestion = (value) => {
      suggestionSelected(value)
      search(value)
      suggestionsCallback()
    }

    return (
      <div className='suggestions'>
        {suggestions.map(item => {
          const index = item.title.toLowerCase().indexOf(text)
          return <div
          key={item.id}
          className='suggestions-item'
          onClick={() => clickSuggestion(item.title)}
          >
            <img src={item.colors[0].preview} alt='img' />
            <div>
              {item.title.substring(0, index)}
              <strong children={item.title.substring(index, index + text.length)} />
              {item.title.substring(index + text.length)}
              <div>{`${item.gender}'s`}</div>
              <div>{currency}{item.price}</div>
            </div>
          </div>
          })}
      </div>
    )
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
    {redirect && <Redirect to='/p/' />}
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchField);