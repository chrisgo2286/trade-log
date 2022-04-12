import React from 'react';

export default function StockSummary () {
  return (
    <StockSummaryHeaders />
  )
}

function StockSummaryHeaders () {
  return (
    <div className='stock-summary-headers'>
      <Header name='stock' />
      <Header name='average price' />
      <Header name='total shares' />
      <Header name='profit/loss' />
      <Header name='pl/share' />
    </div>
  )
}

function Header (props) {
  return (
    <div 
      className='stock-summary-header'
      name={ props.name }>
      { props.name.toUpperCase() }
    </div>
  )
}