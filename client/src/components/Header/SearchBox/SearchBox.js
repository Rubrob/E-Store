import React, { useState } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { useMediaQuery, Typography } from '@material-ui/core'
import { searchProduct } from '../../../reducers/actions/products'
import DesktopSearchBox from './DesktopSearchBox/DesktopSearchBox'
import MobileSearchBox from './MobileSearchBox/MobileSearchBox'

function SearchBox(props) {
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

  const renderSuggestions = (callback = () => null) => {
    const { suggestions, text } = state
    if(suggestions.length === 0){
      return null
    }

    const clickSuggestion = (value) => {
      suggestionSelected(value)
      search(value)
      callback()
    }

    return (
      <div className='suggestions'>
        {suggestions.map((item, i) => {
          // const index = item.title.toLowerCase().indexOf(text)
          // const highlight = <>
          //   {item.title.substring(0, index)}
          //   <strong children={item.title.substring(index, index + text.length)} />
          //   {item.title.substring(index + text.length)}
          // </>

          return <div key={i} className='suggestions-item' onClick={() => clickSuggestion(item.title)}>
            <img src={item.colors[0].preview} alt='img' />
            <div>
              {/* {highlight} */}
              <Typography variant='body1' component='div' children={item.title} />
              <Typography variant='body2' component='div' children={`${item.gender}'s`} />
              <Typography variant='body2' component='div' children={`${currency}${item.price}`} />
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