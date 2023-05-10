from .stock_analysis import StockAnalysis
from .portfolio_filter import PortfolioFilter
from .misc import divide
from trade_log.models import Trade
from datetime import datetime, timedelta

class PortfolioAnalysis:
    def __init__(self, owner, **params):
        self.owner = owner
        self.params = params
        self.filters = self.init_filter()
        self.trades = self.filter_trades(self.filters)
        self.stocks = self.find_all_stocks(self.trades)
        self.data = {
            'stocks': [],
            'values': [],
            'composition': [],
            'acb': 0,
            'value': 0,
            'roi': 0,
            'return': 0,
        }
        self.dates = self.compile_dates()
        self.compile_data()
    
    def compile_data(self):
        self.compile_stock_data()
        self.compile_overview_data()
        self.compile_values_data()
        self.compile_composition_data()

    # Stock Summary
    def compile_stock_data(self):
        for stock in self.stocks:
            trades = self.trades.filter(stock=stock)
            analysis = StockAnalysis(trades, self.filters['end'])
            analysis.compile_data()
            self.data['stocks'].append(analysis.data)

    # Overview
    def compile_overview_data(self):
        for stock in self.data['stocks']:
            self.data['acb'] += stock['acb']
            self.data['value'] += stock['value']
        self.data['return'] = self.data['value'] - self.data['acb']
        self.data['roi'] = self.calc_roi()

    def calc_roi(self):
        roi = divide(self.data['return'], self.data['acb']) * 100
        start = self.find_start_date() or self.trades[0].date
        factor = (self.filters['end'] - start).days / 365
        return divide(roi, factor)

    # Value Chart
    def compile_values_data(self):
        """Populates data attr with list of date/value dict pairs"""
        for ndx, date in enumerate(self.dates):
            self.data['values'].append(self.init_value(date))
            trades = self.filter_trades_by_date(date)
            stocks = self.find_all_stocks(trades)
            self.pull_stock_values(ndx, date, stocks)

    def init_value(self, date):
        """Returns dict of date and value"""
        date_str = date.strftime('%-m/%-d')
        return {'date': date_str, 'value': 0}

    def filter_trades_by_date(self, date):
        filters = self.build_new_filter({'end': date})
        return self.filter_trades(filters)

    def pull_stock_values(self, ndx, date, stocks):
        """Pulls market values for all stocks in portfolio"""
        for stock in stocks:
            trades = self.filter_trades_by_stock(date, stock)
            value = self.pull_stock_value(trades, date)
            self.data['values'][ndx]['value'] += value

    # Composition
    def compile_composition_data(self):
        """Compiles data.composition with top ten (market_value, stock_name)"""
        total_value = 0
        values = []
        for stock in self.stocks:
            end_date = self.find_end_date()
            trades = self.filter_trades_by_stock(end_date, stock)
            value = self.pull_stock_value(trades, end_date)
            total_value += value
            values.append((value, stock))
        values.sort(reverse=True)
        
        for (value, stock) in values:
            self.data['composition'].append({
                # 'percent':value/total_value, 
                'stock': stock,
                'value': value,
            })
            
        print(self.data['composition'])

    # Helper Methods
    def init_filter(self):
        """
        Parses through string parameters and converts to correct type
        """
        filters = {}
        filters['owner'] = self.owner
        filters['end'] = self.find_end_date()
        
        if self.params.get('start'):
            filters['start'] = self.find_start_date()

        return filters

    def build_new_filter(self, filters):
        """
        Makes a shallow copy of current filter and revises certain keys/values
        """
        new_filters = self.filters.copy()
        for key, value in filters.items():
            new_filters[key] = value
        return new_filters

    def find_start_date(self):
        """
        Returns start param as date object if given
        """
        if self.params.get('start'):
            start = self.params.get('start')
            return datetime.strptime(start, '%m%d%Y').date()

    def find_end_date(self):
        """
        Returns end param as date object if given, else today's date
        """
        if self.params.get('end'):
            end = self.params.get('end')
            return datetime.strptime(end, '%m%d%Y').date()
        return datetime.today().date()

    def filter_trades(self, filters):
        """
        Creates instance of PortfolioFilter to filter trades based on filters
        """
        portfolio_filter = PortfolioFilter(filters)
        return portfolio_filter.filter_trades()

    def find_all_stocks(self, trades):
        """Takes in queryset of trade. Returns list of stock names in given 
        trades"""
        stocks = trades.values_list('stock', flat=True).distinct()
        return set(stocks)

    def compile_dates(self):
        """
        Creates a list of 5 or 6 date objs between start and end dates
        """
        dates = []
        curr_date = self.find_start_date() or self.trades[0].date
        interval = self.find_interval(curr_date, self.filters['end'])
        while curr_date < self.filters['end']:
            dates.append(curr_date)
            curr_date = curr_date + timedelta(days=interval)
        dates.append(self.filters['end'])
        return dates

    def find_interval(self, start, end):
        """
        Takes two date objs as arguements and return the difference divided by
        five
        """
        total_days = (end - start).days
        return total_days // 5

    def filter_trades_by_stock(self, date, stock):
        """Filters trades by date and stock"""
        filters = self.build_new_filter({'end': date, 'stocks': (stock,)})
        return self.filter_trades(filters)

    def pull_stock_value(self, trades, date):
        """Returns market value for stock at specified date"""
        analysis = StockAnalysis(trades, date)
        return analysis.compile_value_only()