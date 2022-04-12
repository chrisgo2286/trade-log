from trade_log.portfolio_scripts.portfolio_summary import PortfolioSummary
import pandas as pd

class StockSummary(PortfolioSummary):
    HEADERS = [
        'stock', 'current', 'average', 'shares', 'pl', 'pl_per_share'
    ]

    def __init__(self, owner):
        super().__init__(owner)
        self.df = pd.DataFrame()

    def populate(self):
        self.find_unique_stocks()
        self.find_total_shares()
        self.find_average_price()
        print(self.df)

    def find_unique_stocks(self):
        df_sub = self.df_orig.drop_duplicates(subset=['stock'])
        self.df['stock'] = df_sub['stock']

    def find_total_shares(self):
        self.df['shares'] = self.df['stock'].apply(self.calc_total_shares)

    def find_average_price(self):
        self.df['average'] = self.df.apply(lambda x: self.calc_average_price(x['stock'], x['shares']), axis=1)

    def calc_total_shares(self, stock):
        df_sub = self.df_orig[self.df_orig['stock'] == stock]
        return df_sub['shares'].sum()

    def calc_average_price(self, stock, shares):
        df_sub = self.df_orig[self.df_orig['stock'] == stock]
        return self.calc_total_cost(stock) / shares

    def calc_total_cost(self, stock):
        df_sub = self.df_orig[self.df_orig['stock'] == stock]
        df_sub['total'] = df_sub['price'] * df_sub['shares'] + df_sub['commission']
        return df_sub['total'].sum()
