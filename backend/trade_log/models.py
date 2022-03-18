from django.db import models

# Create your models here.

class Trade(models.Model):
    stock = models.CharField(max_length=120)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    commission = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    shares = models.IntegerField()
    date = models.DateField()
    comment = models.TextField(blank=True, null=True)

    def __str__(self):
        return (f'{self.stock} @ {self.price} on {self.date}')