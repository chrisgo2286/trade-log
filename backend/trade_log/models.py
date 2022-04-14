from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Trade(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    stock = models.CharField(max_length=120)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    commission = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    shares = models.IntegerField()
    date = models.DateField()
    comment = models.TextField(blank=True, null=True)

    @property
    def total(self):
        return(self.price * self.shares + self.commission)
        
    def __str__(self):
        return (f'{self.stock} @ {self.price} on {self.date}')