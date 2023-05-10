from django.db import models
from django.contrib.auth.models import User

# Create your models here.

BUY = 'BUY'
SELL = 'SELL'

CHOICES = (
    (BUY, 'BUY'),
    (SELL, 'SELL'),
)
class Trade(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    buy_sell = models.CharField(max_length=9, choices=CHOICES, default=BUY)
    stock = models.CharField(max_length=120)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    commission = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    shares = models.IntegerField()
    date = models.DateField()
    comment = models.TextField(blank=True, null=True)

    class Meta:
        ordering = ('date',)
        
    def __str__(self):
        return (f'{self.stock} @ {self.price} on {self.date}')