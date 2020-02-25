export const required = value => (value ? undefined : null);
// const max = (max) => (value) =>
//   value && value.length > max ? `Must be ${max} characters or less` : undefined

export const validate = inputs => {
  const errors = {};
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

  const {
    zip,
    city,
    email,
    phone,
    country,
    address,
    password,
    lastname,
    firstname
  } = inputs;
  const { cardnumber, exp, cvv } = inputs;

  if (!firstname) {
    errors.firstname = "Please enter your first name";
  } else if (firstname.length < 2) {
    errors.firstname = "Entry is too short, please lengthen your entry";
  }

  if (!lastname) {
    errors.lastname = "Please enter your last name";
  } else if (lastname.length < 2) {
    errors.lastname = "Entry is too short, please lengthen your entry";
  }

  if (!country) {
    errors.country = "Please enter country";
  } else if (country.length < 2) {
    errors.country = "Please enter a valid country";
  }

  if (!city) {
    errors.city = "Please enter city";
  } else if (city.length < 2) {
    errors.city = "Please enter a valid city";
  }

  if (!zip) {
    errors.zip = "Please enter your postal code";
  } else if (zip.length < 3) {
    errors.zip = "Please enter a valid postal code";
  }

  if (!address) {
    errors.address = "Please enter your address";
  } else if (address.length < 2) {
    errors.address = "Please enter a valid address";
  }

  if (!email) {
    errors.email = "Please enter your email address";
  } else if (!emailRegex.test(email)) {
    errors.email = "Please enter a valid email address";
  }

  if (!phone) {
    errors.phone = "Please enter your phone number";
  } else if (phone.length <= 9) {
    errors.phone = "Please enter a valid phone number";
  }

  if (!password) {
    errors.password = "Please enter your password";
  } else if (password.length < 5) {
    errors.password = "Password is too short";
  }

  if (!cardnumber || cardnumber.length < 16)
    errors.cardnumber = "Please enter card number";
  if (!exp || exp.length < 4) errors.exp = "Please enter expiration date";
  if (!cvv || cvv.length < 4) errors.cvv = "Please enter security code";

  return errors;
};
