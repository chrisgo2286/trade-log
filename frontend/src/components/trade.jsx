import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from './modal';
import TradeUpdate from './tradeUpdate';
import { createRoutesFromChildren } from 'react-router-dom';

export default function Trade(props) {
  const [tradeHovered, setTradeHovered] = useState(false);
  const [tradeClicked, setTradeClicked] = useState(false);

  function handleTradeClass () {
    const hover = (tradeHovered === true) ? 'trade-hover': '';
    const buy_sell = (props.trade.buy_sell === 'BUY') ? 'buy ': 'sell ';
    return 'trade ' + buy_sell + hover;
  }

  function toggleTradeHovered () {
    setTradeHovered(!tradeHovered);
  }

  function toggleTradeClicked () {
    setTradeClicked(!tradeClicked);
  }

  return (
    <React.Fragment>
      <div 
        className={ handleTradeClass() } 
        onMouseEnter={ toggleTradeHovered }
        onMouseLeave={ toggleTradeHovered }
        onClick={ toggleTradeClicked }
      >
        <div>{ props.trade.stock }</div>
        <div>{ props.trade.price }</div>
        <div>{ props.trade.shares }</div>
        <div>{ props.trade.commission }</div>
        <div>{ props.trade.total }</div>
        <div>{ props.trade.date }</div>
        <div>{ props.trade.comment }</div>
      </div>
        <TradeUpdate
          showModal={ tradeClicked } 
          trade={ props.trade }
          exitModal={ toggleTradeClicked }
        />
    </React.Fragment>
  );
}