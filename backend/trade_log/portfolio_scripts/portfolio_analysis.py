from trade_log.portfolio_scripts.stock_analysis import StockAnalysis
from trade_log.portfolio_scripts.portfolio_filter import PortfolioFilter
from trade_log.models import Trade

class PortfolioAnalysis:
    def __init__(self, owner, params):
        self.owner = owner
        self.filter = params
        self.trades = PortfolioFilter(owner, params).trades

    def compile_data(self):
        data = {}
        data['stock_summary'] = self.compile_stock_summary()
        data['portfolio_overview'] = self.compile_portfolio_overview()
        data['portfolio_value'] = self.compile_portfolio_value()
        data['portfolio_composition'] = self.compile_portfolio_composition()
        return data

    def compile_stock_summary(self):
        stock_summary = []
        for stock in self.find_all_stocks():
            stock_trades = self.trades.filter(stock=stock)
            stock_analysis = StockAnalysis(stock, stock_trades.order_by('date'))
            stock_summary.append(stock_analysis.stats)
        return stock_summary

    def find_all_stocks(self):
        stocks = self.trades.values_list('stock', flat=True).distinct()
        return stocks

    def compile_portfolio_overview(self):
        portfolio_overview = {}
        return portfolio_overview

    def compile_portfolio_value(self):
        portfolio_value = {}
        return portfolio_value

    def compile_portfolio_composition(self):
        portfolio_composition = {}
        return portfolio_composition