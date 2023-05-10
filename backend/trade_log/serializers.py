from rest_framework import serializers
from .models import Trade

class TradeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trade
        fields = ('id', 'buy_sell', 'stock', 'price', 'commission', 'shares', 'date', 'comment')