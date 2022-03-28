import React, { useState, useContext } from 'react';
import TradeList from './tradelist';
import NewTrade from './newTrade';
import { TradeContext, FilterContext } from '../index.js';
import '../styles/ledger.css';
import Button from './button';
import TradeFilter from './tradeFilter';
import { filterTrades } from '../miscScripts/filterTrades';

export default function Ledger() {
  const trades = useContext(TradeContext);
  const [newTradeClicked, setNewTradeClicked] = useState(false);

  const [sortClicked, setSortClicked] = useState(false);
  const [sortOptions, setSortOptions] = useState({
    sortBy: 'date', sortType: 'ascending'
  })

  const [filter, setFilter] = useState({
    show: false,
    submitted: false,
    options: {},
  })

  function handleTrades () {
    console.log(filter)
    return (filter.submitted === true) ? filterTrades(trades, filter.options): trades.tradeList;
  }

  // NEW TRADE FUNCTIONS
  function toggleNewTradeClicked () {
    setNewTradeClicked(!newTradeClicked);
  }

  // SORT FUNCTIONS
  function handleSortClicked () {
    setSortClicked(true);
  }

  function handleChangeSortOptions (options) {
    setSortOptions(options);
  }

  // FILTER FUNCTIONS
  function showFilter () {
    setFilter({ ...filter, show: true });
  }

  return(
    <FilterContext.Provider value={ [filter, setFilter] } >
      <main className='ledger-container'>
        <div className='ledger-btns'>
          <Button onClick={ showFilter }>FILTER</Button>
          <Button onClick={ toggleNewTradeClicked }>+TRADE</Button>
        </div>
        <TradeList tradeList={ handleTrades() }/>
        <NewTrade showModal={ newTradeClicked } exitModal={ toggleNewTradeClicked }/>
        <TradeFilter />
      </main>
    </FilterContext.Provider>
  );
}