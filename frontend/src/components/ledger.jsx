import React, { useState, useContext } from 'react';
import TradeList from './tradelist';
import NewTrade from './newTrade';
import { TradeContext } from '../index.js';
import '../styles/ledger.css';
import Modal from './modal';
import Button from './button';

function Ledger() {
  const [newTradeClicked, setNewTradeClicked] = useState(false);
  const [sortClicked, setSortClicked] = useState(false);
  const [filterClicked, setFilterClicked] = useState(false);

  function toggleNewTradeClicked () {
    setNewTradeClicked(!newTradeClicked);
  }

  function toggleSortClicked () {
    setSortClicked(!sortClicked);
  }
  
  function toggleFilterClicked () {
    setFilterClicked(!filterClicked);
  }

  return(
    <main className='ledger-container'>
      <div className='ledger-btns'>
        <Button onClick={ toggleFilterClicked }>FILTER</Button>
        <Button onClick={ toggleSortClicked }>SORT</Button>
        <Button onClick={ toggleNewTradeClicked }>+TRADE</Button>
      </div>
      <TradeList />
      <Modal showModal={ newTradeClicked } exitModal={ toggleNewTradeClicked }>
        <NewTrade exitModal={ toggleNewTradeClicked }/>
      </Modal>
    </main>
  );
}

export default Ledger;