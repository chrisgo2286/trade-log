import React, { useState } from 'react';

export default function RadioButtons (props) {
  const [btn, setBtn] = useState({
    click: props.buy_sell,
    hover: '',      
  })
  
  function handleBuyClass () {
    const hover = (btn.hover === 'BUY') ? 'hover ': '';
    const click = (btn.click === 'BUY' | btn.click === 'BUY_SELL') ? 'click ': '';
    return 'btn ' + hover + click;
  }

  function handleSellClass () {
    const hover = (btn.hover === 'SELL') ? 'hover ': '';
    const click = (btn.click === 'SELL' | btn.click === 'BUY_SELL') ? 'click ': '';
    return 'btn ' + hover + click;
  }

  function toggleBuyHover () {
    if(btn.hover === '') {  
      setBtn({ ...btn, hover:'BUY' });
    } else {
      setBtn({ ...btn, hover:'' });
    }
  }

  function toggleSellHover () {
    if(btn.hover === '') {  
      setBtn({ ...btn, hover:'SELL' });
    } else {
      setBtn({ ...btn, hover:'' });
    }
  }

  function handleClick (event) {
    let value = event.target.innerText;
    value = (props.filter === true) ? findValueForFilter(value): value;
    event = {target: {'name': 'buy_sell', 'value': value}}
    props.onChange(event)
    setBtn({ ...btn, click: value })
  }

  function findValueForFilter (value) {
    switch(true) {
      case (btn.click === value):
        return '';
      case (btn.click === ''):
        return value;
      case (btn.click === 'BUY_SELL'):
        return (value === 'BUY') ? 'SELL': 'BUY';
      default:
        return 'BUY_SELL'
    }
  }

  return (
    <div className="radio-btns">  
      <span
        name='BUY'
        className={ handleBuyClass() }
        onMouseEnter={ toggleBuyHover } 
        onMouseLeave={ toggleBuyHover }
        onClick={ handleClick }>
        BUY
      </span>
      <span
        name='SELL'
        className={ handleSellClass() }
        onMouseEnter={ toggleSellHover } 
        onMouseLeave={ toggleSellHover }
        onClick={ handleClick }>
        SELL
      </span>
    </div>
  )
}