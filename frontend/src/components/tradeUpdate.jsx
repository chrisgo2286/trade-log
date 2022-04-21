import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import TradeInput from './tradeInput';
import { TradeContext } from '../index.js';
import Button from './button';
import RadioButtons from './radioButtons';
import Modal from './modal';
import ValidationErrors from './validationErrors';
import { validateTrade } from '../miscScripts/validator';

export default function TradeUpdate(props) {
  const trades = useContext(TradeContext);
  const [fields, setFields] = useState({
    id: props.trade.id,
    buy_sell: props.trade.buy_sell,
    stock: props.trade.stock,
    price: props.trade.price,
    shares: props.trade.shares,
    commission: props.trade.commission,
    date: props.trade.date,
    comment: props.trade.comment,     
  });
  
  const [fieldErrors, setFieldErrors] = useState({});

  function closeModal () {
    props.exitModal();
    setFieldErrors({});
    setFields({
      id: props.trade.id,
      buy_sell: props.trade.buy_sell,
      stock: props.trade.stock,
      price: props.trade.price,
      shares: props.trade.shares,
      commission: props.trade.commission,
      date: props.trade.date,
      comment: props.trade.comment, 
    })
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setFields({ ...fields, [name]: value });
  }

  function handleSubmit(event) {
    
    if(validateFields()) return;
    axios.put('/api/trades/' + fields.id + '/', fields)
      .then(response => (
        console.log(response)
      ))
    trades.refresh();
    closeModal();
  }

  function validateFields() {
    const fieldErrors = validateTrade(fields, trades.tradeList);
    setFieldErrors(fieldErrors)
    return (Object.keys(fieldErrors).length > 0);
  }

  function deleteTrade() {
    axios.delete('/api/trades/' + fields.id + '/')
      .then(response => (
        console.log(response)
      ))
    trades.refresh();
    closeModal();  
  }

  return(
    <Modal showModal={ props.showModal } exitModal={ closeModal }>
      <div className='modal-header'>
        <div>UPDATE TRADE</div>
      </div>
      <form>
        <RadioButtons buy_sell={ fields.buy_sell } onChange={ handleChange }/>
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
          <Button onClick={ deleteTrade }>Delete</Button>
          <Button onClick={ closeModal }>Close</Button>
        </div>
      </form>
    </Modal>
  );
}