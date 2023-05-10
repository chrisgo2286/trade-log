import pytest
from datetime import date
from trade_log.tests.fixtures import (trade1, trade2, trade3, analysis, 
    new_user)

pytestmark = pytest.mark.django_db

JSON_DATE = '2022-05-04T00:00:00.000Z'
CORRECT_KEY = '2022-05-02T00:00:00.000Z'
DATE_OBJ = date(2022, 5, 4)
DATA = {
    '2022-05-01T00:00:00.000Z': 100.00,
    '2022-05-02T00:00:00.000Z': 105.00,
}
STOCK = 'VCN.TO'
PRICE = 44.25
SHARES = 30
ACB = 1315.0
AVERAGE_PRICE = 43.83
PROFIT = 12.60
PROFIT_PER_SHARE = .42
MARKET_VALUE = 1327.5

def test_init_history(analysis):
    """Tests that trades are added to history correctly"""
    assert analysis.history.calc_shares() == SHARES

def test_convert_to_json_date(analysis):
    """Tests that function returns date obj as json date"""
    assert analysis.convert_to_json_date(DATE_OBJ) == JSON_DATE

def test_find_correct_key(analysis):
    """Tests that func returns key for correct date"""
    assert analysis.find_correct_key(DATA, JSON_DATE, DATE_OBJ) == CORRECT_KEY

# Tests stock data
def test_stock_name(analysis):
    """Tests that correct stock attribute is entered for obj"""
    assert analysis.stock == STOCK

def test_market_price(analysis):
    """Tests that correct price is pulled from market data"""
    assert analysis.market_price() == PRICE

def test_total_shares(analysis):
    """Tests that func returns correct remaining shares"""
    assert analysis.total_shares() == SHARES

def test_acb(analysis):
    """Tests that func returns correct adjusted cost basis"""
    assert analysis.acb() == ACB

def test_average_price(analysis):
    """Tests that func returns correct average price"""
    analysis.data['acb'] = ACB
    analysis.data['shares'] = SHARES
    assert round(analysis.average_price(), 2) == AVERAGE_PRICE

def test_total_profit_loss(analysis):
    """Tests that func returns correct profit/loss"""
    analysis.data['market'] = PRICE
    analysis.data['average'] = AVERAGE_PRICE
    analysis.data['shares'] = SHARES
    assert round(analysis.total_profit_loss(),2) == PROFIT

def test_profit_loss_per_share(analysis):
    """Tests that func returns correct profit/share"""
    analysis.data['pl'] = PROFIT
    analysis.data['shares'] = SHARES
    assert round(analysis.profit_loss_per_share(), 2) == PROFIT_PER_SHARE

def test_market_value(analysis):
    """Tests that func returns correct market value"""
    analysis.data['market'] = PRICE
    analysis.data['shares'] = SHARES
    assert analysis.market_value() == MARKET_VALUE

def test_compile_value_only(analysis):
    """Tests that func returns correct market value"""
    assert analysis.compile_value_only() == MARKET_VALUE