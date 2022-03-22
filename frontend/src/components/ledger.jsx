import React, { useState, useContext } from 'react';
import TradeList from './tradelist';
import NewTrade from './newTrade';
import { TradeContext } from '../index.js';
import '../styles/ledger.css';
import Modal from './modal';

function Ledger() {
  const [newTradeClicked, setNewTradeClicked] = useState(false);

  function toggleNewTradeClicked () {
    setNewTradeClicked(!newTradeClicked);
  }

  return(
    <React.Fragment>
      <div className='icons'>
        <i className='material-icons' >build</i>
        <i className='material-icons' onClick={ toggleNewTradeClicked }>library_add</i>
      </div>
      <TradeList />
      <Modal showModal={ newTradeClicked } exitModal={ toggleNewTradeClicked }>
        <NewTrade exitModal={ toggleNewTradeClicked }/>
      </Modal>
    </React.Fragment>
  );
}

export default Ledger;