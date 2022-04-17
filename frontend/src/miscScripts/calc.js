
  export function calcTotal (trades) {
    var calcTrades = trades.map((trade) => {
      var total = (trade.price * trade.shares + parseFloat(trade.commission))
      trade.total = total.toFixed(2);
      return trade;
    })
    return calcTrades;
  }
  
  //STOCK SUMMARY FUNCTIONS
  export function calcStockSummary (trades) {
    const stocks = uniqueStocks(trades);
    const shares = calcTotalShares(trades, stocks);
  }

  export function uniqueStocks (trades) {
    let stocks = []
    for(let i=0; i<trades.length; i++) {
      if (!stocks.includes(trades[i].stock)) {
        stocks.push(trades[i].stock);
      } 
    }
    return stocks;
  }

  function calcTotalShares (trades, stocks) {
    stocks.forEach((stock) => totalShares(trades, stock))
  }

  export function totalShares (trades, stock) {
    const filteredTrades = trades.filter(trade => trade.stock === stock);
    let total = 0;
    filteredTrades.forEach(trade => (total += trade.shares));
    return total;
  }

  export function totalSharesDateFilter (trades, stock, eff_date=new Date()) {
    const filteredTrades = trades.filter(trade => {
      return trade.stock === stock && trade.date <= eff_date;
    });
    let total = 0;
    filteredTrades.forEach(trade => (total += trade.shares));
    return total;
  }