export function validate(fields) {
  var fieldErrors = {};

  if(fields.stock === '') {
    fieldErrors.stock = 'Please enter a valid stock ticker!'
  }

  if(typeof fields.price !== 'number') {
    fieldErrors.price = 'Share price must be a whole number!'
  }  

  if(fields.price === '') {
    fieldErrors.price = 'Please enter a valid share price!'
  }

  return fieldErrors;  
}