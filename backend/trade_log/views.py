from django.shortcuts import render
from rest_framework import viewsets
from .serializers import TradeSerializer
from .models import Trade

# Create your views here.

class TradeView(viewsets.ModelViewSet):
    serializer_class = TradeSerializer
    queryset = Trade.objects.all()