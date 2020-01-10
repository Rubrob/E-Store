import React from "react";
import "./styles.sass";
import {Typography} from "@material-ui/core";
import {renderTitle} from "utils";


const SearchItem = ({
  suggestions,
  currency,
  onClick
}) => (
  <div className={"suggestions"}>
    {suggestions.map((item, i) => {
      // const index = item.title.toLowerCase().indexOf(text)
      // const highlight = <>
      //   {item.title.substring(0, index)}
      //   <strong children={item.title.substring(index, index + text.length)} />
      //   {item.title.substring(index + text.length)}
      // </>

      return (
        <div key={i} className="suggestions-item" onClick={() => onClick(item.title)}>
          <img src={item.colors[0].preview} alt="img" />
          <div>
            {/* {highlight} */}
            <Typography variant="body1" color="textPrimary" children={item.title} />
            <Typography variant="body2" color="textSecondary">
              {renderTitle({
                gender: item.gender, 
                category: item.category, 
                subcategory: item.subcategory
              })} 
            </Typography>
            <Typography variant="body2" color="textSecondary" children={`${currency}${item.price}`} />
          </div>
        </div>
      )
    })}
  </div>
)

export default SearchItem
