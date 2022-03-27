import React, { useState, useContext } from 'react';
import TradeList from './tradelist';
import NewTrade from './newTrade';
import { TradeContext } from '../index.js';
import '../styles/ledger.css';
import Button from './button';
import { filterTrades } from '../miscScripts/filterTrades';
import TradeFilter from './tradeFilter';

export default function Ledger() {
  const trades = useContext(TradeContext);
  const [newTradeClicked, setNewTradeClicked] = useState(false);

  const [sortClicked, setSortClicked] = useState(false);
  const [sortOptions, setSortOptions] = useState({
    sortBy: 'date', sortType: 'ascending'
  })

  const [filterClicked, setFilterClicked] = useState(false);
  const [tradesFiltered, setTradesFiltered] = useState(false);
  const [filterOptions, setFilterOptions] = useState({})

  // MAIN FUNCTIONS
  function handleTrades () {
    return (tradesFiltered === true) ? filterTrades(trades, filterOptions): trades;
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
  function toggleFilterClicked () {
    setFilterClicked(!filterClicked);
  }

  function handleSubmitFilterOptions () {
    setTradesFiltered(true);
  }

  function handleChangeFilterOptions (options) {
    setFilterOptions(options);
  }

  return(
    <main className='ledger-container'>
      <div className='ledger-btns'>
        <Button onClick={ toggleFilterClicked }>FILTER</Button>
        <Button onClick={ toggleNewTradeClicked }>+TRADE</Button>
      </div>
      <TradeList 
        trades={ handleTrades()}
        onSortClicked={ handleSortClicked }
        onSortChange={ handleChangeSortOptions } />
      <NewTrade showModal={ newTradeClicked } exitModal={ toggleNewTradeClicked }/>
      <TradeFilter 
        showModal={ filterClicked }
        exitModal={ toggleFilterClicked } 
        onSubmit={ handleSubmitFilterOptions } 
        onChange={ handleChangeFilterOptions } />
    </main>
  );
}