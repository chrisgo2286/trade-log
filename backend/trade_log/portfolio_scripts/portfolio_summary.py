from trade_log.models import Trade
from django_pandas.io import read_frame

class PortfolioSummary:
    def __init__(self, owner):
        self.owner = owner
        self.trades = Trade.objects.filter(owner=self.owner)
        self.df_orig = read_frame(self.trades)
    
    @staticmethod
    def to_json(df):
        return df.to_json(orient='split')
