import React from 'react';
import TradeList from './tradelist';
import '../styles/ledger.css';

function Ledger() {
  return(
    <React.Fragment>
      <div className='icons'>
        <span>FILTER COMPONENT</span>
        <span>NEW TRADE COMPONENT</span>
      </div>
      <TradeList />
    </React.Fragment>
  );
}

export default Ledger;