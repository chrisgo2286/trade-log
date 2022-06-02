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
def test_init_history(analysis):
    """Tests that trades are added to history correctly"""
    assert analysis.history.calc_shares() == 30

def test_convert_to_json_date(analysis):
    """Tests that function returns date obj as json date"""
    assert analysis.convert_to_json_date(DATE_OBJ) == JSON_DATE

def test_find_correct_key(analysis):
    """Tests that func returns key for correct date"""
    assert analysis.find_correct_key(DATA, JSON_DATE, DATE_OBJ) == CORRECT_KEY