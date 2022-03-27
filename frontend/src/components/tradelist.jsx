import React, { useState } from 'react';
import Trade from './trade';

export default function TradeList(props) {

  const [filterClicked, setFilterClicked] = useState(false);
  const [newTradeClicked, setNewTradeClicked] = useState(false);
  
  return(
    <React.Fragment>
      <TradeListHeader 
        onSortClicked={ props.onSortClicked }
        onSortChanged={ props.onSortChanged }/>
      <div className='trade-list'>
        { props.trades.tradeList.map((trade) => (
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
      <div name='stock'>STOCK</div>
      <div name='price'>PRICE</div>
      <div name='shares'>SHARES</div>
      <div name='commission'>COMMISSION</div>
      <div name='total'>TOTAL</div>
      <div name='date'>DATE</div>
      <div name='comment'>COMMENT</div>     
    </div>
  )
}
