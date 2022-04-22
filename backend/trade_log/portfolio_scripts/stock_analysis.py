from trade_log.portfolio_scripts.stock_queue import StockQueue
from static.market_data import STOCKS
import pandas as pd
from datetime import timedelta
import json
class StockAnalysis:
    """Class to analyze history of stock and return stats"""
    """Trades param is already filtered for owner, stock and date"""
    def __init__(self, stock, trades, end_date):
        self.trades = trades
        self.end_date = end_date
        self.stock = stock
        self.history = StockQueue()
        self.init_history()
        self.stats = {
            'stock': self.stock,
            'market': '',
            'shares': '',
            'average': '',
            'pl': '',
            'pl_per_share': '',
            'value': '',
            'acb': float(self.history.calc_acb()),
        }
        self.init_stock_stats()

    def init_history(self):
        for trade in self.trades:
            if trade.buy_sell == 'BUY':
                self.history.add(trade)
            else:
                self.history.sell(trade)

    def init_stock_stats(self):
        self.market_price()
        self.total_shares()
        self.average_price()
        self.total_profit_loss()
        self.profit_loss_per_share()
        self.market_value()

    def market_price(self):
        with open('static/yf_pull.json') as data_file:
            data = json.load(data_file)
        key1 = f"('{self.stock}', 'Close')"
        key2 = f"{self.end_date.strftime('%Y-%m-%d')}T00:00:00.000Z"

        while key2 not in data[key1]:
            self.end_date = self.end_date - timedelta(days=1)
            key2 = f"{self.end_date.strftime('%Y-%m-%d')}T00:00:00.000Z"
        
        self.stats['market'] = data[key1][key2]

    def total_shares(self):
        self.stats['shares'] = self.history.calc_shares()
        
    def average_price(self):
        try:
            self.stats['average'] = self.stats['acb'] / self.stats['shares']
        except ZeroDivisionError:
            self.stats['average'] = 0.00

    #SHOULD ALSO INCLUDE PROFIT FROM SOLD STOCKS!
    def total_profit_loss(self):
        self.stats['pl'] = ((self.stats['market'] - self.stats['average']) * 
            self.stats['shares'])

    def profit_loss_per_share(self):
        try:
            self.stats['pl_per_share'] = self.stats['pl'] / self.stats['shares']
        except ZeroDivisionError:
            self.stats['pl_per_share'] = 0.00

    def market_value(self):
        self.stats['value'] = self.stats['market'] * self.stats['shares']
