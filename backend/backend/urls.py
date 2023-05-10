from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from trade_log import views

router = routers.DefaultRouter()
router.register(r'trades', views.TradeView, 'trade')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/', include('trade_log.urls')),
    path('api/accounts/', include('accounts.urls')),
]

