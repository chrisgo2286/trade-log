from trade_log.portfolio_scripts.stock_analysis import StockAnalysis
from trade_log.portfolio_scripts.portfolio_filter import PortfolioFilter
from trade_log.models import Trade
from datetime import datetime, timedelta

class PortfolioAnalysis:
    def __init__(self, owner, params):
        self.owner = owner
        self.filter = params
        self.end_date = self.find_end_date() # datetime.date object
        self.trades = PortfolioFilter(owner, params).trades
        self.stocks = self.find_all_stocks()
        self.data = {
            'stock_summary': [],
            'overview': {
                'acb': 0,
                'value': 0,
                'roi': 0,
                'return': 0,
            },
            'composition': {},    
        }
        self.compile_data()

    def find_end_date(self):
        if self.filter.get('end'):
            date_obj = datetime.strptime(self.filter.get('end'), '%m%d%Y')
            if date_obj == datetime.today():  
                return date_obj - timedelta(days=1)
            return date_obj
        return datetime.today() - timedelta(days=1)

    def find_all_stocks(self):
        stocks = self.trades.values_list('stock', flat=True).distinct()
        return stocks
    
    def compile_data(self):
        self.compile_stock_data()
        self.compile_overview_data()
        self.compile_composition_data()

    def compile_stock_data(self):
        for stock in self.stocks:
            stock_trades = self.trades.filter(stock=stock).order_by('date')
            analysis = StockAnalysis(stock, stock_trades, self.end_date)
            self.data['stock_summary'].append(analysis.stats)
            self.data['overview']['acb'] += analysis.stats['acb']
            self.data['overview']['value'] += analysis.stats['value']

    def compile_overview_data(self):
        self.data['overview']['return'] = (self.data['overview']['value'] -
            self.data['overview']['acb'])
        self.data['overview']['roi'] = (self.data['overview']['return'] /
            self.data['overview']['acb']) * 100

    def compile_composition_data(self):
        pass

    