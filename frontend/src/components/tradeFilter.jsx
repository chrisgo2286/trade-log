import React, { useState } from 'react';
import Button from './button';
import Modal from './modal';

export default function TradeFilter(props) {
  function handleChangeOptions() {
    props.onChange({ 'sortBy': 'stock', 'sortType':'ascending' })
  }

  function handleSubmitOptions() {
    props.onSubmit();
    closeModal();
  }

  function closeModal() {
    props.exitModal();
  }

  return(
    <Modal showModal={ props.showModal } exitModal={ closeModal } >
      <Button onClick={ handleChangeOptions } >SORT BY STOCK</Button>
      <Button onClick={ handleSubmitOptions } >SUBMIT</Button>
    </Modal>
  );
}
