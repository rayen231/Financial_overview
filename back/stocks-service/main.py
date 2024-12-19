from fastapi import FastAPI, APIRouter, HTTPException,Depends
import sys
import os
file_directory = os.path.abspath(r"C:\Users\Rayen\Desktop\3éme_license\Web\finance\back")
sys.path.append(file_directory)
from models.stock import StockResponse, Stock
from fastapi.middleware.cors import CORSMiddleware
import requests
from stock_detail import get_stock_details
from typing import List
from news import fetch_stock_news, fetch_general_stock_news
from db_handle import    FinanceDBHandler
from pydantic import BaseModel
from typing import Optional
from typing import Dict

app = FastAPI()
router = APIRouter()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)
router = APIRouter()

API_KEY = "cssa8shr01qld5m1b57gcssa8shr01qld5m1b580"  # Replace with your actual Finnhub API key
BASE_URL = "https://finnhub.io/api/v1"

def get_db_handler():
    db_handler = FinanceDBHandler()
    try:
        yield db_handler
    finally:
        db_handler.close_connection()



def fetch_stock_data(symbol: str):
    """
    Fetch stock data for the given symbol using Finnhub API.
    """
    url = f"{BASE_URL}/quote?symbol={symbol}&token={API_KEY}"
    response = requests.get(url)
    
    if response.status_code == 200:
        data = response.json()
        # Check if the data exists for the stock
        if "c" in data:  # 'c' is the current price in the response
            price = float(data["c"])
            change = float(data["d"])  # 'd' is the change in price
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
    symbols = ["AAPL", "GOOGL", "AMZN", "MSFT", "TSLA", "NVDA"]
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
    
# Route to get stock details by symbol

@app.get("/stock-news/{stock_symbol}", response_model=dict)
async def get_stock_news(stock_symbol: str):
    """
    Fetch news for a specific stock using the stock symbol (e.g., 'AAPL' for Apple).
    Returns the stock price, price history, and latest news.
    """
    try:
        # Fetch stock price and history
        stock_price, price_history = get_stock_details(stock_symbol)
        #print(f"Current price for {stock_symbol}: {stock_price}")
        
        # Fetch stock news
        stock_news = fetch_stock_news(stock_symbol)
        #print(f"Stock news for {stock_symbol}: {stock_news}")
        
        # Return formatted response
        return {
            "curent_stock_price": stock_price,
            "price_history": price_history,
            "stock_news": stock_news
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")


@app.get("/general-stock-news", response_model=List[dict])
async def get_general_stock_news():
    """
    Fetch general news related to stocks.
    """
    try:
        general_news =fetch_general_stock_news()
        #print(general_news)
        return general_news
    except HTTPException as e:
        raise HTTPException(status_code=e.status_code, detail=e.detail)

class LoginRequest(BaseModel):
    name: str
    password: str

class LoginData(BaseModel):
    name: str
    password: str

@app.post("/login", response_model=dict)
async def login_user(login_data: LoginData, db_handler: FinanceDBHandler = Depends(get_db_handler)):
    """
    Verify user login credentials.
    """
    user = db_handler.login_check(login_data.name, login_data.password)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return {"message": "Login successful", "user_id": user["id"]}


@app.get("/user-info/{user_id}", response_model=dict)
async def get_user_info(user_id: int, db_handler: FinanceDBHandler = Depends(get_db_handler)):
    """
    Fetch user information by ID.
    """
    user_info = db_handler.get_user_info_by_id(user_id)
    if not user_info:
        raise HTTPException(status_code=404, detail="User not found")
    return user_info

@app.get("/walet-info/{user_id}", response_model=dict)
async def get_walet_info(user_id: int, db_handler: FinanceDBHandler = Depends(get_db_handler)):
    """
    Fetch wallet information for a given user ID.
    """
    walet_info = db_handler.get_walet_info(user_id)
    if not walet_info:
        raise HTTPException(status_code=404, detail="Wallet not found")
    return walet_info



# Include the stock router
app.include_router(router)

# Run the FastAPI server
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
