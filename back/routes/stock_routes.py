from fastapi import APIRouter
from models.stock import StockResponse, Stock
import requests
import os

router = APIRouter()
def config():
    API_KEY = os.getenv("API_KEY") # Replace with your actual API key
    BASE_URL = "https://www.alphavantage.co/query"
    return API_KEY,BASE_URL

def fetch_stock_data(symbol: str):
    """
    Fetch stock data for the given symbol using Alpha Vantage API.
    """
    API_KEY,BASE_URL=config()
    url = f"{BASE_URL}?function=TIME_SERIES_INTRADAY&symbol={symbol}&interval=5min&apikey={API_KEY}"
    response = requests.get(url)
    
    if response.status_code == 200:
        data = response.json()
        # Check if the data exists for the stock
        if "Time Series (5min)" in data:
            latest_time = list(data["Time Series (5min)"].keys())[0]
            stock_info = data["Time Series (5min)"][latest_time]
            price = float(stock_info["4. close"])
            change = float(stock_info["4. close"]) - float(stock_info["1. open"])  # Calculate change
            return {
                "symbol": symbol,
                "name": symbol,  # Name can be added if needed
                "price": price,
                "change": change
            }
    return None

# Route to get all stock data
@router.get("/stocks", response_model=StockResponse)
async def get_stocks():
    # Example stock symbols (you can modify this list as needed)
    symbols = ["AAPL", "GOOGL", "AMZN", "MSFT","TSLA","AMZN","NVDA"]
    stocks = []
    
    for symbol in symbols:
        stock_data = fetch_stock_data(symbol)
        if stock_data:
            stocks.append(Stock(**stock_data))
    
    return StockResponse(stocks=stocks)

# Route to get stock data by symbol
@router.get("/stocks/{symbol}", response_model=Stock)
async def get_stock(symbol: str):
    stock_data = fetch_stock_data(symbol)
    if stock_data:
        return Stock(**stock_data)
    else:
        return {"error": "Stock not found or data not available"}
