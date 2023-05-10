import React, { useState, useContext } from 'react';
import Button from './button';
import RadioButtons from './radioButtons';
import Modal from './modal';
import { FilterContext, TradeContext } from '../index';
import Trade from './trade';
import '../styles/tradeFilter.css';

export default function TradeFilter(props) {
  const trades = useContext(TradeContext);
  const filter = useContext(FilterContext)[0];
  const setFilter = useContext(FilterContext)[1];

  function handleSubmit() {
    setFilter(filter => {
      return { ...filter, submitted: true }
    })
    closeModal();
  }

  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    setFilter(filter => {
      return { ...filter, options: { ...filter.options, [name]: value} }
    })
  } 

  function clearFilter() {
    setFilter(filter => {
      return { ...filter, show: false, submitted: false, options: {
        buy_sell: '',
        choice1: '',
        choice2: '',
        choice3: '',
        minPrice: '',
        maxPrice: '',
        startDate: '',
        endDate: '',
      }}
    })
    closeModal();
  }

  function closeModal() {
    setFilter(filter => {
      return { ...filter, show: false }
    })
  }

  return(
    <Modal showModal={ filter.show } exitModal={ closeModal } >
      <div className='modal-header'>
        <div>TRADE FILTERS</div>
      </div>
      <div className="modal-body">
        <RadioButtons buy_sell={ filter.options.buy_sell } onChange={ handleChange } filter={ true } />
        <div className='trade-filters'>
          <div className='filter-header'>STOCKS</div>
          <div className='filter-inputs'>
            { [1, 2, 3].map((ndx) => (
              <StockSelect key={ ndx } name={ 'choice' + ndx } onChange={ handleChange } />
            ))}
          </div>
          <div className='filter-header'>PRICE RANGE</div>
          <div className='filter-inputs'>
            <input type='number' name='minPrice' placeholder='Min Price' onChange={ handleChange } value={ filter.options.minPrice } />
            <input type='number' name='maxPrice' placeholder='Max Price' onChange={ handleChange } value={ filter.options.maxPrice } />
          </div>
          <div className='filter-header'>DATE RANGE</div>
          <div className='filter-inputs'>
            <input type='date' name='startDate' placeholder='Start Date' onChange={ handleChange } value={ filter.options.startDate }/>
            <input type='date' name='endDate' placeholder='End Date' onChange={ handleChange } value={ filter.options.endDate }/>
          </div>
        </div>
        <div className='modal-btns'>
          <Button onClick={ clearFilter }>CLEAR</Button>
          <Button onClick={ handleSubmit }>SUBMIT</Button>
        </div>
      </div>
    </Modal>
  );
}

function StockSelect (props) {
  const trades = useContext(TradeContext);
  const filter = useContext(FilterContext)[0];
  const setFilter = useContext(FilterContext)[1];

  function handleChange (event) {
    props.onChange(event);
  }

  return (
    <select name={ props.name } onChange={ handleChange } value={ filter.options[props.name] }>
      <option value=''></option>
      { trades.tradeList.map((trade) => (
        <option key={ trade.id } value={ trade.stock }>{ trade.stock }</option>
      ))}
    </select>
  )
}
