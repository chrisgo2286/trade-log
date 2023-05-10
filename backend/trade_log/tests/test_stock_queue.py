import pytest
from datetime import date
from trade_log.tests.fixtures import (trade1, trade2, trade3, trade4, new_user, 
    stock_purchase, queue)


pytestmark = pytest.mark.django_db

STOCK1 = 'VCN.TO'
PRICE1 = 42.00
SHARES1 = 30
COMMISSION1 = 20.00
DATE1 = date(2022, 1, 15)
DATE2 = date(2022, 2, 1)

SHARES_SOLD_A = 20
REMAINING_SHARES_A = 10
SHARE_ADJ_A = 0

SHARES_SOLD_B = 40
REMAINING_SHARES_B = -10
SHARE_ADJ_B = 10

REMAINING_COST = 440.00
ACB = 1280.0

# STOCK PURCHASE TESTS

def test_stock_purchase_attributes(stock_purchase):
    """Tests attributes correctly initialized"""
    assert stock_purchase.stock == STOCK1
    assert stock_purchase.price == PRICE1
    assert stock_purchase.shares == SHARES1
    assert stock_purchase.commission == COMMISSION1
    assert stock_purchase.date == DATE1

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
    assert queue.history[0].date == DATE1

def test_queue_add(queue, trade2):
    """Tests that add method adds new purchase to queue history"""
    queue.add(trade2)
    assert queue.history[1].date == DATE2

def test_queue_sell(queue, trade3):
    """Tests that sell method removes 20 shares and leaves 10 remaining"""
    queue.sell(trade3)
    assert queue.history[0].shares == 10

def test_calc_acb(queue):
    """Tests that calc_acb method returns $770 for adjusted cost basis"""
    assert queue.calc_acb() == ACB

def test_calc_shares(queue, trade2, trade3, trade4):
    """Tests that after four trades, remaining shares is zero"""
    queue.add(trade2)
    queue.sell(trade3)
    queue.sell(trade4)
    assert len(queue.history) == 0