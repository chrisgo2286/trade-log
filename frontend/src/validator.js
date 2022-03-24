import validator from 'validator';

export function validate(fields) {
  var fieldErrors = {};

  if(fields.stock === '') {
    fieldErrors.stock = 'Please enter a valid stock ticker!'
  }

  if(!validator.isDecimal(fields.price) | fields.price === '') {
    fieldErrors.price = 'Please enter a valid share price!'
  }  

  return fieldErrors;  
}