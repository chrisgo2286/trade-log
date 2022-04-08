
  export function calcTotal (trades) {
    var calcTrades = trades.map((trade) => {
      var total = (trade.price * trade.shares + parseFloat(trade.commission))
      trade.total = total.toFixed(2);
      return trade;
    })
    return calcTrades;
  }
  