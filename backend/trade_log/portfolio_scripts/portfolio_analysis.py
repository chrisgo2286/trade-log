from trade_log.portfolio_scripts.stock_analysis import StockAnalysis
from trade_log.models import Trade
from datetime import datetime

class PortfolioAnalysis:
    def __init__(self, owner, params):
        self.owner = owner
        self.filter = params
        self.trades = Trade.objects.filter(owner=self.owner)
        self.filter_trades()

    def filter_trades(self):
        self.filter_start_date()
        self.filter_end_date()

    def filter_start_date(self):
        if self.filter.get('start'):
            start = datetime.strptime(self.filter.get('start'), '%m%d%Y')
            self.trades = self.trades.filter(date__gte=start)

    def filter_end_date(self):
        pass


            