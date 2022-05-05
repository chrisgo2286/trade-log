import pytest
from datetime import date
from fixtures import new_trade, new_user, stock_purchase, queue

pytestmark = pytest.mark.django_db

STOCK = 'VCN.TO'
PRICE = 25.00
SHARES = 30
COMMISSION = 20.00
DATE = date(2022, 1, 15)

SHARES_SOLD_A = 20
REMAINING_SHARES_A = 10
SHARE_ADJ_A = 0

SHARES_SOLD_B = 40
REMAINING_SHARES_B = -10
SHARE_ADJ_B = 10

REMAINING_COST = 270.00

# STOCK PURCHASE TESTS

def test_stock_purchase_attributes(stock_purchase):
    """Tests attributes correctly initialized"""
    assert stock_purchase.stock == STOCK
    assert stock_purchase.price == PRICE
    assert stock_purchase.shares == SHARES
    assert stock_purchase.commission == COMMISSION
    assert stock_purchase.date == DATE

def test_stock_purchase_sell_A(stock_purchase):
    """Tests sell method when less than total shares"""
    share_adj = stock_purchase.sell(SHARES_SOLD_A)
    assert stock_purchase.shares == REMAINING_SHARES_A
    assert share_adj == SHARE_ADJ_A

def test_stock_purchase_sell_(stock_purchase):
    """Tests sell method when more than total shares"""
    share_adj = stock_purchase.sell(SHARES_SOLD_B)
    assert stock_purchase.shares == REMAINING_SHARES_B
    assert share_adj == SHARE_ADJ_B

def test_stock_purchase_remaining_cost(stock_purchase):
    """Tests remaining cost calculated correctly"""
    stock_purchase.sell(SHARES_SOLD_A)
    assert stock_purchase.remaining_cost() == REMAINING_COST

# STOCK QUEUE TESTS

def test_queue_history(queue):
    """Tests that history attribute correctly returns first stock purchase"""
    assert queue.history[0].stock == STOCK
    assert queue.history[0].price == PRICE
    assert queue.history[0].shares == SHARES
    assert queue.history[0].commission == COMMISSION
    assert queue.history[0].date == DATE