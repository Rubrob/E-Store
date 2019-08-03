import React from 'react'

function FilterBlock(props) {
  const { title, children } = props

  return (
    <div className='FilterBlock'>
      <div className='FilterBlock-header'>{title}</div>
      <div className='FilterBlock-content'>{children}</div>
    </div>
  )
}

export default FilterBlock