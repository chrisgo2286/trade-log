import validator from 'validator';

export function validate(fields) {
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