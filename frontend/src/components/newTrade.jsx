import React, { useContext, useState } from 'react';
import TradeInput from './tradeInput';
import { TradeContext } from '../index.js';
import axios from 'axios';
import Button from './button';

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

  function handleChange(event) {
    const { name, value } = event.target;
    setFields({ ...fields, [name]: value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(fields)
    axios.post('/api/trades/', fields)
    .then(response => (
      console.log(response)))
    trades.refresh();
    props.exitModal();
  }

  function closeModal() {
    props.exitModal();
  }

  return(
    <div>
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
          <div className='modal-btns'>
            <Button onClick={ handleSubmit }>Save</Button>
            <Button onClick={ closeModal }>Close</Button>
          </div>
        </form>
      </div>
    </div>
  );
}