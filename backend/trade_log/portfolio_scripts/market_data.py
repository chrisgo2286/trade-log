import yfinance as yf

class MarketData:

    STOCKS = {
        'VCN.TO': 43.83,
        'XUS.TO': 21.00,
        'ZAG.TO': 14.29,
        'MSFT': 282.06,
        'TD.TO': 94.59,
        'BAC': 39.17,
        'AAPL': 170.00,
        'TSLA': 1025.00,
        'RTX': 107.00,
        'SHEL': 56.00,
        'LPLA': 208.00,
        'BMO.TO': 140.00,
    }
    
    def pull(self):
        stocks = ' '
        stock_list = list(self.STOCKS.keys())
        stocks = stocks.join(stock_list)

        data = yf.download(stocks, start='2022-01-01', group_by='ticker')
        data.to_json('static/yf_pull.json', date_format='iso')