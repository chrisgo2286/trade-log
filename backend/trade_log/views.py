from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import viewsets
from .serializers import TradeSerializer
from .models import Trade
from .portfolio_scripts.stock_summary import StockSummary
from .portfolio_scripts.stock_queue import StockQueue

# Create your views here.

class TradeView(viewsets.ModelViewSet):

    serializer_class = TradeSerializer
    queryset = Trade.objects.all()

    def perform_create(self, serializer):
        return serializer.save(owner=self.request.user)

    def get_queryset(self):
        return self.queryset.filter(owner=self.request.user)

@api_view(('GET',))
def portfolio_view(request):
    
    trades = Trade.objects.filter(owner=request.user, stock='VCN.TO')
    trades.order_by('date')

    stock_history = StockQueue()

    for trade in trades:
        if trade.buy_sell == 'BUY':
            stock_history.add(trade)
        else:
            stock_history.sell(trade)
        




    data = {}

    summary = StockSummary(owner=request.user)

    data['stock_summary'] = summary.get_data()
    
    return Response(data)
