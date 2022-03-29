import React, { useState, useContext } from 'react';
import Trade from './trade';
import { SortContext } from '../index';

export default function TradeList(props) {
  const [newTradeClicked, setNewTradeClicked] = useState(false);

  return(
    <React.Fragment>
      <TradeListHeader />
      <div className='trade-list'>
        { props.tradeList.map((trade) => (
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
  const sort = useContext(SortContext)[0];
  const setSort = useContext(SortContext)[1];
  
  function handleSortClicked(event) {
    const newCategory = event.target.getAttribute('name');
    toggleSortType(newCategory); 
    setSort(sort => {
      return { ...sort, active: true, category: newCategory }
    })
  }

  function toggleSortType(newCategory) {
    if(sort.category === newCategory) {
      var sortType = (sort.type === 'ascending' ? 'descending': 'ascending')
    }
    else {
      sortType = 'ascending';
    }
    setSort(sort => {
      return { ...sort, type: sortType }
    })
  }

  return (
    <div className='header'>
      <div onClick={ handleSortClicked } name='stock'>STOCK</div>
      <div onClick={ handleSortClicked } name='price'>PRICE</div>
      <div onClick={ handleSortClicked } name='shares'>SHARES</div>
      <div onClick={ handleSortClicked } name='commission'>COMMISSION</div>
      <div name='total'>TOTAL</div>
      <div onClick={ handleSortClicked } name='date'>DATE</div>
      <div name='comment'>COMMENT</div>     
    </div>
  )
}
