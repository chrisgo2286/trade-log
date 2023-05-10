export function filterTrades (trades, options) {
  trades = (options.buy_sell !== '' | options.buy_sell !== 'BUY_SELL') ? filterByBuySell(trades, options): trades;
  trades = (options.choice1 !== ''| options.choice2 !== ''| options.choice3 !== '') ? filterByStocks(trades, options): trades;
  trades = (options.minPrice | options.maxPrice) ? filterByPrice(trades, options): trades;
  trades = (options.startDate !== ''| options.endDate !== '') ? filterByDate(trades, options): trades;
  return trades;
}

function filterByBuySell (trades, options) {
  if(options.buy_sell === 'BUY') {
    trades = trades.filter(trade => trade.buy_sell === 'BUY')
  }
  if(options.buy_sell === 'SELL') {
    trades = trades.filter(trade => trade.buy_sell === 'SELL')
  }
  return trades;
}

function filterByStocks (trades, options) {
  var stockChoices = []
  for(var i=1; i<4; i++) {
    ((('choice' + i) in options) === true) ? stockChoices.push(options['choice' + i]): stockChoices.push(''); 
  }
  return trades.filter(trade => stockChoices.includes(trade.stock));
}

function filterByPrice (trades, options) {
  if(options.minPrice) {
    trades = trades.filter(trade => parseInt(trade.price) >= parseInt(options.minPrice));
  }
  if(options.maxPrice) {
    trades = trades.filter(trade => parseInt(trade.price) <= parseInt(options.maxPrice));
  }
  return trades;
}

function filterByDate (trades, options) {
  if(options.startDate) {
    const startDate = new Date(options.startDate);
    trades = trades.filter(trade => startDate <= new Date(trade.date));
  }
  if(options.endDate) {
    const endDate = new Date(options.endDate);
    trades = trades.filter(trade => endDate >= new Date(trade.date));
  }
  return trades;
}