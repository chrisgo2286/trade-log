from trade_log.portfolio_scripts.portfolio_summary import PortfolioSummary
import pandas as pd
import yfinance as yf

# Pulling ticker data takes too long. Need to find a more efficient way

class StockSummary(PortfolioSummary):
    HEADERS = [
        'stock', 'market', 'average', 'shares', 'total_cost', 'pl', 'pl_per_share'
    ]

    TICKERS = {
        'VCN.TO': 43.83,
        'XUS.TO': 69.03,
        'ZAG.TO': 14.29,
        'MSFT': 282.06,
        'TD.TO': 94.59,
        'BAC': 39.17,
    }

    def __init__(self, owner):
        super().__init__(owner)
        self.df = pd.DataFrame()

    def get_data(self):
        self.populate()
        return self.df.to_dict('records')

    def populate(self):
        self.find_unique_stocks()
        self.find_total_shares()
        self.find_total_cost()
        self.find_average_price()
        self.find_market_price()
        self.find_profit_loss()
        self.find_pl_per_share()

    def find_unique_stocks(self):
        df_sub = self.df_orig.drop_duplicates(subset=['stock'])
        self.df['stock'] = df_sub['stock']

    def find_total_shares(self):
        self.df['shares'] = self.df['stock'].apply(self.calc_total_shares)

    def find_total_cost(self):
        self.df['total_cost'] = self.df['stock'].apply(self.calc_total_cost)

    def find_average_price(self):
        self.df['average'] = self.df['total_cost'] / self.df['shares']

    def find_market_price(self):
        self.df['market'] = self.df['stock'].apply(self.pull_market_price)

    def find_profit_loss(self):
        self.df['pl'] = (self.df['market'] * self.df['shares']) - self.df['total_cost'].map(float)

    def find_pl_per_share(self):
        self.df['pl_per_share'] = self.df['pl'] / self.df['shares']

    def calc_total_shares(self, stock):
        df_sub = self.df_orig[self.df_orig['stock'] == stock]
        return df_sub['shares'].sum()

    def calc_total_cost(self, stock):
        df_sub = self.df_orig[self.df_orig['stock'] == stock]
        df_sub['total'] = df_sub['price'] * df_sub['shares'] + df_sub['commission']
        return df_sub['total'].sum()

    def pull_market_price(self, stock):
        return self.TICKERS[stock]