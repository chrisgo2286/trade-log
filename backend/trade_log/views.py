from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import viewsets
from .serializers import TradeSerializer
from .models import Trade
from .portfolio_scripts.stock_summary import StockSummary

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
    summary = StockSummary(owner=8)
    summary.populate()
    data = summary.df.to_dict('records')
    return Response(data)
