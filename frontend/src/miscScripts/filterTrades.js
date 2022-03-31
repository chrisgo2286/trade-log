export function filterTrades (trades, options) {
  console.log(options)
  return trades.filter(trade => trade.stock === 'VCN');
}
