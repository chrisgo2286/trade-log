import React, { useContext, useState } from 'react';
import TradeInput from './tradeInput';
import { TradeContext } from '../index.js';
import axios from 'axios';
import Button from './button';
import Modal from './modal';
import ValidationErrors from './validationErrors';
import { validate } from '../miscScripts/validator';

export default function NewTrade(props) {
  const trades = useContext(TradeContext);
  const [fields, setFields] = useState({
    stock: '',
    price: '',
    shares: '',
    commission: '',
    date: '',
    comment: '',     
  });

  const [fieldErrors, setFieldErrors] = useState({});

  function closeModal () {
    props.exitModal();
    setFieldErrors({});
    setFields({
      stock: '',
      price: '',
      shares: '',
      commission: '',
      date: '',
      comment: '',   
    })
  }

  function logIn () {
    console.log('Logging In')
    const userData = {
      username: 'christian',
      password: 'rachel02',
    }

    axios.post('/api/accounts/login/', userData, { 
      headers: {
        'Authorization': 'Token 95c40d641fcf2b4c2d1d6a469236c6ed4796d2ff'
      }
    })
      .then(response => (
        console.log(response)))
  }
  function handleChange(event) {
    const { name, value } = event.target;
    setFields({ ...fields, [name]: value });
  }

  function handleSubmit(event) {

    if(validateFields()) return;

    axios.post('/api/trades/', fields)
    .then(response => (
      console.log(response)))
    trades.refresh();
    closeModal();
  }

  function validateFields() {
    const fieldErrors = validate(fields);
    setFieldErrors(fieldErrors)
    return (Object.keys(fieldErrors).length > 0);
  }

  return(
    <Modal showModal={ props.showModal } exitModal={ closeModal }>
      <div className='modal-header'>
        <div>NEW TRADE</div>
      </div>
      <div className="modal-body">
        <form onSubmit={ handleSubmit }>
          <TradeInput 
            name='stock'
            type='text'
            value={ fields.stock }
            onChange={ handleChange }
          />
          <TradeInput 
            name='price'
            type='decimal'
            value={ fields.price }
            onChange={ handleChange }
          />
          <TradeInput 
            name='shares'
            type='number'
            value={ fields.shares }
            onChange={ handleChange }
          />
          <TradeInput 
            name='commission'
            type='decimal'
            value={ fields.commission }
            onChange={ handleChange }
          />
          <TradeInput 
            name='date'
            type='date'
            value={ fields.date }
            onChange={ handleChange }
          />
          <TradeInput 
            name='comment'
            type='text'
            value={ fields.comment }
            onChange={ handleChange }
          />
          <ValidationErrors errors={ Object.values(fieldErrors) }/>
          <div className='modal-btns'>
            <Button onClick={ handleSubmit }>Save</Button>
            <Button onClick={ closeModal }>Close</Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}