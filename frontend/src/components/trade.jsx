import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from './modal';
import TradeUpdate from './tradeUpdate';

export default function Trade(props) {
  const [tradeHovered, setTradeHovered] = useState(false);
  const [tradeClicked, setTradeClicked] = useState(false);

  function handleTradeClass () {
    return (tradeHovered === true) ? 'trade hover': 'trade';
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
        <div className='trade-stock'>{ props.trade.stock }</div>
        <div className='trade-price'>{ props.trade.price }</div>
        <div className='trade-shares'>{ props.trade.shares }</div>
        <div className='trade-commission'>{ props.trade.commission }</div>
        <div className='trade-date'>{ props.trade.date }</div>
        <div className='trade-comment'>{ props.trade.comment }</div>
      </div>
      <Modal 
        showModal={ tradeClicked }
        exitModal={ toggleTradeClicked }>
        <TradeUpdate 
          trade={ props.trade }
          exitModal={ toggleTradeClicked }
        />
      </Modal>

    </React.Fragment>
  );
}