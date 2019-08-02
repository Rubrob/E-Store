import React, { useState } from 'react'
import { connect } from 'react-redux'
import { addFilter, removeFilter } from '../../../../reducers/actions/products'

function FilterItem(props) {
  const { addFilter, removeFilter } = props
  const { content = null, className, active, type, value } = props
  const [isActive, setIsActive] = useState(active)

  const handleFilter = () => {
    setIsActive(!isActive)
    isActive ? removeFilter({ filter: type, value }) : addFilter({ filter: type, value })
  }

  return (
    <div className={isActive ? `${className} active` : className} onClick={handleFilter}>
      {content}
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  addFilter: value => dispatch(addFilter(value)),
  removeFilter: value => dispatch(removeFilter(value))
})

export default connect(null, mapDispatchToProps)(FilterItem)