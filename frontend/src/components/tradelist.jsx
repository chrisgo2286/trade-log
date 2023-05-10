import React, { useState, useContext } from 'react';
import Trade from './trade';
import { SortContext } from '../index';

export default function TradeList(props) {
  const [newTradeClicked, setNewTradeClicked] = useState(false);

  return(
    <React.Fragment>
      <TradeListHeaders />
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

function TradeListHeaders() {
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
      <Header name='stock' onClick={ handleSortClicked } />
      <Header name='price' onClick={ handleSortClicked } />
      <Header name='shares' onClick={ handleSortClicked } />
      <Header name='commission' onClick={ handleSortClicked } />
      <Header name='total' onClick={ handleSortClicked } />
      <Header name='date' onClick={ handleSortClicked } />
      <div name='comment'>COMMENT</div>
    </div>
  )
}

function Header (props) {
  const sort = useContext(SortContext)[0];
  function handleArrow() {
    if(sort.category === props.name) {
      return (sort.type === 'ascending') ? 'expand_less': 'expand_more';
    }
  }
  
  return (
    <div onClick={ props.onClick } name={ props.name }>{ props.name.toUpperCase() }
      <span className='material-icons'>{ handleArrow() }</span>
    </div>
  )
}
