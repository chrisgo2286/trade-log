export function filterTrades (trades, options) {
  var stockChoices = []
  for(var i=1; i<4; i++) {
    ((('choice' + i) in options) === true) ? stockChoices.push(options['choice' + i]): stockChoices.push(''); 
  }
  return trades.filter(trade => stockChoices.includes(trade.stock));
}
