import React, { useState } from 'react';

export default function RadioButtons () {
  const [btn, setBtn] = useState({
    click: 'BUY',
    hover: '',      
  })
  
  function handleBuyClass () {
    const hover = (btn.hover === 'BUY') ? 'hover ': '';
    const click = (btn.click === 'BUY') ? 'click ': '';
    return 'btn ' + hover + click;
  }

  function handleSellClass () {
    const hover = (btn.hover === 'SELL') ? 'hover ': '';
    const click = (btn.click === 'SELL') ? 'click ': '';
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

  function toggleBuyClick () {
    setBtn({ ...btn, click: 'BUY' })
  }

  function toggleSellClick () {
    setBtn({ ...btn, click: 'SELL' })  
  }

  return (
    <div className="radio-btns">  
      <span
        name='BUY'
        className={ handleBuyClass() }
        onMouseEnter={ toggleBuyHover } 
        onMouseLeave={ toggleBuyHover }
        onClick={ toggleBuyClick }>
        BUY
      </span>
      <span
        name='SELL'
        className={ handleSellClass() }
        onMouseEnter={ toggleSellHover } 
        onMouseLeave={ toggleSellHover }
        onClick={ toggleSellClick }>
        SELL
      </span>
    </div>
  )
}