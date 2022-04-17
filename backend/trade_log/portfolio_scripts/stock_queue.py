class StockQueue:
    """Class to implement FIFO on stocks purchased to find adjusted cost basis"""
    """Data param is initial stock purchase data"""
    """Trades should be filtered by date prior to adding to queue"""
    def __init__(self):
        self.history = []

    def add(self, purchase):
        stock = StockPurchase(purchase)
        self.history.append(stock)

    def sell(self, sale):
        shares_sold = sale.shares
        
        while shares_sold > 0:
            stock = self.history[0]
            shares_sold = stock.sell(shares_sold)
            
            if stock.shares <= 0:
                self.history.pop(0)
                print('Removing stock from queue')

            print(shares_sold)

    def adj_cost_basis(self):
        return(sum([stock.price * stock.shares + stock.commission for stock in self.history]))

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

