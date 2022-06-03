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
    pass

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
    pass

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