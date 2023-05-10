class StockQueue:
    """Class to implement FIFO on stocks purchased to find adjusted cost basis"""
    """Trades should be filtered by date prior to adding to queue"""
    def __init__(self):
        self.history = []

    def add(self, purchase):
        trade = StockPurchase(purchase)
        self.history.append(trade)

    def sell(self, sale):
        shares_sold = sale.shares
        
        while shares_sold > 0:
            trade = self.history[0]
            shares_sold = trade.sell(shares_sold)
            
            if trade.shares <= 0:
                self.history.pop(0)

    def calc_acb(self):
        return(sum([trade.price * trade.shares + trade.commission 
            for trade in self.history]))

    def calc_shares(self):
        return(sum([trade.shares for trade in self.history]))

class StockPurchase:
    """Class to store data about single stock purchase"""
    def __init__(self, purchase):
        self.stock = purchase.stock
        self.price = purchase.price
        self.shares = purchase.shares
        self.commission = purchase.commission
        self.date = purchase.date

    def sell(self, shares_sold):
        """Decrements current shares and returns remaining shares sold"""
        self.shares -= shares_sold
        if self.shares > 0:
            return 0
        else:
            return -self.shares

    def remaining_cost(self):
        return self.price * self.shares + self.commission

