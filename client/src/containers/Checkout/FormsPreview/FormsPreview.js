import React from 'react'
import './FormsPreview.sass'

function FormsPreview(props) {
  const { title, children, content = {}, cn = '' } = props

  const fullname = (firstname = '', lastname = '') => <div>{firstname} {lastname}</div>
  const arr = Object.entries(content)
  const previewContent = arr.map(([key, value]) => (key === 'firstname' || key === 'lastname') ? null : <div key={key} children={value} />)

  return (
    <div className={`FormsPreview ${cn}`}>
      {title && <h4 className='FormsPreview-title'>{title}</h4>}
      <div className='FormsPreview-content'>
        {fullname(content.firstname, content.lastname)}
        {previewContent}
      </div>
      {children}
    </div>
  )
}

export default FormsPreview