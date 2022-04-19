from trade_log.portfolio_scripts.stock_queue import StockQueue
from static.market_data import STOCKS

class StockAnalysis:
    """Class to analyze history of stock and return stats"""
    """Trades param is already filtered for owner, stock and date"""
    def __init__(self, stock, trades):
        self.trades = trades
        self.stock = stock
        self.stock_history = StockQueue()
        self.init_stock_history()
        self.stats = {
            'stock': self.stock,
            'market_price': '',
            'adjusted_cost_basis': '',
            'total_shares': '',
            'average_price': '',
            'total_profit_loss': '',
            'profit_loss_per_share': '',
        }
        self.init_stock_stats()

    def init_stock_history(self):
        for trade in self.trades:
            if trade.buy_sell == 'BUY':
                self.stock_history.add(trade)
            else:
                self.stock_history.sell(trade)

    def init_stock_stats(self):
        self.market_price()
        self.adjusted_cost_basis()
        self.total_shares()
        self.average_price()
        self.total_profit_loss()
        self.profit_loss_per_share()

    def market_price(self):
        self.stats['market_price'] = float(STOCKS[self.stock])

    def adjusted_cost_basis(self):
        self.stats['adjusted_cost_basis'] = self.stock_history.adjusted_cost_basis()

    def total_shares(self):
        self.stats['total_shares'] = self.stock_history.total_shares()
        
    def average_price(self):
        try:
            self.stats['average_price'] = float((self.stats['adjusted_cost_basis'] / 
                self.stats['total_shares']))
        except ZeroDivisionError:
            self.stats['average_price'] = 0.00

    #SHOULD ALSO INCLUDE PROFIT FROM SOLD STOCKS!
    def total_profit_loss(self):
        self.stats['total_profit_loss'] = ((self.stats['market_price'] -
          self.stats['average_price']) * self.stats['total_shares'])

    def profit_loss_per_share(self):
        try:
            self.stats['profit_loss_per_share'] = (self.stats['total_profit_loss']
                / self.stats['total_shares'])
        except ZeroDivisionError:
            self.stats['profit_loss_per_share'] = 0.00