from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import viewsets
from .serializers import TradeSerializer
from .models import Trade
from .portfolio_scripts.portfolio_analysis import PortfolioAnalysis
from .portfolio_scripts.value_data import ValueData

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
    portfolio = PortfolioAnalysis(request.user, request.query_params)
    value_data = ValueData(request.user, request.query_params)
    data = portfolio.data
    data['value'] = value_data.data
    print(data)
    
    return Response(data)
