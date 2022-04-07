from django.shortcuts import render
from rest_framework import viewsets
from .serializers import TradeSerializer
from .models import Trade
# from rest_framework.decorators import authentication_classes
# from rest_framework.authentication import TokenAuthentication
# from rest_framework.decorators import api_view
# from rest_framework.decorators import permission_classes
# from rest_framework.permissions import IsAuthenticated

# Create your views here.

class TradeView(viewsets.ModelViewSet):

    serializer_class = TradeSerializer
    queryset = Trade.objects.all()

    def perform_create(self, serializer):
        return serializer.save(owner=self.request.user)

    def get_queryset(self):
        return self.queryset.filter(owner=self.request.user)