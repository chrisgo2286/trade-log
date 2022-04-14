from django.urls import path, include
from .views import portfolio_view

urlpatterns = [
    path('portfolio/', portfolio_view),
]
