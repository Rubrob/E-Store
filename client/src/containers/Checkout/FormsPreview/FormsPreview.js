import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  root: {
  padding: 20,
  fontSize: 14
  },
  title: {
    marginBottom: 10,
    fontWeight: 700,
    color: '#444'
  },
  content: {
    color: '#999'
  }
})

function FormsPreview(props) {
  const classes = useStyles()
  const { title, children, content = {}, cn = '' } = props

  const fullname = (firstname = '', lastname = '') => <div>{firstname} {lastname}</div>
  const arr = Object.entries(content)
  const previewContent = arr.map(([key, value]) => (key === 'firstname' || key === 'lastname') ? null : <div key={key} children={value} />)

  return (
    <div className={`${classes.root} ${cn}`}>
      {title && <h4 className={classes.title}>{title}</h4>}
      <div className={classes.content}>
        {fullname(content.firstname, content.lastname)}
        {previewContent}
      </div>
      {children}
    </div>
  )
}

export default FormsPreview