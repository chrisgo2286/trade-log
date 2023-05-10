import validator from 'validator';
import { totalSharesDateFilter } from './calc';

export function validateTrade(fields, trades) {
  var fieldErrors = {};

  if(fields.stock === '') {
    fieldErrors.stock = 'Please enter a valid stock ticker!';
  }

  if(!fields.id && fields.buy_sell === 'SELL' && totalSharesDateFilter(trades, fields.stock, fields.date) - fields.shares < 0) {
    fieldErrors.buy_sell = 'You do not have enough stocks to sell on this date!'
  }

  if(fields.id && fields.buy_sell === 'SELL' && totalSharesDateFilter(trades, fields.stock, fields.date) - (fields.shares * 2) < 0) {
    fieldErrors.buy_sell = 'You do not have enough stocks to sell on this date!'
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