import React from 'react'
import './SearchItem.sass'
import { Typography } from '@material-ui/core'

const SearchItem = ({ suggestions, currency, onClick }) => (
  <div className='suggestions'>
    {suggestions.map((item, i) => {
      // const index = item.title.toLowerCase().indexOf(text)
      // const highlight = <>
      //   {item.title.substring(0, index)}
      //   <strong children={item.title.substring(index, index + text.length)} />
      //   {item.title.substring(index + text.length)}
      // </>

      return (
        <div key={i} className='suggestions-item' onClick={() => onClick(item.title)}>
          <img src={item.colors[0].preview} alt='img' />
          <div>
            {/* {highlight} */}
            <Typography variant='body1' component='div' children={item.title} />
            <Typography variant='body2' component='div' children={`${item.gender}'s`} />
            <Typography variant='body2' component='div' children={`${currency}${item.price}`} />
          </div>
        </div>
      )
    })}
  </div>
)

export default SearchItem
