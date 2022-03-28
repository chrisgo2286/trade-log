import React, { useState, useContext } from 'react';
import Button from './button';
import Modal from './modal';
import { FilterContext, TradeContext } from '../index';
import Trade from './trade';

export default function TradeFilter(props) {
  const trades = useContext(TradeContext);
  const filter = useContext(FilterContext)[0];
  const setFilter = useContext(FilterContext)[1];

  function testFilter() {
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
  }

  function closeModal() {
    setFilter(filter => {
      return { ...filter, show: false }
    })
  }

  return(
    <Modal showModal={ filter.show } exitModal={ closeModal } >
      <Button onClick={ testFilter }>FILTER BY VCN</Button>
      <Button onClick={ clearFilter }>CLEAR</Button>
      <Button onClick={ handleSubmit }>SUBMIT</Button>
    </Modal>
  );
}
