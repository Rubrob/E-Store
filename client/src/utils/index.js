import queryString from "query-string";
import _get from "lodash/get";
import _without from "lodash/without";
import _isArray from "lodash/isArray";
import _capitalize from "lodash/capitalize";

export const parsePrice = (price, currency) => {
  switch (currency) {
    case "$":
      return `$${price}`;
    default:
      return null;
  }
};

export const transformSlug = (slug = "") => {
  if (!slug) return;

  return slug
    .split("-")
    .map(item => _capitalize(item))
    .map((item, idx, arr) => {
      if (/(men|women)/i.test(item)) return item + "'s";
      if (/(and)/i.test(item)) return "&";
      if (/(clothes|accessories)/i.test(item) && arr[idx + 1] !== undefined) {
        return "";
      }
      if (/tshirt/i.test(item + arr[idx + 1])) {
        const str = item + "-" + arr[idx + 1];
        arr.splice(idx + 1, 1);
        return str;
      }
      return item;
    })
    .join(" ");
};

export const randomStr = () => {
  const times = 3;
  let str = Math.random()
    .toString(36)
    .slice(2);

  for (let i = 0; i <= times; i++) {
    str += Math.random()
      .toString(36)
      .slice(2);
  }
  return str;
};

export const LS = {
  set: (name, value) => {
    if (typeof value === "object") {
      value = JSON.stringify(value);
    }
    localStorage.setItem(name, value);
  },
  get: name => {
    const item = localStorage.getItem(name);
    if (!item) return;
    if (item[0] === "{" || item[0] === "[") return JSON.parse(item);
    return item;
  },
  remove: name => localStorage.removeItem(name)
};

export const freeIfZero = (price, currency) =>
  price === 0 ? "Free" : parsePrice(price, currency);

export const totalCalculation = arr =>
  arr.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);

export const backdropFilterSupport = () => {
  const webkit = window.CSS.supports("-webkit-backdrop-filter", "blur(20px)");
  const regular = window.CSS.supports("backdrop-filter", "blur(20px)");
  return regular || webkit;
};

// NEW SERVER FILTERING
export const handleQuery = (location, modifiers) => {
  const settings = {
    arrayFormat: "comma",
    skipNull: true,
    parseNumbers: true
  };

  let query = {
    ...queryString.parse(location.search, settings),
    ...modifiers
  };

  return {
    ...location,
    search: queryString.stringify(query, settings)
  };
};

export const pasreQuery = location => {
  const settings = {
    arrayFormat: "comma",
    skipNull: true,
    parseNumbers: true
  };
  return queryString.parse(location, settings);
};

export const toggleFilterQuery = (location, query, value) => {
  let newFilter = [];
  const filter = _get(pasreQuery(location), query, "");

  if (_isArray(filter)) {
    newFilter = filter.includes(value)
      ? _without(filter, value)
      : [...filter, value];
  } else {
    newFilter = filter === value ? [] : [filter, value];
  }

  return newFilter.slice(0, 5);
};

export const replaceFilterQuery = (location, query, value) => {
  const filter = _get(pasreQuery(location), query, "");
  return filter === value ? null : value;
};
