import React from 'react';

export default function StockSummary (props) {

  return (
    <React.Fragment>
      <StockSummaryHeaders />
      <div className='summary-items'>
        { props.data.map((stock, ndx) => (
          <div key={ ndx } className="summary-item">
            <div>{ stock.stock }</div>
            <div>{ stock.market.toFixed(2) }</div>
            <div>{ stock.average.toFixed(2) }</div>
            <div>{ stock.shares }</div>
            <div>{ stock.pl.toFixed(2) }</div>
            <div>{ stock.pl_per_share.toFixed(2) }</div>
          </div>   
        ))}
      </div>
    </React.Fragment>
  )
}

function StockSummaryHeaders () {
  return (
    <div className='stock-summary-headers'>
      <Header name='stock' />
      <Header name='market' />
      <Header name='average' />
      <Header name='shares' />
      <Header name='p/l' />
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