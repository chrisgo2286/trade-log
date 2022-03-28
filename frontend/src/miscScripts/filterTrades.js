export function filterTrades (trades, options) {
  const filteredTrades = trades.tradeList.filter(trade => trade.stock === 'VCN');
  console.log(filteredTrades)
  return filteredTrades;
}