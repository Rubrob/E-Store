import React from 'react'
import './FormsPreview.sass'
import { Typography } from '@material-ui/core'

const FormsPreview = ({
  title,
  children,
  content = {},
  cn = ''
}) => {
  const previewContent = Object.entries(content).map(([key, value]) => (
    <Typography variant='body2' color='textSecondary' key={key} children={value} />
  ))

  return (
    <div className={`formPreview ${cn}`}>
      {title && <Typography gutterBottom className='formPreview-title' children={title} />}
      <div>
        {previewContent}
      </div>
      {children}
    </div>
  )
}

export default FormsPreview