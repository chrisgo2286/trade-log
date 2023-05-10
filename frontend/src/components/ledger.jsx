import React, { useState, useContext } from 'react';
import TradeList from './tradelist';
import NewTrade from './newTrade';
import { TradeContext, FilterContext, SortContext } from '../index.js';
import '../styles/ledger.css';
import Button from './button';
import TradeFilter from './tradeFilter';
import { filterTrades } from '../miscScripts/filterTrades';
import { sortTrades } from '../miscScripts/sortTrades';
import { calcTotal } from '../miscScripts/calc';

export default function Ledger() {
  const trades = useContext(TradeContext);
  const [newTradeClicked, setNewTradeClicked] = useState(false);

  const [sort, setSort] = useState({
    active: false,
    category: '',
    type: '',
  })

  const [filter, setFilter] = useState({
    show: false,
    submitted: false,
    options: {
      buy_sell: '',
      choice1: '',
      choice2: '',
      choice3: '',
      minPrice: '',
      maxPrice: '',
      startDate: '',
      endDate: '',
    },
  })

  function handleTrades () {
    const calcTrades = calcTotal(trades.tradeList);
    const filteredTrades = (filter.submitted === true) ? filterTrades(calcTrades, filter.options): calcTrades;
    const sortedTrades = (sort.active === true) ? sortTrades(filteredTrades, sort.category, sort.type): filteredTrades;
    return sortedTrades;
  }

  // NEW TRADE FUNCTIONS
  function toggleNewTradeClicked () {
    setNewTradeClicked(!newTradeClicked);
  }

  // FILTER FUNCTIONS
  function showFilter () {
    setFilter(filter => {
      return { ...filter, show: true }
    })
  }

  return(
    <FilterContext.Provider value={ [filter, setFilter] }>
    <SortContext.Provider value={ [sort, setSort] }>
      <div className="container">
        <main className='ledger'>
          <div className='ledger-btns'>
            <Button onClick={ showFilter }>FILTER</Button>
            <Button onClick={ toggleNewTradeClicked }>+TRADE</Button>
          </div>
          <TradeList tradeList={ handleTrades() }/>
          <NewTrade showModal={ newTradeClicked } exitModal={ toggleNewTradeClicked }/>
          <TradeFilter />
        </main>
      </div>
    </SortContext.Provider> 
    </FilterContext.Provider>
  );
}