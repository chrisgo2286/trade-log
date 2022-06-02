import pytest
from datetime import date
from django.contrib.auth.models import User
from trade_log.portfolio_scripts.stock_queue import StockPurchase, StockQueue
from trade_log.portfolio_scripts.stock_analysis import StockAnalysis
from trade_log.models import Trade

@pytest.fixture
def new_user():
    """Returns a new owner"""
    return User.objects.create_user(
        username='tester',
        password='test123'
    )

@pytest.fixture
def trade1(new_user):
    """Returns a new instance of Trade"""
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
def trade2(new_user):
    """Returns a new instance of Trade"""
    return Trade.objects.create(
        owner = new_user,
        buy_sell = 'BUY',
        stock = 'VCN.TO',
        price = 26.00,
        commission = 15.00,
        shares = 20,
        date = date(2022, 2, 1),
    )

@pytest.fixture
def trade3(new_user):
    """Returns a new instance of Trade"""
    return Trade.objects.create(
        owner = new_user,
        buy_sell = 'SELL',
        stock = 'VCN.TO',
        price = 27.00,
        commission = 25.00,
        shares = 20,
        date = date(2022, 2, 15),
    )

@pytest.fixture
def trade4(new_user):
    """Returns a new instance of Trade"""
    return Trade.objects.create(
        owner = new_user,
        buy_sell = 'SELL',
        stock = 'VCN.TO',
        price = 25.00,
        commission = 25.00,
        shares = 30,
        date = date(2022, 2, 15),
    )

#test_stock_queue.py

@pytest.fixture
def stock_purchase(trade1):
    """Returns an instance of StockPurchase"""
    return StockPurchase(trade1)

@pytest.fixture
def queue(stock_purchase):
    """Returns an instance of StockQueue with stock_purchase added"""
    queue = StockQueue()
    queue.add(stock_purchase)
    return queue

#test_stock_analysis.py
@pytest.fixture
def analysis(trade1, trade2, trade3):
    """Returns an instance of StockAnalysis with four trades entered"""
    trades = (trade1, trade2, trade3)
    end_date = date(2022, 4, 1)
    return StockAnalysis(trades, end_date)

