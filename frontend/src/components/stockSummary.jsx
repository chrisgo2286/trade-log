import React from 'react';

export default function StockSummary (props) {

  return (
    <React.Fragment>
      <StockSummaryHeaders />
      <div className='summary-items'>
        { props.data.map((stock, ndx) => (
          <div key={ ndx } className="summary-item">
            <div>{ stock.stock }</div>
            <div>{ stock.market_price.toFixed(2) }</div>
            <div>{ stock.average_price.toFixed(2) }</div>
            <div>{ stock.total_shares }</div>
            <div>{ stock.total_profit_loss.toFixed(2) }</div>
            <div>{ stock.profit_loss_per_share.toFixed(2) }</div>
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