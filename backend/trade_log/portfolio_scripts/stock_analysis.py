from .stock_queue import StockQueue
from .misc import divide
from static.market_data import STOCKS
import pandas as pd
from datetime import timedelta
import json

class StockAnalysis:
    """Class to analyze history of stock and return data"""
    """Trades param is already filtered for owner, stock and date"""
    MARKET_DATA = 'static/yf_pull.json'
    
    def __init__(self, trades, end_date):
        self.trades = trades
        self.stock = self.trades[0].stock
        self.end_date = end_date
        self.history = StockQueue()
        self.init_history()
        self.data = {}

    def init_history(self):
        for trade in self.trades:
            if trade.buy_sell == 'BUY':
                self.history.add(trade)
            else:
                self.history.sell(trade)

    def compile_data(self):
        self.data['stock'] = self.stock
        self.data['market'] = self.market_price()
        self.data['shares'] = self.total_shares()
        self.data['acb'] = self.acb()
        self.data['average'] = self.average_price()
        self.data['pl'] = self.total_profit_loss()
        self.data['pl_per_share'] = self.profit_loss_per_share()
        self.data['value'] = self.market_value()

    def market_price(self):
        with open(self.MARKET_DATA) as data_file:
            data = json.load(data_file)
            key1 = f"('{self.stock}', 'Close')"
            key2 = self.convert_to_json_date(self.end_date)
            curr_end = self.end_date
            key2 = self.find_correct_key(data[key1], key2, curr_end)        
            return data[key1][key2]        

    def total_shares(self):
        return self.history.calc_shares()

    def acb(self):    
        return float(self.history.calc_acb())
        
    def average_price(self):
        return divide(self.data['acb'], self.data['shares'])

    #SHOULD ALSO INCLUDE PROFIT FROM SOLD STOCKS!
    def total_profit_loss(self):
        price_diff = self.data['market'] - self.data['average']
        return price_diff * self.data['shares']

    def profit_loss_per_share(self):
        return divide(self.data['pl'], self.data['shares'])

    def market_value(self):
        """Sets market attribute to total market value of shares"""
        return self.data['market'] * self.data['shares']

    def compile_value_only(self):
        """Returns portfolio value only. For ValueChart"""
        market = self.market_price()
        shares = self.total_shares()
        return market * shares

    # Helper Functions

    def convert_to_json_date(self, date_obj):
        """
        Converts date obj to format 'YYYY-MM-DDT00:00:00.000Z' so it can be
        looked up in json data
        """
        return f"{date_obj.strftime('%Y-%m-%d')}T00:00:00.000Z"
        
    def find_correct_key(self, data, json_date, date_obj):
        """
        If current end date not valid stock market day, tries prior day until
        a valid date is found.
        """
        while json_date not in data:
            date_obj = date_obj - timedelta(days=1)
            json_date = self.convert_to_json_date(date_obj)
        return json_date

