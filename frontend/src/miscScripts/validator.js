import validator from 'validator';

export function validateTrade(fields) {
  var fieldErrors = {};

  if(fields.stock === '') {
    fieldErrors.stock = 'Please enter a valid stock ticker!';
  }

  if(!validator.isDecimal(fields.price.toString()) | fields.price === '') {
    fieldErrors.price = 'Please enter a valid share price!';
  }
  
  if(!validator.isInt(fields.shares.toString()) | fields.shares === '') {
    fieldErrors.shares = 'Please enter a valid share number!';
  }

  if(fields.commission && !validator.isDecimal(fields.commission.toString())) {
    fieldErrors.commission = 'Please enter a valid commission!';
  }

  if(!validator.isDate(fields.date) | fields.date === '') {
    fieldErrors.date = 'Please enter a valid date!';
  }

  return fieldErrors;  
}

export function validateRegistration(fields) {
  var fieldErrors = validateLogin(fields);
  
  if(fields.password2 === '' && fields.password1) {
    fieldErrors.password2 = 'Please retype your password!'
  }

  if(fields.password1 !== fields.password2) {
    fieldErrors.passwordMatch = 'The passwords are not a match!'
  }

  return fieldErrors;  
}

export function validateLogin(fields) {
  var fieldErrors = {};

  if(fields.username === '') {
    fieldErrors.username = 'Please enter a valid username!';
  }

  if(fields.password1 === '') {
    fieldErrors.password1 = 'Please enter a valid password!';
  }

  return fieldErrors;
}