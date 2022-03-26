import React, { useContext, useState } from 'react';
import { TradeContext } from '../index.js';
import Trade from './trade';

export default function TradeList() {

  const trades = useContext(TradeContext);
  const [filterClicked, setFilterClicked] = useState(false);
  const [newTradeClicked, setNewTradeClicked] = useState(false);

  return(
    <React.Fragment>
      <TradeListHeader />
      <div className='trade-list'>
        { trades.tradeList.map((trade) => (
          <Trade 
            key={ trade.id }
            trade={ trade }
          />
        ))}
      </div>
    </React.Fragment>
  );
}

function TradeListHeader() {
  return (
    <div className='header'>
      <div>STOCK</div>
      <div>PRICE</div>
      <div>SHARES</div>
      <div>COMMISSION</div>
      <div>TOTAL</div>
      <div>DATE</div>
      <div>COMMENT</div>     
    </div>
  )
}
