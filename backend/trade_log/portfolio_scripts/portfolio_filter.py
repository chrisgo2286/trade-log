from trade_log.models import Trade
from datetime import datetime

class PortfolioFilter:
    """
    Class to filter Trade object by owner then addt'l filters.
    Filters can be start date, end date, ...
    """
    def __init__(self, filters):
        self.filters = filters
        self.filter_dict = {
            'owner': self.filter_owner,
            'start': self.filter_start_date,
            'end': self.filter_end_date,
            'stocks': self.filter_stocks,
        }

    def filter_trades(self):
        for filter, arg in self.filters.items():
            self.filter_dict[filter](arg)
        return self.trades

    def filter_owner(self, owner):
        self.trades = Trade.objects.filter(owner=owner)

    def filter_start_date(self, start_date):
        self.trades = self.trades.filter(date__gte=start_date)

    def filter_end_date(self, end_date):
        self.trades = self.trades.filter(date__lte=end_date)

    def filter_stocks(self, stocks):
        """
        Filters trades for tuple of stocks
        """
        self.trades = self.trades.filter(stock__in=stocks)