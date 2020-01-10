import React from "react";
import "./styles.sass";
import Typography from "@material-ui/core/Typography";


const FormsPreview = ({
  title,
  content = {},
}) => {
  const tranfsormValues = (data) => {
    const {firstname, lastname, ...rest} = data
    if(firstname || lastname){
      return {
        fullname: `${firstname} ${lastname}`,
        ...rest
      }
    }
    return rest
  }

  const renderValues = (values) => (
    Object.entries(values).map(([key, value]) => (
      <Typography
        key={key}
        variant="body2"
        color="textSecondary"
        children={value}
      />
    ))
  )

  return (
    <div className="formPreview">
      {title && (
        <Typography
          gutterBottom
          className="formPreview-title"
        >
          {title}
        </Typography>
      )}
      <div>
        {renderValues(tranfsormValues(content))}
      </div>
    </div>
  )
}

export default FormsPreview
