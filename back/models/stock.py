from pydantic import BaseModel
from typing import List

# Define the structure for stock data
class Stock(BaseModel):
    symbol: str
    name: str
    price: float
    change: float

# Define a response model to return multiple stocks
class StockResponse(BaseModel):
    stocks: List[Stock]
