import React, { useState, useContext } from 'react';
import Button from './button';
import Modal from './modal';
import { FilterContext, TradeContext } from '../index';
import Trade from './trade';
import '../styles/tradeFilter.css';

export default function TradeFilter(props) {
  const trades = useContext(TradeContext);
  const filter = useContext(FilterContext)[0];
  const setFilter = useContext(FilterContext)[1];

  function filterStock() {
    setFilter(filter => {
      return { ...filter, options: {'stock': 'VCN'}}
    })
  }

  function handleSubmit() {
    setFilter(filter => {
      return { ...filter, submitted: true }
    })
    closeModal();
  }

  function clearFilter() {
    setFilter(filter => {
      return { ...filter, show: false, submitted: false, options: {} }
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
        <div className='trade-filters'>
          <div className='filter-header'>STOCKS</div>
          <div className='filter-inputs'>
            <StockSelect trades={ trades } />
            <StockSelect trades={ trades } />
            <StockSelect trades={ trades } />
          </div>
          <div className='filter-header'>PRICE RANGE</div>
          <div className='filter-inputs'>
            <input type='number' name='min-price' placeholder='Min Price' />
            <input type='number' name='max-price' placeholder='Max Price' />
          </div>
          <div className='filter-header'>DATE RANGE</div>
          <div className='filter-inputs'>
            <input type='date' name='start-date' placeholder='Start Date' />
            <input type='date' name='end-date' placeholder='End Date' />
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
  return (
    <select name='stock-choices'>
      <option value=''></option>
      { props.trades.tradeList.map((trade) => (
        <option key={ trade.id } value={ trade.stock }>{ trade.stock }</option>
      ))}
    </select>
  )
}
