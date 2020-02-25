import React from "react";
import "./styles.sass";
import { Link } from "react-router-dom";
import { Typography, Box } from "@material-ui/core";
import ArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import { parsePrice } from "utils/index";
import { SearchInputContext } from "../SearchInput";

const SearchSuggestionsItem = ({
  slug,
  title,
  subtitle,
  color,
  currency,
  onClick
}) => {
  return (
    <Box
      className="SearchSuggestions-item"
      component={Link}
      to={`/pp/${slug}/${color.slug}`}
      onClick={onClick}
    >
      <img src={color.preview_image} alt="img" />
      <div>
        <Typography variant="body1" color="textPrimary">
          {title}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {subtitle}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {parsePrice(color.price, currency)}
        </Typography>
      </div>
    </Box>
  );
};

const SearchSuggestions = ({ items, total, currency }) => {
  const { onClose, value } = React.useContext(SearchInputContext);

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="SearchSuggestions">
      <Typography color="textSecondary" paragraph>
        Top Suggestions
      </Typography>
      <div className="SearchSuggestions-items">
        {items.map(item => {
          return (
            <SearchSuggestionsItem
              key={item._id}
              slug={item.slug}
              title={item.title}
              subtitle={item.subtitle}
              color={item.colors[0]}
              currency={currency}
              onClick={onClose}
            />
          );
        })}
      </div>
      <Typography
        className="SearchSuggestions-total"
        component={Link}
        onClick={onClose}
        to={`/p/?search=${value}`}
      >
        <span>
          View All <Typography color="textSecondary"> ({total})</Typography>
        </span>
        <ArrowRightIcon />
      </Typography>
    </div>
  );
};

export default SearchSuggestions;
