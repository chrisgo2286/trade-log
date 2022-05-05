import pytest
from datetime import date
from trade_log.portfolio_scripts.stock_queue import StockPurchase, StockQueue
from trade_log.models import Trade
from django.contrib.auth.models import User

@pytest.fixture
def new_user():
    """Returns a new owner"""
    return User.objects.create_user(
        username='tester',
        password='test123'
    )

@pytest.fixture
def new_trade(new_user):
    """Returns an instance of Trade"""
    return Trade.objects.create(
        owner = new_user,
        buy_sell = 'BUY',
        stock = 'VCN.TO',
        price = 25.00,
        commission = 20.00,
        shares = 30,
        date = date(2022, 1, 15),
    )

@pytest.fixture
def stock_purchase(new_trade):
    """Returns an instance of StockPurchase"""
    return StockPurchase(new_trade)

@pytest.fixture
def queue(stock_purchase):
    """Returns an instance of StockQueue with stock_purchase added"""
    queue = StockQueue()
    queue.add(stock_purchase)
    return queue