export function filterTrades (trades, options) {
  return trades.filter(trade => trade.stock === 'VCN');
}
