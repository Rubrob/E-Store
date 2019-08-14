import React from 'react'
import { Typography,  makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  root: {
    padding: 20,
  },
  title: {
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

  const fullname = (firstname = '', lastname = '') => <Typography variant='body2' children={`${firstname} ${lastname}`} />
  const arr = Object.entries(content)
  const previewContent = arr.map(([key, value]) =>
  (key === 'firstname' || key === 'lastname') ? null : <Typography variant='body2' key={key} children={value} />)

  return (
    <div className={`${classes.root} ${cn}`}>
      {title && <Typography variant='body1' gutterBottom className={classes.title} children={title} />}
      <div className={classes.content}>
        {fullname(content.firstname, content.lastname)}
        {previewContent}
      </div>
      {children}
    </div>
  )
}

export default FormsPreview