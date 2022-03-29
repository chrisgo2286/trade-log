export function sortTrades (trades, category, type) {
  //STRING SORTING
  if(category === 'stock') {
    
    if(type === 'ascending') {
      trades.sort((a, b) => {
        const stockA = a[category].toLowerCase();
        const stockB = b[category].toLowerCase();
        if(stockA < stockB) {
          return -1;
        }
        if(stockA > stockB) {
          return 1;
        }
        return 0;
      })

    } else {  
      trades.sort((b, a) => {
        const stockA = a[category].toLowerCase();
        const stockB = b[category].toLowerCase();
        if(stockA < stockB) {
          return -1;
        }
        if(stockA > stockB) {
          return 1;
        }
        return 0;
      })
    }
  
  //DATE SORTING
  } else if(category === 'date') {
    if(type === 'ascending') {
      trades.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateA - dateB;
      })
    } else {
      trades.sort((b, a) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateA - dateB;  
    })
  }

  //NUMBER SORTING
  } else {
    if(type === 'ascending') {
      trades.sort((a, b) => {
        const propA = a[category];
        const propB = b[category];
        return propA - propB;
      })
    } else {
      trades.sort((b, a) => {
        const propA = a[category];
        const propB = b[category];  
        return propA - propB;
      })
    }

  }
  return trades;
}
