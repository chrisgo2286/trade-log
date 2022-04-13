import React from 'react';

export default function StockSummary (props) {

  return (
    <React.Fragment>
      <StockSummaryHeaders />
      { props.data.map((stock, ndx) => (
        <div key={ ndx } className="item">
          <div>{ stock.stock }</div>
          <div>{ stock.market }</div>
          <div>{ stock.average }</div>
          <div>{ stock.shares }</div>
          <div>{ stock.pl }</div>
          <div>{ stock.pl_per_share }</div>
        </div>   
      ))}
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