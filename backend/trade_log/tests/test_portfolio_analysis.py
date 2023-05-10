from xml.dom.expatbuilder import FILTER_SKIP
import pytest
from datetime import datetime, date
from trade_log.tests.fixtures import (params, portfolio, trade1, trade2, 
    trade3, trade4, trade5, new_user)

pytestmark = pytest.mark.django_db

TODAY = datetime.today().date()
START_DATE = date(2022, 2, 1)
END_DATE = date(2022, 2, 28)
INTERVAL = 5
OWNER = 'tester'
STOCK_LIST = ['VCN.TO', 'XUS.TO']
DATE_LIST = [START_DATE, date(2022, 2, 6), date(2022, 2, 11), 
    date(2022, 2, 16), date(2022, 2, 21), date(2022, 2, 26), END_DATE]
FILTERS = {'end': date(2022, 3, 31)}
TRADE1 = 'VCN.TO @ 43.00 on 2022-02-01'
TRADE2 = 'VCN.TO @ 44.00 on 2022-02-15'
TRADE3 = 'XUS.TO @ 70.50 on 2022-02-15'

STOCK = 'VCN.TO'
PRICE = 43.7
SHARES = 30
ACB = 1315.0
AVERAGE_PRICE = 43.83
LOSS = -4.0
LOSS_PER_SHARE = -.13
MARKET_VALUE = 1311
ROI = -6.02
PORTFOLIO_ACB = 2402.5
PORTFOLIO_VALUE = 2341.50
PORTFOLIO_RETURN = -61.00

def test_find_interval(portfolio):
    """Tests that func return correct interval"""
    assert portfolio.find_interval(START_DATE, END_DATE) == INTERVAL

def test_compile_dates_with_params(params):
    """Tests that func return list of correct dates"""
    assert all(day in params.dates for day in DATE_LIST)
    assert len(params.dates) == len(DATE_LIST)

def test_find_all_stocks(portfolio):
    """Tests that func returns list of unique stock names for queryset of 
    trades"""
    assert all(stock in portfolio.stocks for stock in STOCK_LIST)
    assert len(portfolio.stocks) == len(STOCK_LIST)

def test_filter_trades(params):
    """Tests that func returns correct trades filtered by params"""
    trades = params.filter_trades(params.filters)
    assert trades[0].__str__() == TRADE1
    assert trades[1].__str__() == TRADE2
    assert trades[2].__str__() == TRADE3

def test_find_end_date_with_params(params):
    """Tests that func returns correct start date obj"""
    assert params.find_end_date() == END_DATE

def test_find_end_date_no_params(portfolio):
    """Test that func returns current date if no params provided"""
    assert portfolio.find_end_date() == TODAY

def test_find_start_date(params):
    """Tests that func returns correct start date obj"""
    assert params.find_start_date() == START_DATE

def test_build_new_filter(params):
    """Tests that func correctly revises filters attribute"""
    new_filter = params.build_new_filter(FILTERS)
    assert new_filter.get('start') == START_DATE
    assert new_filter.get('end') == FILTERS.get('end')

def test_init_filter_no_params(portfolio):
    """Tests that func creates correct filters"""
    assert portfolio.filters.get('owner').username == OWNER
    assert portfolio.filters.get('end') == TODAY
    assert portfolio.filters.get('start') == None

def test_init_filter_with_params(params):
    """Tests that func creates correct filters"""
    assert params.filters.get('owner').username == OWNER
    assert params.filters.get('end') == END_DATE
    assert params.filters.get('start') == START_DATE

def test_compile_stock_data(portfolio):
    """Tests that stock data is entered correctly"""
    stocks = portfolio.data.get('stocks')
    for stock in stocks:
        if stock.get('stock') == STOCK:
            print(stock)
            assert round(stock.get('market'), 1) == PRICE
            assert stock.get('shares') == SHARES
            assert stock.get('acb') == ACB
            assert round(stock.get('average'),2) == AVERAGE_PRICE
            assert round(stock.get('pl'),2) == LOSS
            assert round(stock.get('pl_per_share'),2) == LOSS_PER_SHARE
            assert round(stock.get('value'),1) == MARKET_VALUE

def test_calc_roi(portfolio):
    """Tests that roi is calculated correctly"""
    assert round(portfolio.data.get('roi'), 2) == ROI

def test_compile_overview_data(portfolio):
    """Tests that func sets correct portfolio ACB, Value and Return"""
    assert portfolio.data.get('acb') == PORTFOLIO_ACB
    assert round(portfolio.data.get('value'),2) == PORTFOLIO_VALUE
    assert round(portfolio.data.get('return'),2) == PORTFOLIO_RETURN

def test_compile_values_data(portfolio):
    """Test that func populates data attr with correct date/value dict pairs"""
    pass