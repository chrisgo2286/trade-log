from unicodedata import decimal
from .portfolio_analysis import PortfolioAnalysis
from trade_log.models import Trade
from datetime import timedelta, datetime
import math

class ValueData:
    def __init__(self, owner, params):
        self.owner = owner
        self.filter = params
        self.trades = Trade.objects.filter(owner=self.owner)
        self.dates = []
        self.data = []
        self.compile_data()

    def compile_data(self):
        self.compile_dates()
        for date in self.dates:
            params = {'end': date.strftime('%m%d%Y')}
            analysis = PortfolioAnalysis(self.owner, params)
            value = analysis.data['overview']['value']
            self.data.append({ 
                'date': date.strftime('%-m/%-d'),
                'value': value
            })

    def compile_dates(self):
        start, end = self.find_start_date(), self.find_end_date()
        interval = self.find_interval(start, end)

        while start < end:
            self.dates.append(start)
            start = start + timedelta(days=interval)
        self.dates.append(end)
    
    def find_interval(self, start, end):
        total_days = (end - start).days
        return total_days // 5

    def find_start_date(self):
        if self.filter.get('start'):
            start = self.filter.get('start')
            return datetime.strptime(start, '%m%d%Y').date()
        return self.trades.order_by('date')[0].date

    def find_end_date(self):
        if self.filter.get('end'):
            end = self.filter.get('end')
            return datetime.strptime(end, '%m%d%Y').date()
        return datetime.today().date()



