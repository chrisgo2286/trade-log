import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import TradeInput from './tradeInput';
import { TradeContext } from '../index.js';
import Button from './button';

export default function TradeUpdate(props) {
  const trades = useContext(TradeContext);
  const [fields, setFields] = useState({
    id: props.trade.id,
    stock: props.trade.stock,
    price: props.trade.price,
    shares: props.trade.shares,
    commission: props.trade.commission,
    date: props.trade.date,
    comment: props.trade.comment,     
  });
  
  function handleChange(event) {
    const { name, value } = event.target;
    setFields({ ...fields, [name]: value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    axios.put('/api/trades/' + fields.id + '/', fields)
      .then(response => (
        console.log(response)
      ))
    trades.refresh();
    props.exitModal();
  }

  function deleteTrade() {
    axios.delete('/api/trades/' + fields.id + '/')
      .then(response => (
        console.log(response)
      ))
    trades.refresh();
    props.exitModal();  
  }

  function closeModal() {
    props.exitModal();
  }

  return(
    <div>
      <div className='modal-header'>
        <div>UPDATE TRADE</div>
      </div>
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
          <Button onClick={ deleteTrade }>Delete</Button>
          <Button onClick={ closeModal }>Close</Button>
        </div>
      </form>
    </div>
  );
}